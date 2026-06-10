import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    // Allow admin to view any attempt
    const adminKey = request.headers.get('x-admin-key')
    const isAdmin = adminKey && adminKey === process.env.ADMIN_KEY

    let attemptQuery = adminClient
      .from('exam_attempts')
      .select('id, started_at, completed_at, score, total_questions, passed')
      .eq('id', id)

    if (!isAdmin) attemptQuery = attemptQuery.eq('user_id', user.id)

    const { data: attempt } = await attemptQuery.single()

    if (!attempt) return Response.json({ error: 'Results not found' }, { status: 404 })

    const { data: answers } = await adminClient
      .from('attempt_answers')
      .select('id, question_id, selected_answer, is_correct, questions(section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, distractor_explanations, act_reference, regulation_ref, study_note)')
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
