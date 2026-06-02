const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const USER_ID = 'af418069-7860-4a5a-9862-9a925e77bc1a'

const SECTION_WEIGHTS = {
  1:6, 2:3, 3:4, 4:5, 5:4, 6:6, 7:6, 8:3, 9:2, 10:10,
  11:3, 12:8, 13:3, 14:3, 15:2, 16:5, 17:2, 18:3, 19:8, 20:8, 21:3
}

async function runExam(examNum, correctPct) {
  const { data: sections } = await supabase.from('sections').select('id, number').order('number')
  const allQuestions = []

  for (const section of sections) {
    const count = SECTION_WEIGHTS[section.number] || 2
    const { data: questions } = await supabase
      .from('questions')
      .select('id, section_id, correct_answer')
      .eq('section_id', section.id)
      .eq('is_active', true)

    if (questions && questions.length > 0) {
      const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, count)
      allQuestions.push(...shuffled)
    }
  }

  // Top up to exactly 100 if needed
  if (allQuestions.length < 100) {
    const { data: extras } = await supabase
      .from('questions')
      .select('id, section_id, correct_answer')
      .eq('is_active', true)
      .not('id', 'in', `(${allQuestions.map(q => q.id).join(',')})`)
      .limit(100 - allQuestions.length)
    if (extras) allQuestions.push(...extras)
  }

  const finalQuestions = allQuestions.slice(0, 100).sort(() => Math.random() - 0.5)

  const startedAt = new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000)
  const completedAt = new Date(startedAt.getTime() + (90 + Math.random() * 60) * 60 * 1000)

  const { data: attempt } = await supabase.from('exam_attempts').insert({
    user_id: USER_ID,
    started_at: startedAt.toISOString(),
    completed_at: completedAt.toISOString(),
    status: 'completed',
    total_questions: finalQuestions.length,
  }).select().single()

  const options = ['A', 'B', 'C', 'D']
  const answerRows = finalQuestions.map(q => {
    const correct = Math.random() < correctPct
    const selected = correct ? q.correct_answer : options.filter(o => o !== q.correct_answer)[Math.floor(Math.random() * 3)]
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

  await supabase.from('exam_attempts').update({ score, passed }).eq('id', attempt.id)

  console.log(`Exam ${examNum}: ${score}/${allQuestions.length} (${Math.round(score/allQuestions.length*100)}%) — ${passed ? 'PASS ✓' : 'FAIL ✗'}`)
}

async function main() {
  console.log('Running 2 passing exams...\n')
  await runExam(1, 0.82) // ~86% score
  await runExam(2, 0.78) // ~82% score
  console.log('\nDone.')
}

main().catch(console.error)
