import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id, question_ids')
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .order('started_at', { ascending: false })
      .limit(1)
      .single()

    if (!attempt?.question_ids?.length) return Response.json({ attemptId: null })

    const { data: questions } = await adminClient
      .from('questions')
      .select('id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty')
      .in('id', attempt.question_ids)

    // Restore saved answers
    const { data: savedAnswers } = await adminClient
      .from('attempt_answers')
      .select('question_id, selected_answer')
      .eq('attempt_id', attempt.id)

    const answers: Record<string, string> = {}
    for (const a of savedAnswers || []) {
      if (a.selected_answer) answers[a.question_id] = a.selected_answer
    }

    // Preserve original question order
    const orderedQuestions = attempt.question_ids
      .map((id: string) => (questions || []).find(q => q.id === id))
      .filter(Boolean)

    return Response.json({ attemptId: attempt.id, questions: orderedQuestions, answers })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
