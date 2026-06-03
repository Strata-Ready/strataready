import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { attemptId } = await request.json()

    if (!attemptId) return Response.json({ error: 'Missing attemptId' }, { status: 400 })

    // Verify attempt belongs to user
    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id, user_id, total_questions')
      .eq('id', attemptId)
      .eq('user_id', user.id)
      .single()

    if (!attempt) return Response.json({ error: 'Attempt not found' }, { status: 404 })

    // Read answers from DB (already saved via upsert during exam)
    const { data: answers } = await adminClient
      .from('attempt_answers')
      .select('is_correct')
      .eq('attempt_id', attemptId)

    const score = (answers || []).filter(a => a.is_correct).length
    const totalQuestions = attempt.total_questions
    const passed = (score / totalQuestions) >= 0.70

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
