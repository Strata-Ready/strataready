import Stripe from 'stripe'
import { adminClient } from '@/lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

const AMOUNTS: Record<string, number> = {
  per_exam: 999,
  unlimited: 4999,
}

export async function POST(request: Request) {
  const { name, email, password, plan, paymentMethodId } = await request.json()

  if (!name || !email || !password || !plan || !paymentMethodId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const amount = AMOUNTS[plan]
  if (!amount) return Response.json({ error: 'Invalid plan' }, { status: 400 })

  try {
    // Step 1: Attempt payment — no customer, no account yet
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
    })

    // If payment didn't succeed, stop here — nothing created
    if (paymentIntent.status !== 'succeeded') {
      return Response.json({ error: 'Payment failed. Please check your card details and try again.' }, { status: 402 })
    }

    // Step 2: Payment succeeded — now create Stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
      payment_method: paymentMethodId,
      metadata: { plan },
    })

    // Attach payment intent to customer
    await stripe.paymentIntents.update(paymentIntent.id, { customer: customer.id })

    // Step 3: Create Supabase account
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name },
    })

    if (authError || !authData.user) {
      // Payment went through but account creation failed — this is rare
      // Log it so we can manually fix
      console.error(`ACCOUNT CREATION FAILED after payment. Email: ${email}, PaymentIntent: ${paymentIntent.id}`)
      return Response.json({ error: 'Payment processed but account creation failed. Please contact support.' }, { status: 500 })
    }

    // Step 4: Create users table record
    const { error: dbError } = await adminClient.from('users').insert({
      id: authData.user.id,
      email: email.toLowerCase(),
      full_name: name,
      plan,
      stripe_customer_id: customer.id,
    })

    if (dbError) {
      console.error(`DB INSERT FAILED. UserId: ${authData.user.id}, Email: ${email}`)
    }

    return Response.json({ ok: true })

  } catch (err: any) {
    // Payment failed at Stripe level — nothing was created
    console.error('Signup error:', err.message)
    return Response.json({ error: err.raw?.message || err.message || 'Payment failed. Please try again.' }, { status: 500 })
  }
}
