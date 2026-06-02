const { createClient } = require('@supabase/supabase-js')
const Anthropic = require('@anthropic-ai/sdk')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function getKBText(sectionNumber) {
  const { data: docs } = await supabase
    .from('kb_documents')
    .select('extracted_text')
    .or(`lesson_number.eq.${sectionNumber},chapter_number.eq.${sectionNumber}`)
    .limit(2)
  return (docs || []).map(d => d.extracted_text).join('\n\n').slice(0, 6000)
}

async function generateStudyNote(question, kbText) {
  const prompt = `You are writing a study note for a BC Strata Management Licensing Exam question.

Question: ${question.question_text}
Correct answer: Option ${question.correct_answer}
Explanation: ${question.explanation}
Act reference: ${question.act_reference || 'N/A'}

Relevant source material:
${kbText || 'Use your knowledge of BC strata management law.'}

Write a study note of 2-4 sentences that:
- Explains the underlying concept or rule being tested in plain language
- Helps the reader understand WHY the correct answer is correct at a conceptual level
- Does NOT quote legislation verbatim — paraphrase and explain
- Is written as a teaching note, not a legal citation
- Focuses on the specific fact or rule that trips people up

Return ONLY the study note text. No preamble, no labels, no quotes.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content.filter(b => b.type === 'text').map(b => b.text).join('').trim()
}

async function main() {
  // Get target section from args, or do all
  const targetSection = process.argv[2] ? parseInt(process.argv[2]) : null

  const { data: sections } = await supabase
    .from('sections')
    .select('id, number, title')
    .order('number')

  const toProcess = targetSection
    ? sections.filter(s => s.number === targetSection)
    : sections

  console.log(`Generating study notes for ${toProcess.length} section(s)...\n`)

  let total = 0
  let errors = 0

  for (const section of toProcess) {
    // Get questions that don't have a study note yet
    const { data: questions } = await supabase
      .from('questions')
      .select('id, question_text, correct_answer, explanation, act_reference')
      .eq('section_id', section.id)
      .eq('is_active', true)
      .is('study_note', null)

    if (!questions || questions.length === 0) {
      console.log(`Section ${section.number}: ${section.title} — already done, skipping`)
      continue
    }

    console.log(`Section ${section.number}: ${section.title} — ${questions.length} questions`)

    const kbText = await getKBText(section.number)

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      process.stdout.write(`  Q${i + 1}/${questions.length}... `)

      try {
        const studyNote = await generateStudyNote(q, kbText)

        const { error } = await supabase
          .from('questions')
          .update({ study_note: studyNote })
          .eq('id', q.id)

        if (error) {
          console.log(`DB ERROR: ${error.message}`)
          errors++
        } else {
          console.log('✓')
          total++
        }

        // Rate limit pause
        await new Promise(r => setTimeout(r, 300))
      } catch (err) {
        console.log(`ERROR: ${err.message}`)
        errors++
        await new Promise(r => setTimeout(r, 2000))
      }
    }

    console.log()
  }

  console.log(`\nDone. ${total} study notes generated, ${errors} errors.`)
}

main().catch(console.error)
