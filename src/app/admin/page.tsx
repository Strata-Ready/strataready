'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'

type User = {
  id: string
  email: string
  full_name: string | null
  plan: string
  created_at: string
}

type UserStats = {
  exams: number
  avgScore: number
  bestScore: number
  passRate: number
  lastActive: string | null
}

type Platform = {
  totalUsers: number
  perExamUsers: number
  unlimitedUsers: number
  totalExams: number
  avgScore: number
  passRate: number
  estimatedRevenue: number
}

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AdminPage() {
  const [key, setKey] = useState('')
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [userStats, setUserStats] = useState<Record<string, UserStats>>({})
  const [platform, setPlatform] = useState<Platform | null>(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'created_at' | 'exams' | 'avgScore'>('created_at')

  async function handleLogin() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin', { headers: { 'x-admin-key': key } })
    const data = await res.json()
    if (data.error) { setError('Invalid admin key.'); setLoading(false); return }
    setUsers(data.users)
    setUserStats(data.userStats)
    setPlatform(data.platform)
    setAuthed(true)
    setLoading(false)
    sessionStorage.setItem('admin_key', key)
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key')
    if (saved) { setKey(saved); }
  }, [])

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0B1F33', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, justifyContent: 'center' }}>
            <Logo />
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600 }}>StrataReady Admin</span>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', padding: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Admin key"
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#F7F9FC', outline: 'none', boxSizing: 'border-box' }}
              />
              {error && <p style={{ fontSize: 13, color: '#FCA5A5' }}>{error}</p>}
              <button onClick={handleLogin} disabled={loading}
                style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 600, padding: 12, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
                {loading ? 'Loading...' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const filtered = users
    .filter(u => !search || u.email.toLowerCase().includes(search.toLowerCase()) || (u.full_name || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'created_at') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      if (sortBy === 'exams') return (userStats[b.id]?.exams || 0) - (userStats[a.id]?.exams || 0)
      if (sortBy === 'avgScore') return (userStats[b.id]?.avgScore || 0) - (userStats[a.id]?.avgScore || 0)
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <nav style={{ backgroundColor: '#0B1F33', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
          <span style={{ fontSize: 11, color: '#B08D57', backgroundColor: 'rgba(176,141,87,0.15)', padding: '2px 8px', borderRadius: 20, fontWeight: 600, letterSpacing: '0.05em' }}>ADMIN</span>
        </div>
        <button onClick={() => { setAuthed(false); sessionStorage.removeItem('admin_key') }}
          style={{ fontSize: 13, color: 'rgba(247,249,252,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign out
        </button>
      </nav>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>

        {/* Platform stats */}
        {platform && (
          <>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 24 }}>Platform Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 16 }}>
              {[
                { label: 'Total users', value: platform.totalUsers },
                { label: 'Total exams', value: platform.totalExams },
                { label: 'Avg score', value: `${platform.avgScore}%` },
                { label: 'Pass rate', value: `${platform.passRate}%` },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '20px 24px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px' }}>{s.value}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Per exam users', value: platform.perExamUsers, sub: `× $9.99 = $${(platform.perExamUsers * 9.99).toFixed(2)}` },
                { label: 'Full prep users', value: platform.unlimitedUsers, sub: `× $49.99 = $${(platform.unlimitedUsers * 49.99).toFixed(2)}` },
                { label: 'Estimated revenue', value: `$${platform.estimatedRevenue.toFixed(2)}`, sub: 'CAD (minimum — excl. repeat purchases)', highlight: true },
              ].map(s => (
                <div key={s.label} style={{ backgroundColor: s.highlight ? '#0B1F33' : 'white', borderRadius: 12, border: `1px solid ${s.highlight ? 'transparent' : '#E2E8F0'}`, padding: '20px 24px' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: s.highlight ? 'rgba(247,249,252,0.5)' : '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: s.highlight ? '#B08D57' : '#0B1F33', letterSpacing: '-0.5px', marginBottom: 4 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: s.highlight ? 'rgba(247,249,252,0.4)' : '#CBD5E1' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Users table */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B1F33' }}>Users ({filtered.length})</h2>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              style={{ border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#0B1F33', outline: 'none', width: 240 }}
            />
            <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              style={{ border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#0B1F33', outline: 'none', backgroundColor: 'white' }}>
              <option value="created_at">Sort: Newest</option>
              <option value="exams">Sort: Most exams</option>
              <option value="avgScore">Sort: Best score</option>
            </select>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                {['User', 'Plan', 'Joined', 'Exams', 'Avg score', 'Pass rate', 'Last active', ''].map(h => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => {
                const stats = userStats[user.id] || { exams: 0, avgScore: 0, bestScore: 0, passRate: 0, lastActive: null }
                return (
                  <tr key={user.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 2 }}>{user.full_name || '—'}</p>
                      <p style={{ fontSize: 12, color: '#94A3B8' }}>{user.email}</p>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, backgroundColor: user.plan === 'unlimited' ? '#DCFCE7' : '#F0F4F8', color: user.plan === 'unlimited' ? '#166534' : '#64748B' }}>
                        {user.plan === 'unlimited' ? 'Full prep' : 'Per exam'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B', whiteSpace: 'nowrap' }}>{formatDate(user.created_at)}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#0B1F33' }}>{stats.exams}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: stats.avgScore >= 70 ? '#166534' : stats.avgScore >= 50 ? '#92400E' : stats.exams === 0 ? '#94A3B8' : '#991B1B' }}>
                      {stats.exams > 0 ? `${stats.avgScore}%` : '—'}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#64748B' }}>
                      {stats.exams > 0 ? `${stats.passRate}%` : '—'}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#94A3B8', whiteSpace: 'nowrap' }}>{formatDate(stats.lastActive)}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <Link href={`/admin/user/${user.id}`} style={{ fontSize: 12, color: '#B08D57', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
