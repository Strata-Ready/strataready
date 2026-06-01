import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { attemptId, answers } = await request.json()
    // answers: [{ questionId, selectedAnswer, correctAnswer, isCorrect, sectionId }]

    if (!attemptId || !answers) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify attempt belongs to user
    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id, user_id')
      .eq('id', attemptId)
      .eq('user_id', user.id)
      .single()

    if (!attempt) {
      return Response.json({ error: 'Attempt not found' }, { status: 404 })
    }

    // Insert all answers
    const answerRows = answers.map((a: any) => ({
      attempt_id: attemptId,
      question_id: a.questionId,
      selected_answer: a.selectedAnswer,
      is_correct: a.isCorrect,
    }))

    await adminClient.from('attempt_answers').insert(answerRows)

    // Calculate score
    const score = answers.filter((a: any) => a.isCorrect).length
    const totalQuestions = answers.length
    const passed = (score / totalQuestions) >= 0.70

    // Update attempt
    await adminClient
      .from('exam_attempts')
      .update({
        completed_at: new Date().toISOString(),
        score,
        total_questions: totalQuestions,
        passed,
        status: 'completed',
      })
      .eq('id', attemptId)

    return Response.json({ attemptId, score, totalQuestions, passed })

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
