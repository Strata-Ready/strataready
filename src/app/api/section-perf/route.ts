import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: attempts } = await adminClient
      .from('exam_attempts')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'completed')

    const attemptIds = (attempts || []).map(a => a.id)

    const { data: sections } = await adminClient
      .from('sections')
      .select('id, number, title')
      .order('number')

    if (!attemptIds.length) {
      return Response.json({ sectionPerf: [] })
    }

    const { data: answers } = await adminClient
      .from('attempt_answers')
      .select('is_correct, questions(section_id)')
      .in('attempt_id', attemptIds)

    const perfMap: Record<number, { title: string; correct: number; total: number }> = {}
    for (const s of sections || []) {
      perfMap[s.id] = { title: s.title, correct: 0, total: 0 }
    }

    for (const a of answers || []) {
      const sid = (a.questions as any)?.section_id
      if (sid && perfMap[sid]) {
        perfMap[sid].total++
        if (a.is_correct) perfMap[sid].correct++
      }
    }

    const sectionPerf = Object.entries(perfMap)
      .filter(([, v]) => v.total > 0)
      .map(([id, v]) => ({
        id: parseInt(id),
        title: v.title,
        correct: v.correct,
        total: v.total,
        pct: Math.round((v.correct / v.total) * 100),
      }))
      .sort((a, b) => a.id - b.id)

    return Response.json({ sectionPerf })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
