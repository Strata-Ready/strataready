import Stripe from 'stripe'
import { adminClient } from '@/lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

const AMOUNTS: Record<string, number> = {
  per_exam: 999,
  unlimited: 4999,
}

export async function POST(request: Request) {
  const body = await request.json()
  const { action } = body

  // Action 1: Create a payment intent — no customer, no account
  if (action === 'create_intent') {
    const { plan } = body
    const amount = AMOUNTS[plan]
    if (!amount) return Response.json({ error: 'Invalid plan' }, { status: 400 })

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'cad',
        automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      })
      return Response.json({ clientSecret: paymentIntent.client_secret })
    } catch (err: any) {
      return Response.json({ error: err.message }, { status: 500 })
    }
  }

  // Action 2: Payment confirmed — now create everything
  if (action === 'create_account') {
    const { name, email, password, plan, paymentIntentId } = body

    if (!name || !email || !password || !plan || !paymentIntentId) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
      // Verify payment actually succeeded
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      if (paymentIntent.status !== 'succeeded') {
        return Response.json({ error: 'Payment not confirmed. Please try again.' }, { status: 402 })
      }

      // Create Stripe customer
      const customer = await stripe.customers.create({
        email,
        name,
        metadata: { plan },
      })

      // Attach payment intent to customer
      await stripe.paymentIntents.update(paymentIntentId, { customer: customer.id })

      // Create Supabase account
      const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: name },
      })

      if (authError || !authData.user) {
        console.error(`ACCOUNT CREATION FAILED after payment. Email: ${email}, PaymentIntent: ${paymentIntentId}`)
        return Response.json({ error: 'Payment processed but account creation failed. Please contact support.' }, { status: 500 })
      }

      // Create users table record
      await adminClient.from('users').insert({
        id: authData.user.id,
        email: email.toLowerCase(),
        full_name: name,
        plan,
        stripe_customer_id: customer.id,
      })

      return Response.json({ ok: true })

    } catch (err: any) {
      console.error('Account creation error:', err.message)
      return Response.json({ error: err.message }, { status: 500 })
    }
  }

  return Response.json({ error: 'Invalid action' }, { status: 400 })
}
