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

type SectionPerf = {
  id: number
  title: string
  correct: number
  total: number
  pct: number
}

const SECTION_LEGISLATION: Record<number, { label: string; url: string }[]> = {
  1:  [{ label: 'Real Estate Services Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04042_01' }, { label: 'BCFSA Licensing', url: 'https://www.bcfsa.ca/industry-resources/real-estate-professional-resources/licensing' }],
  2:  [{ label: 'RESA — Professional Conduct', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04042_01' }, { label: 'BCFSA Rules & Guidelines', url: 'https://www.bcfsa.ca/industry-resources/real-estate-professional-resources/rules-and-guidelines' }],
  3:  [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Land Title Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96250_00' }],
  4:  [{ label: 'Real Estate Services Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04042_01' }, { label: 'Real Estate Services Rules', url: 'https://www.bcfsa.ca/industry-resources/real-estate-professional-resources/rules-and-guidelines' }],
  5:  [{ label: 'Residential Tenancy Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/02078_01' }, { label: 'RTB Policy Guidelines', url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies/solving-problems/dispute-resolution/legislation-policy' }],
  6:  [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  7:  [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Real Estate Services Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04042_01' }],
  8:  [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  9:  [{ label: 'Strata Property Act — Special Levies', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  10: [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Strata Property Regulation', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/43_2000' }],
  11: [{ label: 'Strata Property Act — Sections', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  12: [{ label: 'Strata Property Act — Meetings', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'BC Strata Meetings Guide', url: 'https://www2.gov.bc.ca/gov/content/housing-tenancy/strata-housing/operating-a-strata/strata-meetings' }],
  13: [{ label: 'Personal Information Protection Act (PIPA)', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/03063_01' }, { label: 'OIPC Privacy Guidelines', url: 'https://www.oipc.bc.ca/guidance-documents/1891' }],
  14: [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  15: [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  16: [{ label: 'Strata Property Act — Bylaws', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Standard Bylaws', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  17: [{ label: 'Strata Property Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }],
  18: [{ label: 'Strata Property Act — Finance', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Strata Property Regulation', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/43_2000' }],
  19: [{ label: 'Strata Property Act s.99', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Strata Property Regulation', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/43_2000' }],
  20: [{ label: 'Strata Property Act — CRF', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/98043_01' }, { label: 'Strata Property Regulation', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/43_2000' }],
  21: [{ label: 'Real Estate Services Act', url: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04042_01' }, { label: 'CHOA Resources', url: 'https://choa.bc.ca/resources/strata-property-act/' }],
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

function SkillsMap({ sections }: { sections: SectionPerf[] }) {
  if (sections.length === 0) return null

  const size = 680
  const cx = size / 2
  const cy = size / 2
  const outerR = 240
  const innerR = 72
  const n = sections.length
  const gap = 0.02

  const segments = sections.map((s, i) => {
    const startAngle = (i / n) * 2 * Math.PI - Math.PI / 2 + gap / 2
    const endAngle = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2 - gap / 2
    const midAngle = (startAngle + endAngle) / 2
    const fillR = innerR + (outerR - innerR) * (s.pct / 100)
    const labelR = outerR + 38

    const color = s.pct >= 70 ? '#16A34A' : s.pct >= 50 ? '#D97706' : '#DC2626'
    const bgColor = s.pct >= 70 ? '#DCFCE7' : s.pct >= 50 ? '#FEF3C7' : '#FEE2E2'
    const large = endAngle - startAngle > Math.PI ? 1 : 0

    const bgX1 = cx + outerR * Math.cos(startAngle)
    const bgY1 = cy + outerR * Math.sin(startAngle)
    const bgX2 = cx + outerR * Math.cos(endAngle)
    const bgY2 = cy + outerR * Math.sin(endAngle)
    const bgI1 = cx + innerR * Math.cos(startAngle)
    const bgI2 = cy + innerR * Math.sin(startAngle)
    const bgI3 = cx + innerR * Math.cos(endAngle)
    const bgI4 = cy + innerR * Math.sin(endAngle)

    const bgPath = `M ${bgI1} ${bgI2} L ${bgX1} ${bgY1} A ${outerR} ${outerR} 0 ${large} 1 ${bgX2} ${bgY2} L ${bgI3} ${bgI4} A ${innerR} ${innerR} 0 ${large} 0 ${bgI1} ${bgI2} Z`

    const fX1 = cx + fillR * Math.cos(startAngle)
    const fY1 = cy + fillR * Math.sin(startAngle)
    const fX2 = cx + fillR * Math.cos(endAngle)
    const fY2 = cy + fillR * Math.sin(endAngle)
    const fillPath = `M ${bgI1} ${bgI2} L ${fX1} ${fY1} A ${fillR} ${fillR} 0 ${large} 1 ${fX2} ${fY2} L ${bgI3} ${bgI4} A ${innerR} ${innerR} 0 ${large} 0 ${bgI1} ${bgI2} Z`

    const lx = cx + labelR * Math.cos(midAngle)
    const ly = cy + labelR * Math.sin(midAngle)
    const words = s.title.split(' ')
    const shortTitle = words.length > 3 ? words.slice(0, 2).join(' ') + '…' : s.title

    return { s, bgPath, fillPath, color, bgColor, lx, ly, midAngle, shortTitle }
  })

  const avgPct = Math.round(sections.reduce((sum, s) => sum + s.pct, 0) / sections.length)

  return (
    <div style={{ width: '100%' }}>
      <svg width="100%" viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        {segments.map(({ s, bgPath, fillPath, color, bgColor }) => (
          <g key={s.id}>
            <path d={bgPath} fill={bgColor} opacity="0.4" />
            <path d={fillPath} fill={color} opacity="0.85" />
          </g>
        ))}
        <circle cx={cx} cy={cy} r={innerR - 2} fill="white" />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize="13" fill="#94A3B8" fontWeight="500">avg</text>
        <text x={cx} y={cy + 18} textAnchor="middle" fontSize="26" fill="#0B1F33" fontWeight="800">{avgPct}%</text>
        {segments.map(({ s, lx, ly, midAngle, shortTitle, color }) => {
          const anchor = Math.cos(midAngle) > 0.1 ? 'start' : Math.cos(midAngle) < -0.1 ? 'end' : 'middle'
          return (
            <g key={`label-${s.id}`}>
              <text x={lx} y={ly - 5} textAnchor={anchor} fontSize="11" fill="#0B1F33" fontWeight="600">{shortTitle}</text>
              <text x={lx} y={ly + 10} textAnchor={anchor} fontSize="11" fill={color} fontWeight="700">{s.pct}%</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [sectionPerf, setSectionPerf] = useState<SectionPerf[]>([])
  const [loading, setLoading] = useState(true)
  const [showPayModal, setShowPayModal] = useState(false)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/login'); return }

      const [profileRes, attemptsRes, perfRes] = await Promise.all([
        supabase.from('users').select('id, email, full_name, plan').eq('id', authUser.id).single(),
        supabase.from('exam_attempts').select('*').eq('user_id', authUser.id).order('started_at', { ascending: false }),
        fetch('/api/section-perf').then(r => r.json()),
      ])

      setProfile(profileRes.data)
      setAttempts(attemptsRes.data || [])
      setSectionPerf(perfRes.sectionPerf || [])
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
  const weakSections = sectionPerf.filter(s => s.pct < 70).sort((a, b) => a.pct - b.pct).slice(0, 6)
  const strongSections = sectionPerf.filter(s => s.pct >= 70).sort((a, b) => b.pct - a.pct).slice(0, 3)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#94A3B8', fontSize: 14 }}>Loading...</p>
      </div>
    )
  }

  const firstName = profile?.full_name?.split(' ')[0] || ''

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>

      <nav style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 13, color: 'rgba(247,249,252,0.5)' }}>{profile?.email}</span>
          <span style={{ fontSize: 11, color: '#B08D57', backgroundColor: 'rgba(176,141,87,0.15)', padding: '3px 10px', borderRadius: 20, fontWeight: 600, letterSpacing: '0.04em' }}>
            {profile?.plan === 'unlimited' ? 'Full Prep Access' : 'Per Exam'}
          </span>
          <button onClick={handleSignOut} style={{ fontSize: 13, color: 'rgba(247,249,252,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>Sign out</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.6px', marginBottom: 4 }}>
              {firstName ? `Welcome back, ${firstName}` : 'Your Dashboard'}
            </h1>
            <p style={{ fontSize: 13, color: '#94A3B8' }}>
              {completedAttempts.length} exam{completedAttempts.length !== 1 ? 's' : ''} completed
              {avgScore !== null && ` · ${avgScore}% average`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {inProgressAttempt && (
              <Link href="/exam" style={{ backgroundColor: '#FEF3C7', color: '#92400E', fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 8, textDecoration: 'none', border: '1px solid #FDE68A' }}>
                ↩ Resume exam
              </Link>
            )}
            <button onClick={handleStartExam} style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 13, fontWeight: 600, padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              {completedAttempts.length === 0 ? 'Start first exam →' : 'New exam →'}
            </button>
          </div>
        </div>

        {completedAttempts.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '80px 48px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, backgroundColor: '#F0F4F8', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>📋</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B1F33', marginBottom: 8 }}>No exams taken yet</h2>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 28, lineHeight: 1.7 }}>
              Your readiness score, skills map, and score history will appear here after your first exam.
            </p>
            <button onClick={handleStartExam} style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Start your first exam →
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Average score', value: avgScore !== null ? `${avgScore}%` : '—', sub: 'across all attempts' },
                { label: 'Best score', value: bestScore !== null ? `${bestScore}%` : '—', sub: 'single exam' },
                { label: 'Exams taken', value: completedAttempts.length, sub: 'completed attempts' },
                { label: 'Pass rate', value: completedAttempts.length > 0 ? `${Math.round(completedAttempts.filter(a => a.passed).length / completedAttempts.length * 100)}%` : '—', sub: 'of attempts passed' },
              ].map(stat => (
                <div key={stat.label} style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{stat.label}</p>
                  <p style={{ fontSize: 30, fontWeight: 800, color: '#0B1F33', letterSpacing: '-1px', marginBottom: 4 }}>{stat.value}</p>
                  <p style={{ fontSize: 12, color: '#CBD5E1' }}>{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Skills map */}
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '28px', marginBottom: 24 }}>
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33', marginBottom: 4 }}>Skills Map</h2>
                <p style={{ fontSize: 13, color: '#94A3B8' }}>Performance across all exam sections. Green = 70%+ · Amber = 50–69% · Red = below 50%</p>
              </div>
              <SkillsMap sections={sectionPerf} />
            </div>

            {/* Focus areas */}
            {weakSections.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '28px', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, backgroundColor: '#DC2626', borderRadius: '50%' }} />
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33' }}>Focus areas</h2>
                  <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 'auto' }}>Sections below 70% — review before your next exam</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
                  {weakSections.map(s => (
                    <div key={s.id} style={{ borderLeft: `3px solid ${s.pct < 50 ? '#DC2626' : '#D97706'}`, paddingLeft: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, color: '#0B1F33', fontWeight: 600 }}>{s.title}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: s.pct < 50 ? '#DC2626' : '#D97706' }}>{s.pct}%</span>
                      </div>
                      <div style={{ height: 4, backgroundColor: '#F1F5F9', borderRadius: 2, marginBottom: 8 }}>
                        <div style={{ height: 4, borderRadius: 2, width: `${s.pct}%`, backgroundColor: s.pct < 50 ? '#DC2626' : '#D97706' }} />
                      </div>
                      <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 8 }}>{s.correct}/{s.total} correct</p>
                      {SECTION_LEGISLATION[s.id] && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {SECTION_LEGISLATION[s.id].map(leg => (
                            <a key={leg.url} href={leg.url} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 11, color: '#0B1F33', backgroundColor: '#F8FAFC', padding: '3px 8px', borderRadius: 4, textDecoration: 'none', fontWeight: 500, border: '1px solid #E2E8F0' }}>
                              {leg.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strong sections */}
            {strongSections.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '28px', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, backgroundColor: '#16A34A', borderRadius: '50%' }} />
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33' }}>Strong areas</h2>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {strongSections.map(s => (
                    <div key={s.id} style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, color: '#166534', fontWeight: 500 }}>{s.title}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exam history */}
            <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
              <div style={{ padding: '20px 28px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0B1F33' }}>Exam History</h2>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 28 }}>
                  {completedAttempts.slice().reverse().map(a => {
                    const pct = Math.round((a.score || 0) / (a.total_questions || 105) * 100)
                    return (
                      <div key={a.id} style={{ width: 10, borderRadius: 2, height: `${Math.max(pct / 100 * 28, 3)}px`, backgroundColor: pct >= 70 ? '#16A34A' : pct >= 50 ? '#D97706' : '#DC2626', opacity: 0.7 }} />
                    )
                  })}
                </div>
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
                    const pct = Math.round((attempt.score || 0) / (attempt.total_questions || 105) * 100)
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

            {profile?.plan === 'per_exam' && (
              <div style={{ marginTop: 16, backgroundColor: '#0B1F33', borderRadius: 12, padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#F7F9FC', marginBottom: 2 }}>Upgrade to Full Prep Access</p>
                  <p style={{ fontSize: 13, color: 'rgba(247,249,252,0.5)' }}>Unlimited exams for $49.99 — one-time payment.</p>
                </div>
                <button onClick={() => handlePayForExam(true)} style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Upgrade — $49.99
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showPayModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div style={{ backgroundColor: 'white', borderRadius: 20, padding: '36px', maxWidth: 420, width: '100%' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 8 }}>Ready for another exam?</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, marginBottom: 28 }}>
              You&apos;ve used your exam attempt. Purchase another or upgrade to Full Prep Access for unlimited exams.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => handlePayForExam(true)} disabled={paying}
                style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '13px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
                Full Prep Access — $49.99
              </button>
              <button onClick={() => handlePayForExam(false)} disabled={paying}
                style={{ backgroundColor: 'white', color: '#0B1F33', fontSize: 14, fontWeight: 500, padding: '13px', borderRadius: 10, border: '1.5px solid #E2E8F0', cursor: 'pointer' }}>
                Pay $9.99 for one more exam
              </button>
              <button onClick={() => setShowPayModal(false)}
                style={{ backgroundColor: 'transparent', color: '#94A3B8', fontSize: 13, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
