'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type UserProfile = {
  id: string
  email: string
  full_name: string | null
  plan: string
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

function ReadinessGauge({ pct }: { pct: number | null }) {
  if (pct === null) return null
  const color = pct >= 70 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626'
  const label = pct >= 70 ? 'Ready' : pct >= 50 ? 'Getting there' : 'Needs work'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="10" />
          <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={`${(pct / 100) * 314} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#0B1F33', letterSpacing: '-1px' }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(false)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/login'); return }

      const [profileRes, attemptsRes] = await Promise.all([
        supabase.from('users').select('id, email, full_name, plan').eq('id', authUser.id).single(),
        supabase.from('exam_attempts').select('*').eq('user_id', authUser.id).order('started_at', { ascending: false }),
      ])

      setProfile(profileRes.data)
      setAttempts(attemptsRes.data || [])
      setLoading(false)
    }
    load()
  }, [router])

  async function handleStartExam() {
    if (!profile) return
    if (profile.plan === 'per_exam') {
      const completed = attempts.filter(a => a.status === 'completed')
      if (completed.length > 0) { setShowPayModal(true); return }
    }
    router.push('/exam')
  }

  async function handlePayForExam(upgrade: boolean) {
    if (!profile) return
    setPaying(true)
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: upgrade ? 'unlimited' : 'per_exam', userId: profile.id, email: profile.email }),
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
  const inProgressAttempt = attempts.find(a => a.status === 'in_progress')
  const avgScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((sum, a) => sum + ((a.score || 0) / (a.total_questions || 105) * 100), 0) / completedAttempts.length)
    : null
  const bestScore = completedAttempts.length > 0
    ? Math.round(Math.max(...completedAttempts.map(a => (a.score || 0) / (a.total_questions || 105) * 100)))
    : null
  const passRate = completedAttempts.length > 0
    ? Math.round((completedAttempts.filter(a => a.passed).length / completedAttempts.length) * 100)
    : null

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1F33', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 36, height: 36, border: '3px solid rgba(176,141,87,0.3)', borderTopColor: '#B08D57', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <p style={{ color: 'rgba(247,249,252,0.5)', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    )
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'there'

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B1F33' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, backgroundColor: '#B08D57', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontSize: 13, color: 'rgba(247,249,252,0.4)' }}>{profile?.email}</span>
          <span style={{ fontSize: 12, color: '#B08D57', backgroundColor: 'rgba(176,141,87,0.12)', padding: '3px 10px', borderRadius: 20, fontWeight: 500 }}>
            {profile?.plan === 'unlimited' ? 'Full Prep Access' : 'Per Exam'}
          </span>
          <button onClick={handleSignOut} style={{ fontSize: 13, color: 'rgba(247,249,252,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 48 }}>
          <div>
            <p style={{ fontSize: 13, color: 'rgba(247,249,252,0.4)', marginBottom: 6 }}>
              {new Date().toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F7F9FC', letterSpacing: '-0.8px' }}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {firstName}.
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {inProgressAttempt && (
              <Link href="/exam" style={{
                backgroundColor: 'rgba(176,141,87,0.15)', color: '#B08D57',
                fontSize: 13, fontWeight: 600, padding: '11px 20px', borderRadius: 8,
                textDecoration: 'none', border: '1px solid rgba(176,141,87,0.3)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                ↩ Resume exam
              </Link>
            )}
            <button onClick={handleStartExam} style={{
              backgroundColor: '#B08D57', color: '#0B1F33',
              fontSize: 13, fontWeight: 700, padding: '11px 24px',
              borderRadius: 8, border: 'none', cursor: 'pointer',
            }}>
              {completedAttempts.length === 0 ? 'Start first exam →' : 'New exam →'}
            </button>
          </div>
        </div>

        {/* Stats grid */}
        {completedAttempts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, marginBottom: 32 }}>

            {/* Readiness gauge */}
            <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(247,249,252,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Readiness</p>
              <ReadinessGauge pct={avgScore} />
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Exams taken', value: completedAttempts.length },
                { label: 'Best score', value: bestScore !== null ? `${bestScore}%` : '—' },
                { label: 'Pass rate', value: passRate !== null ? `${passRate}%` : '—' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(247,249,252,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{stat.label}</p>
                  <p style={{ fontSize: 32, fontWeight: 800, color: '#F7F9FC', letterSpacing: '-1px' }}>{stat.value}</p>
                </div>
              ))}

              {/* Score trend */}
              <div style={{ gridColumn: '1 / -1', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '24px' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(247,249,252,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>Score trend</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 60 }}>
                  {completedAttempts.slice().reverse().map((a, i) => {
                    const pct = Math.round((a.score || 0) / (a.total_questions || 105) * 100)
                    return (
                      <div key={a.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, maxWidth: 48 }}>
                        <span style={{ fontSize: 10, color: 'rgba(247,249,252,0.4)' }}>{pct}%</span>
                        <div style={{
                          width: '100%', borderRadius: 4,
                          height: `${Math.max((pct / 100) * 40, 4)}px`,
                          backgroundColor: pct >= 70 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626',
                          opacity: 0.8,
                        }} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: '64px 48px', textAlign: 'center', marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, backgroundColor: 'rgba(176,141,87,0.12)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span style={{ fontSize: 28 }}>📋</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F7F9FC', marginBottom: 8 }}>No exams taken yet</h2>
            <p style={{ fontSize: 14, color: 'rgba(247,249,252,0.45)', marginBottom: 28, lineHeight: 1.7 }}>
              Your results, scores, and readiness score will appear here after your first exam.
            </p>
            <button onClick={handleStartExam} style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 700, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Start your first exam →
            </button>
          </div>
        )}

        {/* Exam history */}
        {completedAttempts.length > 0 && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: '#F7F9FC' }}>Exam History</h2>
              <span style={{ fontSize: 12, color: 'rgba(247,249,252,0.35)' }}>{completedAttempts.length} attempt{completedAttempts.length !== 1 ? 's' : ''}</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Date', 'Score', 'Result', 'Time', ''].map(h => (
                    <th key={h} style={{ padding: '12px 28px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'rgba(247,249,252,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {completedAttempts.map(attempt => {
                  const pct = Math.round((attempt.score || 0) / (attempt.total_questions || 105) * 100)
                  const passed = pct >= 70
                  return (
                    <tr key={attempt.id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '16px 28px', fontSize: 13, color: 'rgba(247,249,252,0.7)' }}>{formatDate(attempt.started_at)}</td>
                      <td style={{ padding: '16px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 80, height: 4, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                            <div style={{ height: 4, borderRadius: 2, width: `${pct}%`, backgroundColor: passed ? '#16A34A' : '#DC2626' }} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#F7F9FC' }}>{pct}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 28px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20, backgroundColor: passed ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)', color: passed ? '#4ADE80' : '#F87171' }}>
                          {passed ? 'Pass' : 'Fail'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 28px', fontSize: 13, color: 'rgba(247,249,252,0.4)' }}>{elapsed(attempt.started_at, attempt.completed_at)}</td>
                      <td style={{ padding: '16px 28px' }}>
                        <Link href={`/results/${attempt.id}`} style={{ fontSize: 13, color: '#B08D57', fontWeight: 600, textDecoration: 'none' }}>
                          Review →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Upgrade nudge */}
        {profile?.plan === 'per_exam' && completedAttempts.length > 0 && (
          <div style={{ marginTop: 16, backgroundColor: 'rgba(176,141,87,0.08)', borderRadius: 16, border: '1px solid rgba(176,141,87,0.2)', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#F7F9FC', marginBottom: 2 }}>Upgrade to Full Prep Access</p>
              <p style={{ fontSize: 13, color: 'rgba(247,249,252,0.5)' }}>Unlimited exams for $49.99 — one-time payment.</p>
            </div>
            <button onClick={() => handlePayForExam(true)} style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Upgrade — $49.99
            </button>
          </div>
        )}

      </div>

      {/* Payment modal */}
      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div style={{ backgroundColor: '#1E3048', borderRadius: 20, padding: '36px', maxWidth: 420, width: '100%', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F7F9FC', letterSpacing: '-0.5px', marginBottom: 8 }}>Ready for another exam?</h2>
            <p style={{ fontSize: 14, color: 'rgba(247,249,252,0.55)', lineHeight: 1.7, marginBottom: 28 }}>
              You&apos;ve used your exam attempt. Purchase another or upgrade to Full Prep Access for unlimited exams.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => handlePayForExam(true)} disabled={paying}
                style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 700, padding: '13px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
                Full Prep Access — $49.99
              </button>
              <button onClick={() => handlePayForExam(false)} disabled={paying}
                style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#F7F9FC', fontSize: 14, fontWeight: 500, padding: '13px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
                Pay $9.99 for one exam
              </button>
              <button onClick={() => setShowPayModal(false)}
                style={{ backgroundColor: 'transparent', color: 'rgba(247,249,252,0.35)', fontSize: 13, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
