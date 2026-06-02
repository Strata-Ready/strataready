const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const USER_ID = 'af418069-7860-4a5a-9862-9a925e77bc1a'

async function runExam(examNum) {
  const { data: sections } = await supabase.from('sections').select('id').order('number')

  const allQuestions = []
  for (const section of sections) {
    const { data: questions } = await supabase
      .from('questions')
      .select('id, section_id, correct_answer')
      .eq('section_id', section.id)
      .eq('is_active', true)
    if (questions && questions.length > 0) {
      const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 5)
      allQuestions.push(...shuffled)
    }
  }

  const startedAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  const completedAt = new Date(startedAt.getTime() + (45 + Math.random() * 60) * 60 * 1000)

  const { data: attempt } = await supabase.from('exam_attempts').insert({
    user_id: USER_ID,
    started_at: startedAt.toISOString(),
    completed_at: completedAt.toISOString(),
    status: 'completed',
    total_questions: allQuestions.length,
  }).select().single()

  const answerRows = allQuestions.map(q => {
    const options = ['A', 'B', 'C', 'D']
    const selected = options[Math.floor(Math.random() * 4)]
    return {
      attempt_id: attempt.id,
      question_id: q.id,
      selected_answer: selected,
      is_correct: selected === q.correct_answer,
    }
  })

  await supabase.from('attempt_answers').insert(answerRows)

  const score = answerRows.filter(a => a.is_correct).length
  const passed = (score / allQuestions.length) >= 0.70

  await supabase.from('exam_attempts').update({
    score,
    passed,
  }).eq('id', attempt.id)

  console.log(`Exam ${examNum}: ${score}/${allQuestions.length} (${Math.round(score/allQuestions.length*100)}%) — ${passed ? 'PASS' : 'FAIL'}`)
}

async function main() {
  console.log('Running 5 test exams...\n')
  for (let i = 1; i <= 5; i++) {
    await runExam(i)
  }
  console.log('\nDone.')
}

main().catch(console.error)
