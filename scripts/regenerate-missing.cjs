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
3. Every single question MUST include a source_text field containing the EXACT verbatim sentence(s) from the provided text that the question is based on.
4. Do not generate questions about information that is implied or inferred — only explicit statements in the text.
5. Questions must follow the BC Strata Management licensing exam multiple choice format: one stem, four options (A-D), one best answer.
6. All four options must be plausible — not obviously wrong.
7. Return ONLY valid JSON array. No preamble, no commentary, no markdown fences, no special characters that would break JSON parsing.
8. IMPORTANT: Avoid using apostrophes, quotation marks, or special characters inside string values. Use plain text only.

The exam tests application of knowledge. Questions should require understanding and application of concepts, not just recall.`

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

IMPORTANT JSON RULES:
- Return ONLY a valid JSON array
- Do not use apostrophes in any string values - write around them (use "does not" instead of "doesn't")
- Do not use special characters that break JSON
- No markdown, no code fences, no commentary

JSON format:
[
  {
    "question_text": "Question stem without apostrophes",
    "option_a": "Option A",
    "option_b": "Option B",
    "option_c": "Option C",
    "option_d": "Option D",
    "correct_answer": "A",
    "explanation": "Why this is correct",
    "source_text": "Exact verbatim sentence from source text",
    "textbook_pages": null,
    "act_reference": null,
    "regulation_ref": null,
    "difficulty": 2
  }
]

difficulty: 1=recall, 2=application, 3=analysis

SOURCE MATERIAL:
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

  console.log(`  Stop reason: ${response.stop_reason}, tokens: ${response.usage?.output_tokens}`)

  // Clean and sanitize JSON
  let cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  
  // Fix common JSON breaking characters
  cleaned = cleaned
    .replace(/[\u2018\u2019]/g, "'")  // smart single quotes
    .replace(/[\u201C\u201D]/g, '"')  // smart double quotes
    .replace(/\u2014/g, '--')          // em dash
    .replace(/\u2013/g, '-')           // en dash

  let questions
  try {
    questions = JSON.parse(cleaned)
  } catch (e) {
    console.log(`  JSON parse error: ${e.message}`)
    console.log(`  Last 300 chars: ${cleaned.slice(-300)}`)
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
  // Only regenerate the 3 failed sections
  const targets = [
    { number: 2, title: 'Professionalism and Ethics' },
    { number: 11, title: 'Sections' },
    { number: 20, title: 'Budgeting: The Contingency Reserve Fund' },
  ]

  // Get section IDs from DB
  const { data: sections } = await supabase
    .from('sections')
    .select('id, number')
    .in('number', [2, 11, 20])

  const sectionMap = {}
  for (const s of sections) sectionMap[s.number] = s.id

  console.log('Regenerating questions for lessons 2, 11, and 20...\n')

  let total = 0
  for (const target of targets) {
    try {
      const inserted = await generateForLesson(target.number, sectionMap[target.number])
      total += inserted
      await new Promise(r => setTimeout(r, 1000))
    } catch (err) {
      console.log(`  ERROR lesson ${target.number}: ${err.message}`)
    }
  }

  console.log(`\nDone. Total inserted: ${total}`)
}

main().catch(console.error)
