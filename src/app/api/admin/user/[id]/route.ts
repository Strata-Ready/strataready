import { adminClient } from '@/lib/supabase/admin'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  const [
    { data: user },
    { data: attempts },
    { data: sections },
  ] = await Promise.all([
    adminClient.from('users').select('id, email, full_name, plan, created_at, stripe_customer_id').eq('id', id).single(),
    adminClient.from('exam_attempts').select('id, started_at, completed_at, score, total_questions, passed, status').eq('user_id', id).order('started_at', { ascending: false }),
    adminClient.from('sections').select('id, number, title').order('number'),
  ])

  // Section performance across all attempts
  const completedAttempts = (attempts || []).filter(a => a.status === 'completed')
  const attemptIds = completedAttempts.map(a => a.id)

  let sectionPerf: any[] = []
  if (attemptIds.length > 0) {
    const { data: answers } = await adminClient
      .from('attempt_answers')
      .select('is_correct, questions(section_id)')
      .in('attempt_id', attemptIds)

    const perfMap: Record<number, { title: string; correct: number; total: number }> = {}
    for (const s of sections || []) perfMap[s.id] = { title: s.title, correct: 0, total: 0 }
    for (const a of answers || []) {
      const sid = (a.questions as any)?.section_id
      if (sid && perfMap[sid]) {
        perfMap[sid].total++
        if (a.is_correct) perfMap[sid].correct++
      }
    }
    sectionPerf = Object.entries(perfMap)
      .filter(([, v]) => v.total > 0)
      .map(([id, v]) => ({ id: parseInt(id), title: v.title, correct: v.correct, total: v.total, pct: Math.round((v.correct / v.total) * 100) }))
      .sort((a, b) => a.id - b.id)
  }

  return Response.json({ user, attempts: attempts || [], sectionPerf, sections: sections || [] })
}
