import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    // Get all sections
    const { data: sections } = await adminClient
      .from('sections')
      .select('id, number')
      .order('number')

    if (!sections || sections.length === 0) {
      return Response.json({ error: 'No sections found' }, { status: 500 })
    }

    // Pick 5 random questions per section
    const allQuestions: any[] = []

    for (const section of sections) {
      const { data: questions } = await adminClient
        .from('questions')
        .select('id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty')
        .eq('section_id', section.id)
        .eq('is_active', true)

      if (questions && questions.length > 0) {
        // Shuffle and take 5
        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, 5)
        allQuestions.push(...shuffled)
      }
    }

    // Shuffle the full question list
    const shuffledAll = allQuestions.sort(() => Math.random() - 0.5)

    // Create exam attempt
    const { data: attempt, error: attemptError } = await adminClient
      .from('exam_attempts')
      .insert({
        user_id: user.id,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        total_questions: shuffledAll.length,
      })
      .select()
      .single()

    if (attemptError || !attempt) {
      return Response.json({ error: 'Failed to create attempt' }, { status: 500 })
    }

    return Response.json({
      attemptId: attempt.id,
      questions: shuffledAll,
    })

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
