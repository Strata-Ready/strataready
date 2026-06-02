import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// Questions per section — weighted to match real exam emphasis
const SECTION_WEIGHTS: Record<number, number> = {
  1:  6,  // Law & RESA
  2:  3,  // Ethics
  3:  4,  // Land & Title
  4:  5,  // Liability
  5:  4,  // Tenancies
  6:  6,  // Contracts
  7:  6,  // Agency
  8:  3,  // Disputes
  9:  2,  // Strata Properties
  10: 10, // Strata Act
  11: 3,  // Sections
  12: 8,  // Governance
  13: 3,  // Privacy
  14: 3,  // Construction
  15: 2,  // Maintenance
  16: 5,  // Risk & Insurance
  17: 2,  // Local Government
  18: 3,  // Accounting
  19: 8,  // Operating Budget
  20: 8,  // CRF & Depreciation
  21: 3,  // Purchasing & Personnel
}
// Total: 100

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

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

    // Top up to exactly 100 if needed
    if (allQuestions.length < 100) {
      const { data: extras } = await adminClient
        .from('questions')
        .select('id, section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref, difficulty')
        .eq('is_active', true)
        .not('id', 'in', `(${Array.from(usedIds).join(',')})`)
        .limit(100 - allQuestions.length)
      if (extras) extras.forEach(q => allQuestions.push(q))
    }

    // Shuffle and take exactly 100
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

    return Response.json({
      attemptId: attempt.id,
      questions: final,
    })

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
