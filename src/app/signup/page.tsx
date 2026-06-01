'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [plan, setPlan] = useState<'per_exam' | 'unlimited'>('per_exam')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup() {
    if (!email || !password || !name) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      })

      if (signupError) throw signupError
      if (!data.user) throw new Error('Signup failed')

      // Create Stripe checkout session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, userId: data.user.id, email }),
      })

      const { url, error: checkoutError } = await res.json()
      if (checkoutError) throw new Error(checkoutError)

      window.location.href = url
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>

      {/* Nav */}
      <nav style={{ backgroundColor: '#0B1F33', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </Link>
        <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none' }}>
          Already have an account? Sign in
        </Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>

          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Create Account</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 8 }}>Start your exam prep</h1>
            <p style={{ fontSize: 14, color: '#64748B' }}>Choose a plan and enter your details to get started.</p>
          </div>

          {/* Plan selector */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {[
              { key: 'per_exam' as const, name: 'Per Exam', price: '$9.99', desc: 'One exam attempt' },
              { key: 'unlimited' as const, name: 'Full Prep Access', price: '$49.99', desc: 'Unlimited attempts' },
            ].map(p => (
              <button
                key={p.key}
                onClick={() => setPlan(p.key)}
                style={{
                  padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: `2px solid ${plan === p.key ? '#0B1F33' : '#E2E8F0'}`,
                  backgroundColor: plan === p.key ? 'rgba(11,31,51,0.04)' : 'white',
                  transition: 'all 0.15s',
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 2 }}>{p.name}</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 2 }}>{p.price}</p>
                <p style={{ fontSize: 12, color: '#64748B' }}>{p.desc}</p>
                {p.key === 'unlimited' && (
                  <p style={{ fontSize: 11, color: '#B08D57', fontWeight: 600, marginTop: 4 }}>Best value</p>
                )}
              </button>
            ))}
          </div>

          {/* Form */}
          <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith"
                  style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  placeholder="Minimum 8 characters"
                  style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {error && (
                <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px' }}>
                  <p style={{ fontSize: 13, color: '#991B1B' }}>{error}</p>
                </div>
              )}

              <button
                onClick={handleSignup}
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#94A3B8' : '#0B1F33',
                  color: '#F7F9FC', fontSize: 14, fontWeight: 600,
                  padding: '12px', borderRadius: 8, border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {loading ? 'Creating account...' : `Continue to payment — ${plan === 'per_exam' ? '$9.99' : '$49.99'}`}
              </button>

              <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6 }}>
                By creating an account you agree to our{' '}
                <Link href="/terms" style={{ color: '#64748B' }}>Terms</Link> and{' '}
                <Link href="/privacy" style={{ color: '#64748B' }}>Privacy Policy</Link>.
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}