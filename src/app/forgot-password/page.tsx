'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!email) { setError('Please enter your email address.'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (resetError) throw resetError
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ backgroundColor: '#0B1F33', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </Link>
        <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none' }}>
          Back to sign in
        </Link>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Account recovery</p>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px' }}>Reset your password</h1>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '28px' }}>
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, backgroundColor: '#edfaf9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>✓</div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 8 }}>Check your inbox</h2>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
                  We sent a password reset link to <strong>{email}</strong>. It expires in 1 hour.
                </p>
                <Link href="/login" style={{ fontSize: 13, color: '#0B1F33', fontWeight: 600, textDecoration: 'none' }}>← Back to sign in</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    placeholder="jane@example.com"
                    style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>

                {error && (
                  <div style={{ backgroundColor: '#fce8e9', border: '1px solid #f2b0b3', borderRadius: 8, padding: '10px 14px' }}>
                    <p style={{ fontSize: 13, color: '#8f1e22' }}>{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ backgroundColor: loading ? '#94A3B8' : '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>

                <p style={{ fontSize: 13, color: '#64748B', textAlign: 'center' }}>
                  <Link href="/login" style={{ color: '#0B1F33', fontWeight: 600 }}>← Back to sign in</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
