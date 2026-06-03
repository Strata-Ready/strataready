import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false })
      .limit(1)
      .single()

    if (!attempt) return Response.json({ attemptId: null })

    const { data: attemptAnswers } = await adminClient
      .from('attempt_answers')
      .select('question_id, selected_answer, questions(id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty)')
      .eq('attempt_id', attempt.id)

    const questions = (attemptAnswers || []).map(a => a.questions).filter(Boolean)

    return Response.json({ attemptId: attempt.id, questions })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
