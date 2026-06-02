'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'

type UserProfile = { id: string; email: string; full_name: string | null; plan: string; created_at: string; stripe_customer_id: string | null }
type Attempt = { id: string; started_at: string; completed_at: string | null; score: number | null; total_questions: number; passed: boolean | null; status: string }
type SectionPerf = { id: number; title: string; correct: number; total: number; pct: number }

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

function SkillsMap({ sections }: { sections: SectionPerf[] }) {
  if (sections.length === 0) return null
  const size = 470; const cx = size / 2; const cy = size / 2
  const outerR = 156; const innerR = 52; const n = sections.length; const gap = 0.02
  const segments = sections.map((s, i) => {
    const startAngle = (i / n) * 2 * Math.PI - Math.PI / 2 + gap / 2
    const endAngle = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2 - gap / 2
    const midAngle = (startAngle + endAngle) / 2
    const fillR = innerR + (outerR - innerR) * (s.pct / 100)
    const labelR = outerR + 14
    const color = s.pct >= 70 ? '#16A34A' : s.pct >= 50 ? '#D97706' : '#DC2626'
    const bgColor = s.pct >= 70 ? '#DCFCE7' : s.pct >= 50 ? '#FEF3C7' : '#FEE2E2'
    const large = endAngle - startAngle > Math.PI ? 1 : 0
    const bgX1 = cx + outerR * Math.cos(startAngle); const bgY1 = cy + outerR * Math.sin(startAngle)
    const bgX2 = cx + outerR * Math.cos(endAngle); const bgY2 = cy + outerR * Math.sin(endAngle)
    const bgI1 = cx + innerR * Math.cos(startAngle); const bgI2 = cy + innerR * Math.sin(startAngle)
    const bgI3 = cx + innerR * Math.cos(endAngle); const bgI4 = cy + innerR * Math.sin(endAngle)
    const bgPath = `M ${bgI1} ${bgI2} L ${bgX1} ${bgY1} A ${outerR} ${outerR} 0 ${large} 1 ${bgX2} ${bgY2} L ${bgI3} ${bgI4} A ${innerR} ${innerR} 0 ${large} 0 ${bgI1} ${bgI2} Z`
    const fX1 = cx + fillR * Math.cos(startAngle); const fY1 = cy + fillR * Math.sin(startAngle)
    const fX2 = cx + fillR * Math.cos(endAngle); const fY2 = cy + fillR * Math.sin(endAngle)
    const fillPath = `M ${bgI1} ${bgI2} L ${fX1} ${fY1} A ${fillR} ${fillR} 0 ${large} 1 ${fX2} ${fY2} L ${bgI3} ${bgI4} A ${innerR} ${innerR} 0 ${large} 0 ${bgI1} ${bgI2} Z`
    const lx = cx + labelR * Math.cos(midAngle); const ly = cy + labelR * Math.sin(midAngle)
    const anchor: 'start' | 'end' | 'middle' = Math.cos(midAngle) > 0.15 ? 'start' : Math.cos(midAngle) < -0.15 ? 'end' : 'middle'
    return { s, bgPath, fillPath, color, bgColor, lx, ly, midAngle, anchor }
  })
  const avgPct = sections.length > 0 ? Math.round(sections.reduce((sum, s) => sum + s.pct, 0) / sections.length) : 0
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {segments.map(({ s, bgPath, fillPath, color, bgColor }) => (
          <g key={s.id}><path d={bgPath} fill={bgColor} opacity="0.4" /><path d={fillPath} fill={color} opacity="0.85" /></g>
        ))}
        <circle cx={cx} cy={cy} r={innerR - 2} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="8" fill="#94A3B8" fontWeight="500">avg</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fill="#0B1F33" fontWeight="800">{avgPct}%</text>
        {segments.map(({ s, lx, ly, anchor, color }, i) => {
          const yOffset = (i === 0 || i === n - 1) ? (i === 0 ? -8 : 8) : 0
          return (
            <g key={`label-${s.id}`}>
              {s.title.includes(' & ') ? (() => {
                const [before, after] = s.title.split(' & ')
                return (<>
                  <text x={lx} y={ly - 7 + yOffset} textAnchor={anchor} fontSize="8" fill="#0B1F33" fontWeight="600">{before} &amp;</text>
                  <text x={lx} y={ly + 3 + yOffset} textAnchor={anchor} fontSize="8" fill="#0B1F33" fontWeight="600">{after}</text>
                  <text x={lx} y={ly + 13 + yOffset} textAnchor={anchor} fontSize="8" fill={color} fontWeight="700">{s.pct}%</text>
                </>)
              })() : (<>
                <text x={lx} y={ly - 3 + yOffset} textAnchor={anchor} fontSize="8" fill="#0B1F33" fontWeight="600">{s.title}</text>
                <text x={lx} y={ly + 7 + yOffset} textAnchor={anchor} fontSize="8" fill={color} fontWeight="700">{s.pct}%</text>
              </>)}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const TIER1_SECTIONS = [10, 12, 19, 20]

function ExamReadiness({ attempts, sectionPerf }: { attempts: Attempt[], sectionPerf: SectionPerf[] }) {
  if (attempts.length === 0) return null
  const avgScore = attempts.reduce((sum, a) => sum + ((a.score || 0) / (a.total_questions || 100) * 100), 0) / attempts.length
  const tier1 = sectionPerf.filter(s => TIER1_SECTIONS.includes(s.id))
  const tier1Score = tier1.length > 0 ? tier1.reduce((sum, s) => sum + s.pct, 0) / tier1.length : avgScore
  const examBonus = Math.min(attempts.length / 5, 1) * 100
  let trendScore = 50
  if (attempts.length >= 2) {
    const sorted = [...attempts].sort((a, b) => new Date(a.started_at).getTime() - new Date(b.started_at).getTime())
    const recent = (sorted[sorted.length - 1].score || 0) / (sorted[sorted.length - 1].total_questions || 100) * 100
    const prev = (sorted[sorted.length - 2].score || 0) / (sorted[sorted.length - 2].total_questions || 100) * 100
    trendScore = recent > prev ? 75 : recent < prev ? 25 : 50
  }
  const sorted = [...attempts].sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
  const recentAvg = sorted.slice(0, 3).reduce((sum, a) => sum + ((a.score || 0) / (a.total_questions || 100) * 100), 0) / Math.min(attempts.length, 3)
  const readiness = Math.round(avgScore * 0.30 + tier1Score * 0.25 + examBonus * 0.15 + trendScore * 0.10 + recentAvg * 0.20)
  const capped = Math.min(readiness, 95)
  const label = capped >= 80 ? 'Exam Ready' : capped >= 65 ? 'Nearly Ready' : capped >= 45 ? 'In Progress' : 'Early Stage'
  const color = capped >= 80 ? '#16A34A' : capped >= 65 ? '#B08D57' : capped >= 45 ? '#D97706' : '#DC2626'
  const message = capped >= 80 ? 'Scores suggest well prepared.' : capped >= 65 ? 'Close — focus on weak sections.' : capped >= 45 ? 'In progress — more exams needed.' : 'Early stage.'
  const circumference = 2 * Math.PI * 44
  const dash = (capped / 100) * circumference
  return (
    <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>Exam Readiness</h2>
        <p style={{ fontSize: 12, color: '#94A3B8' }}>Based on scores, trends & coverage</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="44" fill="none" stroke="#F1F5F9" strokeWidth="10" />
            <circle cx="60" cy="60" r="44" fill="none" stroke={color} strokeWidth="10"
              strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round" transform="rotate(-90 60 60)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#0B1F33', letterSpacing: '-1px' }}>{capped}%</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color, backgroundColor: `${color}18`, padding: '3px 10px', borderRadius: 20 }}>{label}</span>
        <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, marginTop: 10 }}>{message}</p>
      </div>
      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { label: 'Avg score', value: `${Math.round(avgScore)}%` },
          { label: 'Recent scores', value: `${Math.round(recentAvg)}%` },
          { label: 'Core sections', value: `${Math.round(tier1Score)}%` },
          { label: 'Exams taken', value: attempts.length },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#94A3B8' }}>{item.label}</span>
            <span style={{ color: '#0B1F33', fontWeight: 600 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminUserPage({ params }: { params: Promise<{ id: string }> }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [sectionPerf, setSectionPerf] = useState<SectionPerf[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const adminKey = sessionStorage.getItem('admin_key')
      if (!adminKey) { setError('Not authenticated. Go back to /admin.'); setLoading(false); return }
      const { id } = await params
      const res = await fetch(`/api/admin/user/${id}`, { headers: { 'x-admin-key': adminKey } })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setUser(data.user)
      setAttempts(data.attempts)
      setSectionPerf(data.sectionPerf)
      setLoading(false)
    }
    load()
  }, [params])

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading...</p>
    </div>
  )

  if (error || !user) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#991B1B', fontSize: 14, marginBottom: 16 }}>{error || 'User not found.'}</p>
        <Link href="/admin" style={{ color: '#B08D57', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← Back to admin</Link>
      </div>
    </div>
  )

  const completedAttempts = attempts.filter(a => a.status === 'completed')
  const avgScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((sum, a) => sum + ((a.score || 0) / (a.total_questions || 100) * 100), 0) / completedAttempts.length)
    : null
  const bestScore = completedAttempts.length > 0
    ? Math.round(Math.max(...completedAttempts.map(a => (a.score || 0) / (a.total_questions || 100) * 100)))
    : null
  const passRate = completedAttempts.length > 0
    ? Math.round(completedAttempts.filter(a => a.passed).length / completedAttempts.length * 100)
    : null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <nav style={{ backgroundColor: '#0B1F33', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
          <span style={{ fontSize: 11, color: '#B08D57', backgroundColor: 'rgba(176,141,87,0.15)', padding: '2px 8px', borderRadius: 20, fontWeight: 600, letterSpacing: '0.05em' }}>ADMIN</span>
        </div>
        <Link href="/admin" style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)', textDecoration: 'none' }}>← All users</Link>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>

        {/* User header */}
        <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '28px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 4 }}>{user.full_name || 'No name'}</h1>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 12 }}>{user.email}</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, backgroundColor: user.plan === 'unlimited' ? '#DCFCE7' : '#F0F4F8', color: user.plan === 'unlimited' ? '#166534' : '#64748B' }}>
                  {user.plan === 'unlimited' ? 'Full Prep Access' : 'Per Exam'}
                </span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Joined {formatDate(user.created_at)}</span>
                {user.stripe_customer_id && (
                  <a href={`https://dashboard.stripe.com/customers/${user.stripe_customer_id}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 11, color: '#B08D57', fontWeight: 600, textDecoration: 'none' }}>Stripe ↗</a>
                )}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, minWidth: 280 }}>
              {[
                { label: 'Avg score', value: avgScore !== null ? `${avgScore}%` : '—' },
                { label: 'Best score', value: bestScore !== null ? `${bestScore}%` : '—' },
                { label: 'Exams taken', value: completedAttempts.length },
                { label: 'Pass rate', value: passRate !== null ? `${passRate}%` : '—' },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: '12px 16px' }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {completedAttempts.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '60px 48px', textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#94A3B8' }}>No exams taken yet.</p>
          </div>
        ) : (
          <>
            {/* Skills map + Readiness */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, marginBottom: 24 }}>
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '20px' }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>Skills Map</h2>
                <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>Green = 70%+ · Amber = 50–69% · Red = below 50%</p>
                <SkillsMap sections={sectionPerf} />
              </div>
              <ExamReadiness attempts={completedAttempts} sectionPerf={sectionPerf} />
            </div>

            {/* Exam history */}
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #E2E8F0' }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33' }}>Exam History</h2>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC' }}>
                    {['Date', 'Score', 'Result', 'Time', 'Review'].map(h => (
                      <th key={h} style={{ padding: '10px 28px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {completedAttempts.map(attempt => {
                    const pct = Math.round((attempt.score || 0) / (attempt.total_questions || 100) * 100)
                    const passed = pct >= 70
                    return (
                      <tr key={attempt.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 28px', fontSize: 13, color: '#0B1F33' }}>{formatDate(attempt.started_at)}</td>
                        <td style={{ padding: '14px 28px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 80, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2 }}>
                              <div style={{ height: 4, borderRadius: 2, width: `${pct}%`, backgroundColor: passed ? '#16A34A' : '#DC2626' }} />
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1F33' }}>{pct}%</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 28px' }}>
                          <span style={{ fontSize: 12, fontWeight: 500, padding: '3px 10px', borderRadius: 20, backgroundColor: passed ? '#DCFCE7' : '#FEE2E2', color: passed ? '#166534' : '#991B1B' }}>
                            {passed ? 'Pass' : 'Fail'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 28px', fontSize: 13, color: '#94A3B8' }}>{elapsed(attempt.started_at, attempt.completed_at)}</td>
                        <td style={{ padding: '14px 28px' }}>
                          <Link href={`/results/${attempt.id}`} style={{ fontSize: 13, color: '#B08D57', fontWeight: 600, textDecoration: 'none' }}>Review →</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
