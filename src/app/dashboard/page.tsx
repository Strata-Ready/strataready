'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type User = {
  id: string
  email: string
  full_name: string | null
  plan: string
  created_at: string
}

type Attempt = {
  id: string
  started_at: string
  completed_at: string | null
  score: number | null
  total_questions: number
  passed: boolean | null
  status: string
}

function elapsed(start: string, end: string | null) {
  if (!end) return '—'
  const ms = new Date(end).getTime() - new Date(start).getTime()
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${mins}m ${secs}s`
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(false)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/login'); return }

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single()

      const { data: examAttempts } = await supabase
        .from('exam_attempts')
        .select('*')
        .eq('user_id', authUser.id)
        .order('started_at', { ascending: false })

      setUser(profile)
      setAttempts(examAttempts || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleStartExam() {
    if (!user) return
    if (user.plan === 'per_exam') {
      const completed = attempts.filter(a => a.status === 'completed')
      if (completed.length > 0) {
        setShowPayModal(true)
        return
      }
    }
    router.push('/exam')
  }

  async function handlePayForExam(upgrade: boolean) {
    if (!user) return
    setPaying(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: upgrade ? 'unlimited' : 'per_exam',
        userId: user.id,
        email: user.email,
      }),
    })
    const { url } = await res.json()
    window.location.href = url
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const completedAttempts = attempts.filter(a => a.status === 'completed')
  const avgScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / completedAttempts.length / (attempts[0]?.total_questions || 105) * 100)
    : null

  const weakSections: string[] = [] // populated from section_performance in future

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: 14 }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>

      {/* Nav */}
      <nav style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)' }}>{user?.email}</span>
          <button onClick={handleSignOut} style={{ fontSize: 13, color: 'rgba(247,249,252,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.6px', marginBottom: 4 }}>
              {user?.full_name ? `Welcome back, ${user.full_name.split(' ')[0]}` : 'Your Dashboard'}
            </h1>
            <p style={{ fontSize: 13, color: '#64748B' }}>
              {user?.plan === 'unlimited' ? 'Full Prep Access' : 'Per Exam'} ·{' '}
              {completedAttempts.length} exam{completedAttempts.length !== 1 ? 's' : ''} taken
            </p>
          </div>
          <button
            onClick={handleStartExam}
            style={{
              backgroundColor: '#B08D57', color: '#0B1F33',
              fontSize: 14, fontWeight: 700, padding: '12px 24px',
              borderRadius: 8, border: 'none', cursor: 'pointer',
            }}
          >
            Start Exam →
          </button>
        </div>

        {/* Stats */}
        {completedAttempts.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Exams taken', value: completedAttempts.length },
              { label: 'Average score', value: avgScore !== null ? `${avgScore}%` : '—' },
              { label: 'Best score', value: completedAttempts.length > 0 ? `${Math.round(Math.max(...completedAttempts.map(a => (a.score || 0) / (a.total_questions || 105) * 100)))}%` : '—' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: 'white', borderRadius: 10, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 4 }}>{stat.value}</p>
                <p style={{ fontSize: 13, color: '#64748B' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Exam history */}
        <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33' }}>Exam History</h2>
          </div>

          {completedAttempts.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: '#0B1F33', fontWeight: 600, marginBottom: 8 }}>No exams taken yet</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Your results and score history will appear here after your first exam.</p>
              <button
                onClick={handleStartExam}
                style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Take your first exam →
              </button>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  {['Date', 'Score', 'Result', 'Time', 'Review'].map(h => (
                    <th key={h} style={{ padding: '10px 24px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {completedAttempts.map((attempt, i) => {
                  const pct = Math.round((attempt.score || 0) / (attempt.total_questions || 105) * 100)
                  const passed = pct >= 70
                  return (
                    <tr key={attempt.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 24px', fontSize: 13, color: '#0B1F33' }}>{formatDate(attempt.started_at)}</td>
                      <td style={{ padding: '14px 24px', fontSize: 13, fontWeight: 700, color: '#0B1F33' }}>{pct}%</td>
                      <td style={{ padding: '14px 24px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 8px', borderRadius: 4, backgroundColor: passed ? '#DCFCE7' : '#FEE2E2', color: passed ? '#166534' : '#991B1B' }}>
                          {passed ? 'Pass' : 'Fail'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 24px', fontSize: 13, color: '#64748B' }}>{elapsed(attempt.started_at, attempt.completed_at)}</td>
                      <td style={{ padding: '14px 24px' }}>
                        <Link href={`/results/${attempt.id}`} style={{ fontSize: 13, color: '#B08D57', fontWeight: 600, textDecoration: 'none' }}>
                          Review →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Upgrade nudge for per_exam users */}
        {user?.plan === 'per_exam' && completedAttempts.length > 0 && (
          <div style={{ marginTop: 24, backgroundColor: '#0B1F33', borderRadius: 12, padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#F7F9FC', marginBottom: 4 }}>Upgrade to Full Prep Access</p>
              <p style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)' }}>Unlimited exams for $49.99 — one-time payment.</p>
            </div>
            <button
              onClick={() => handlePayForExam(true)}
              style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Upgrade — $49.99
            </button>
          </div>
        )}

      </div>

      {/* Payment modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div style={{ backgroundColor: 'white', borderRadius: 16, padding: '32px', maxWidth: 440, width: '100%' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 8 }}>Ready for another exam?</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
              You have used your exam attempt. Purchase another attempt or upgrade to Full Prep Access for unlimited exams.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => handlePayForExam(false)}
                disabled={paying}
                style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Pay $9.99 for one exam
              </button>
              <button
                onClick={() => handlePayForExam(true)}
                disabled={paying}
                style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Upgrade to Full Prep Access — $49.99
              </button>
              <button
                onClick={() => setShowPayModal(false)}
                style={{ backgroundColor: 'transparent', color: '#94A3B8', fontSize: 13, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
