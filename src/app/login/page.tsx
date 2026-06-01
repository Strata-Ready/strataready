'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      if (loginError) throw loginError
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ backgroundColor: '#0B1F33', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </Link>
        <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none' }}>
          New here? Create account
        </Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Welcome back</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px' }}>Sign in to StrataReady</h1>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="jane@example.com"
                  style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="Your password"
                  style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {error && (
                <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ fontSize: 13, color: '#991B1B' }}>{error}</p>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#94A3B8' : '#0B1F33',
                  color: '#F7F9FC', fontSize: 14, fontWeight: 600,
                  padding: '12px', borderRadius: 8, border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}