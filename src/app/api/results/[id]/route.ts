import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: attempt } = await adminClient
      .from('exam_attempts')
      .select('id, started_at, completed_at, score, total_questions, passed')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!attempt) return Response.json({ error: 'Results not found' }, { status: 404 })

    const { data: answers } = await adminClient
      .from('attempt_answers')
      .select('id, question_id, selected_answer, is_correct, questions(section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref)')
      .eq('attempt_id', id)

    const { data: sections } = await adminClient
      .from('sections')
      .select('id, number, title')
      .order('number')

    return Response.json({ attempt, answers: answers || [], sections: sections || [] })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
