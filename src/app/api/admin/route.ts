import { adminClient } from '@/lib/supabase/admin'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const adminKey = request.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [
    { data: users },
    { data: attempts },
  ] = await Promise.all([
    adminClient.from('users').select('id, email, full_name, plan, created_at').order('created_at', { ascending: false }),
    adminClient.from('exam_attempts').select('id, user_id, score, total_questions, passed, started_at, completed_at, status').eq('status', 'completed'),
  ])

  // Build per-user stats
  const userStats: Record<string, { exams: number; avgScore: number; bestScore: number; passRate: number; lastActive: string | null }> = {}

  for (const u of users || []) {
    const userAttempts = (attempts || []).filter(a => a.user_id === u.id)
    const scores = userAttempts.map(a => Math.round((a.score || 0) / (a.total_questions || 100) * 100))
    const passes = userAttempts.filter(a => a.passed).length
    const lastAttempt = userAttempts.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())[0]
    userStats[u.id] = {
      exams: userAttempts.length,
      avgScore: scores.length ? Math.round(scores.reduce((s, n) => s + n, 0) / scores.length) : 0,
      bestScore: scores.length ? Math.max(...scores) : 0,
      passRate: userAttempts.length ? Math.round(passes / userAttempts.length * 100) : 0,
      lastActive: lastAttempt?.started_at || null,
    }
  }

  // Platform stats
  const allScores = (attempts || []).map(a => Math.round((a.score || 0) / (a.total_questions || 100) * 100))
  const allPasses = (attempts || []).filter(a => a.passed).length
  const perExamUsers = (users || []).filter(u => u.plan === 'per_exam').length
  const unlimitedUsers = (users || []).filter(u => u.plan === 'unlimited').length
  const estimatedRevenue = perExamUsers * 9.99 + unlimitedUsers * 49.99

  const platform = {
    totalUsers: (users || []).length,
    perExamUsers,
    unlimitedUsers,
    totalExams: (attempts || []).length,
    avgScore: allScores.length ? Math.round(allScores.reduce((s, n) => s + n, 0) / allScores.length) : 0,
    passRate: (attempts || []).length ? Math.round(allPasses / (attempts || []).length * 100) : 0,
    estimatedRevenue: Math.round(estimatedRevenue * 100) / 100,
  }

  return Response.json({ users, userStats, platform })
}
