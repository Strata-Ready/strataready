const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const USER_ID = '7f997c62-cdda-4212-8392-7784e62042a0'

async function run() {
  console.log('Starting exam test...\n')

  // Get all sections
  const { data: sections } = await supabase.from('sections').select('id, number').order('number')
  console.log(`Sections: ${sections.length}`)

  // Pick 5 random questions per section
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

  console.log(`Questions loaded: ${allQuestions.length}\n`)

  // Create exam attempt
  const { data: attempt, error: attemptError } = await supabase
    .from('exam_attempts')
    .insert({
      user_id: USER_ID,
      started_at: new Date().toISOString(),
      status: 'in_progress',
      total_questions: allQuestions.length,
    })
    .select()
    .single()

  if (attemptError) { console.log('ERROR creating attempt:', attemptError.message); return }
  console.log(`Attempt created: ${attempt.id}`)

  // Generate random answers
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

  // Insert answers
  const { error: answersError } = await supabase.from('attempt_answers').insert(answerRows)
  if (answersError) { console.log('ERROR inserting answers:', answersError.message); return }

  // Calculate score
  const score = answerRows.filter(a => a.is_correct).length
  const passed = (score / allQuestions.length) >= 0.70

  // Update attempt
  const { error: updateError } = await supabase
    .from('exam_attempts')
    .update({
      completed_at: new Date().toISOString(),
      score,
      total_questions: allQuestions.length,
      passed,
      status: 'completed',
    })
    .eq('id', attempt.id)

  if (updateError) { console.log('ERROR updating attempt:', updateError.message); return }

  console.log(`\nExam complete!`)
  console.log(`Score: ${score}/${allQuestions.length} (${Math.round(score/allQuestions.length*100)}%)`)
  console.log(`Passed: ${passed}`)
  console.log(`\nResults page: https://strataready.vercel.app/results/${attempt.id}`)
}

run().catch(console.error)
