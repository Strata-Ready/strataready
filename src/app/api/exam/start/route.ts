import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const SECTION_WEIGHTS: Record<number, number> = {
  1:  6,  2:  3,  3:  4,  4:  5,  5:  4,
  6:  6,  7:  6,  8:  3,  9:  2,  10: 10,
  11: 3,  12: 8,  13: 3,  14: 3,  15: 2,
  16: 5,  17: 2,  18: 3,  19: 8,  20: 8,  21: 3,
}

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    // Block if user already has an in-progress attempt
    const { data: existing } = await adminClient
      .from('exam_attempts')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'in_progress')
      .limit(1)
      .single()

    if (existing) {
      return Response.json({ error: 'You already have an exam in progress. Please complete or resume it first.' }, { status: 409 })
    }

    const { data: sections } = await adminClient
      .from('sections')
      .select('id, number')
      .order('number')

    if (!sections || sections.length === 0) {
      return Response.json({ error: 'No sections found' }, { status: 500 })
    }

    const allQuestions: any[] = []
    const usedIds = new Set<string>()

    for (const section of sections) {
      const count = SECTION_WEIGHTS[section.number] || 2
      const { data: questions } = await adminClient
        .from('questions')
        .select('id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty')
        .eq('section_id', section.id)
        .eq('is_active', true)
      if (questions && questions.length > 0) {
        const shuffled = questions.sort(() => Math.random() - 0.5).slice(0, count)
        shuffled.forEach(q => { allQuestions.push(q); usedIds.add(q.id) })
      }
    }

    if (allQuestions.length < 100) {
      const { data: extras } = await adminClient
        .from('questions')
        .select('id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty')
        .eq('is_active', true)
        .not('id', 'in', `(${Array.from(usedIds).join(',')})`)
        .limit(100 - allQuestions.length)
      if (extras) extras.forEach(q => allQuestions.push(q))
    }

    const final = allQuestions.sort(() => Math.random() - 0.5).slice(0, 100)

    const { data: attempt, error: attemptError } = await adminClient
      .from('exam_attempts')
      .insert({
        user_id: user.id,
        started_at: new Date().toISOString(),
        status: 'in_progress',
        total_questions: final.length,
      })
      .select()
      .single()

    if (attemptError || !attempt) {
      return Response.json({ error: 'Failed to create attempt' }, { status: 500 })
    }

    return Response.json({ attemptId: attempt.id, questions: final })

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
