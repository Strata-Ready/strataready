import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { attemptId, questionId, selectedAnswer, correctAnswer, sectionId } = await request.json()

    // Verify attempt belongs to user and is still in progress
    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id')
      .eq('id', attemptId)
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .single()

    if (!attempt) return Response.json({ error: 'Attempt not found or already submitted' }, { status: 404 })

    const isCorrect = selectedAnswer === correctAnswer

    // Upsert — insert or update if already answered
    await adminClient
      .from('attempt_answers')
      .upsert({
        attempt_id: attemptId,
        question_id: questionId,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
      }, { onConflict: 'attempt_id,question_id' })

    return Response.json({ ok: true })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
