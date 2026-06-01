const { createClient } = require('@supabase/supabase-js')
const Anthropic = require('@anthropic-ai/sdk')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const STRICT_SYSTEM_PROMPT = `You are an exam question generator for the BC Strata Management Licensing Examination administered by UBC Sauder School of Business.

CRITICAL RULES — ABSOLUTE AND NON-NEGOTIABLE:
1. You may ONLY generate questions based on the exact text provided to you. NO exceptions.
2. You MUST NOT use any outside knowledge, general knowledge, or information not present in the provided text.
3. Every single question MUST include a source_text field containing the EXACT verbatim sentence(s) from the provided text that the question is based on. If you cannot provide this, do not generate the question.
4. Do not generate questions about information that is implied or inferred — only explicit statements in the text.
5. Questions must follow the UBC multiple choice format: one stem, four options (A-D), one best answer.
6. All four options must be plausible — not obviously wrong.
7. Return ONLY valid JSON. No preamble, no commentary, no markdown fences.
8. If the source text references a specific Act, regulation, or section number, include that reference in act_reference or regulation_ref.

The exam tests application of knowledge. Questions should require understanding and application of concepts, not just recall of definitions.`

async function getLessonText(lessonNumber) {
  const { data, error } = await supabase
    .from('kb_documents')
    .select('extracted_text, file_name, doc_type')
    .eq('lesson_number', lessonNumber)
    .eq('processed', true)
    .in('doc_type', ['chapter', 'assignment'])

  if (error || !data || data.length === 0) {
    throw new Error(`No documents found for lesson ${lessonNumber}`)
  }

  return data
    .map(d => `[SOURCE: ${d.file_name} | Type: ${d.doc_type}]\n\n${d.extracted_text}`)
    .join('\n\n========\n\n')
}

async function generateForLesson(lessonNumber, sectionId) {
  console.log(`\nLesson ${lessonNumber} (section ${sectionId})...`)

  const lessonText = await getLessonText(lessonNumber)

  const prompt = `Based EXCLUSIVELY on the text provided below, generate 20 multiple choice exam questions for the BC Strata Management Licensing Examination.

Return ONLY a JSON array — no markdown, no commentary, nothing else:
[
  {
    "question_text": "Question stem",
    "option_a": "Option A",
    "option_b": "Option B",
    "option_c": "Option C",
    "option_d": "Option D",
    "correct_answer": "A",
    "explanation": "Why this is correct, citing the source",
    "source_text": "Exact verbatim sentence(s) from the source text this question is based on",
    "textbook_pages": null,
    "act_reference": null,
    "regulation_ref": null,
    "difficulty": 2
  }
]

difficulty: 1=recall, 2=application, 3=analysis
Set textbook_pages, act_reference, regulation_ref to null if not applicable.
If the source text explicitly mentions an Act or section number, capture it in act_reference or regulation_ref.

SOURCE MATERIAL — USE ONLY THIS:

${lessonText}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 16000,
    system: STRICT_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const rawText = response.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')

  console.log(`  Stop reason: ${response.stop_reason}, output tokens: ${response.usage?.output_tokens}`)

  const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  let questions
  try {
    questions = JSON.parse(cleaned)
  } catch (e) {
    console.log(`  JSON parse error. Last 200 chars: ${cleaned.slice(-200)}`)
    throw new Error(`JSON parse failed: ${e.message}`)
  }

  if (!Array.isArray(questions)) throw new Error('Response was not a JSON array')

  let inserted = 0
  let skipped = 0

  for (const q of questions) {
    if (!q.source_text?.trim() || !['A','B','C','D'].includes(q.correct_answer)) {
      skipped++
      continue
    }

    const { error } = await supabase.from('questions').insert({
      section_id: sectionId,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      textbook_pages: q.textbook_pages || null,
      act_reference: q.act_reference || null,
      regulation_ref: q.regulation_ref || null,
      difficulty: q.difficulty || 2,
      is_active: true,
    })

    if (error) { console.log(`  DB error: ${error.message}`); skipped++ }
    else inserted++
  }

  console.log(`  Lesson ${lessonNumber}: ${inserted} inserted, ${skipped} skipped`)
  return inserted
}

async function main() {
  const { data: sections } = await supabase
    .from('sections')
    .select('id, number, title')
    .order('number')

  console.log(`Found ${sections.length} sections\n`)

  let totalInserted = 0

  for (const section of sections) {
    try {
      const inserted = await generateForLesson(section.number, section.id)
      totalInserted += inserted
      await new Promise(r => setTimeout(r, 1000))
    } catch (err) {
      console.log(`  ERROR lesson ${section.number}: ${err.message}`)
    }
  }

  console.log(`\n\nDone. Total questions inserted: ${totalInserted}`)
}

main().catch(console.error)
