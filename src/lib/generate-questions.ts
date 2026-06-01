import Anthropic from '@anthropic-ai/sdk'
import { adminClient } from './supabase/admin'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const STRICT_SYSTEM_PROMPT = `You are an exam question generator for the BC Strata Management Licensing Examination administered by UBC Sauder School of Business.

CRITICAL RULES — THESE ARE ABSOLUTE AND NON-NEGOTIABLE:
1. You may ONLY generate questions based on the exact text provided to you below. 
2. You MUST NOT use any outside knowledge, general knowledge, or information not present in the provided text.
3. Every question MUST include a source_text field containing the EXACT sentence(s) from the provided text that the question is based on.
4. If you cannot find sufficient content in the provided text to generate a question, skip it entirely.
5. Do not generate questions about information that is implied or inferred — only explicit statements in the text.
6. Questions must follow the UBC multiple choice format: one stem, four options (A-D), one best answer.
7. All four options must be plausible — not obviously wrong.
8. Return ONLY valid JSON. No preamble, no commentary, no markdown.

The exam tests application of knowledge, not just memorization. Questions should require the student to understand and apply concepts, not just recall definitions.`

async function getLessonText(lessonNumber: number): Promise<string> {
  const { data, error } = await adminClient
    .from('kb_documents')
    .select('extracted_text, file_name, doc_type')
    .eq('lesson_number', lessonNumber)
    .eq('processed', true)

  if (error) throw new Error(`KB fetch error: ${error.message}`)
  if (!data || data.length === 0) throw new Error(`No documents found for lesson ${lessonNumber}`)

  return data
    .map(d => `[SOURCE: ${d.file_name} | Type: ${d.doc_type}]\n\n${d.extracted_text}`)
    .join('\n\n========\n\n')
}

async function getDataText(): Promise<string> {
  const { data, error } = await adminClient
    .from('kb_documents')
    .select('extracted_text, file_name, act_name')
    .eq('doc_type', 'data')
    .eq('processed', true)

  if (error || !data || data.length === 0) return ''

  return data
    .map(d => `[SOURCE: ${d.act_name || d.file_name}]\n\n${d.extracted_text}`)
    .join('\n\n========\n\n')
}

export async function generateQuestionsForLesson(
  lessonNumber: number,
  sectionId: number,
  count: number = 20
): Promise<void> {
  console.log(`Generating ${count} questions for lesson ${lessonNumber}...`)

  const lessonText = await getLessonText(lessonNumber)
  const dataText = await getDataText()

  const fullContext = `${lessonText}\n\n========\n\nRELEVANT LEGISLATION AND REGULATIONS:\n\n${dataText}`

  const prompt = `Based EXCLUSIVELY on the text provided below, generate ${count} multiple choice exam questions suitable for the BC Strata Management Licensing Examination.

REQUIRED JSON FORMAT — return an array of exactly this structure:
[
  {
    "question_text": "The question stem here",
    "option_a": "First option",
    "option_b": "Second option", 
    "option_c": "Third option",
    "option_d": "Fourth option",
    "correct_answer": "A",
    "explanation": "Why this answer is correct, referencing the source material",
    "source_text": "The exact sentence(s) from the provided text this question is based on",
    "textbook_pages": "e.g. page 12" or null,
    "act_reference": "e.g. BCSPA s.35" or null,
    "regulation_ref": "e.g. Strata Property Regulation s.6.1" or null,
    "difficulty": 1, 2, or 3
  }
]

Difficulty scale:
1 = Recall of a specific fact from the text
2 = Understanding and application of a concept
3 = Analysis or application in a complex scenario

SOURCE MATERIAL (use ONLY this content):

${fullContext}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    system: STRICT_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const rawText = response.content
    .filter(b => b.type === 'text')
    .map(b => (b as any).text)
    .join('')

  // Parse JSON — strip any accidental markdown
  const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  const questions = JSON.parse(cleaned)

  if (!Array.isArray(questions)) throw new Error('Response was not an array')

  // Validate and insert each question
  let inserted = 0
  let skipped = 0

  for (const q of questions) {
    // Hard validation — must have source_text
    if (!q.source_text || q.source_text.trim() === '') {
      console.log(`  Skipping question (no source_text): ${q.question_text?.slice(0, 50)}`)
      skipped++
      continue
    }

    // Validate correct_answer
    if (!['A','B','C','D'].includes(q.correct_answer)) {
      skipped++
      continue
    }

    const { error } = await adminClient.from('questions').insert({
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

    if (error) {
      console.log(`  DB error: ${error.message}`)
      skipped++
    } else {
      inserted++
    }
  }

  console.log(`  Lesson ${lessonNumber}: ${inserted} inserted, ${skipped} skipped`)
}