const { createClient } = require('@supabase/supabase-js')
const Anthropic = require('@anthropic-ai/sdk')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

async function generateDistractors(question) {
  const prompt = `You are writing explanation text for a BC Strata Management licensing exam question.

Given the following multiple choice question, write a distractor explanation that:
1. Explains why the correct answer is correct (1-2 sentences)
2. Explains why each wrong answer is incorrect (1 sentence each)

Format your response as plain text like this:
Option (${question.correct_answer}) is correct because [reason]. Option (A) is incorrect because [reason]. Option (B) is incorrect because [reason]. Option (C) is incorrect because [reason]. Option (D) is incorrect because [reason].

Only include the three wrong options in the "incorrect" explanations — skip the correct answer in that list.

Question: ${question.question_text}

A: ${question.option_a}
B: ${question.option_b}
C: ${question.option_c}
D: ${question.option_d}

Correct answer: ${question.correct_answer}

Existing explanation: ${question.explanation}

Return ONLY the distractor explanation text. No preamble, no JSON, no markdown.`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  })

  return response.content
    .filter(b => b.type === 'text')
    .map(b => b.text)
    .join('')
    .trim()
}

async function main() {
  // Get all questions without distractor explanations
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation')
    .is('distractor_explanations', null)
    .eq('is_active', true)
    .order('id')

  if (error) { console.log('Error:', error.message); return }
  console.log(`Found ${questions.length} questions without distractor explanations\n`)

  let done = 0
  let failed = 0

  for (const q of questions) {
    process.stdout.write(`[${done + 1}/${questions.length}] ${q.id.slice(0, 8)}... `)
    try {
      const distractor = await generateDistractors(q)

      const { error: updateError } = await supabase
        .from('questions')
        .update({ distractor_explanations: distractor })
        .eq('id', q.id)

      if (updateError) {
        console.log(`DB ERROR: ${updateError.message}`)
        failed++
      } else {
        console.log('OK')
        done++
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300))
    } catch (err) {
      console.log(`ERROR: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. ${done} updated, ${failed} failed.`)
}

main().catch(console.error)
