'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createClient } from '@/lib/supabase/client'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const CARD_STYLE = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: '14px',
      color: '#0B1F33',
      fontFamily: 'inherit',
      '::placeholder': { color: '#94A3B8' },
    },
    invalid: { color: '#991B1B' },
  },
}

function SignupForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [plan, setPlan] = useState<'per_exam' | 'unlimited'>('per_exam')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  async function handleSubmit() {
    if (!stripe || !elements) return
    if (!name || !email || !password) { setError('Please fill in all fields.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!acceptedTerms) { setError('Please accept the Terms of Use to continue.'); return }

    setLoading(true)
    setError('')

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) { setError('Card element not found.'); setLoading(false); return }

    try {
      // Step 1: Get a payment intent client secret from server (no customer, no account yet)
      const intentRes = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create_intent', plan }),
      })
      const { clientSecret, error: intentError } = await intentRes.json()
      if (intentError) throw new Error(intentError)

      // Step 2: Confirm payment client-side — this is the charge
      // If card is declined, nothing has been created anywhere
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name, email },
        },
      })

      if (confirmError) throw new Error(confirmError.message)
      if (paymentIntent?.status !== 'succeeded') throw new Error('Payment failed. Please try again.')

      // Step 3: Payment succeeded — create Stripe customer + Supabase account
      const signupRes = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_account',
          name,
          email,
          password,
          plan,
          paymentIntentId: paymentIntent.id,
        }),
      })

      const signupData = await signupRes.json()
      if (signupData.error) throw new Error(signupData.error)

      // Step 4: Sign in and go to dashboard
      const supabase = createClient()
      await supabase.auth.signInWithPassword({ email, password })
      window.location.href = '/dashboard'

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
      cardElement.clear()
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 480 }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Create Account</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 8 }}>Start your exam prep</h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>Create your account and pay in one step.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          { key: 'per_exam' as const, name: 'Per Exam', price: '$9.99', desc: 'One exam attempt' },
          { key: 'unlimited' as const, name: 'Full Prep Access', price: '$49.99', desc: 'Unlimited attempts' },
        ].map(p => (
          <button key={p.key} onClick={() => setPlan(p.key)} style={{
            padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
            border: `2px solid ${plan === p.key ? '#0B1F33' : '#E2E8F0'}`,
            backgroundColor: plan === p.key ? 'rgba(11,31,51,0.04)' : 'white',
            transition: 'all 0.15s',
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 2 }}>{p.name}</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 2 }}>{p.price}</p>
            <p style={{ fontSize: 12, color: '#64748B' }}>{p.desc}</p>
            {p.key === 'unlimited' && <p style={{ fontSize: 11, color: '#B08D57', fontWeight: 600, marginTop: 4 }}>Best value</p>}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '28px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Your account</p>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Full name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith"
              style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com"
              style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33', display: 'block', marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 characters"
              style={{ width: '100%', border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: '#0B1F33', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Payment</p>
            <div style={{ border: '1.5px solid #E2E8F0', borderRadius: 8, padding: '12px 14px', backgroundColor: '#FAFAFA' }}>
              <CardElement options={CARD_STYLE} />
            </div>
            <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 6 }}>
              Processed securely by Stripe. StrataReady never sees your card details.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              style={{ marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
            />
            <label htmlFor="terms" style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, cursor: 'pointer' }}>
              I have read and agree to the{' '}
              <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#0B1F33', fontWeight: 600 }}>Terms of Use</a>
              {' '}and{' '}
              <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#0B1F33', fontWeight: 600 }}>Privacy Policy</a>
            </label>
          </div>

          {error && (
            <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px' }}>
              <p style={{ fontSize: 13, color: '#991B1B' }}>{error}</p>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading || !stripe}
            style={{ backgroundColor: loading ? '#94A3B8' : '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '13px', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Processing...' : `Create account & pay ${plan === 'per_exam' ? '$9.99' : '$49.99'}`}
          </button>



        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>
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
        <Elements stripe={stripePromise}>
          <SignupForm />
        </Elements>
      </div>
    </div>
  )
}
