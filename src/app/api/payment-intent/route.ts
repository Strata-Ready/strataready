import Stripe from 'stripe'
import { adminClient } from '@/lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

const PRICES: Record<string, number> = {
  per_exam: 999,    // $9.99 in cents
  unlimited: 4999,  // $49.99 in cents
}

export async function POST(request: Request) {
  try {
    const { plan, userId, email } = await request.json()
    if (!plan || !userId || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const amount = PRICES[plan]
    if (!amount) return Response.json({ error: 'Invalid plan' }, { status: 400 })

    // Get or create Stripe customer
    const { data: user } = await adminClient
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    let customerId = user?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        metadata: { supabase_id: userId },
      })
      customerId = customer.id
      await adminClient.from('users').update({ stripe_customer_id: customerId }).eq('id', userId)
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      customer: customerId,
      metadata: { userId, plan },
      automatic_payment_methods: { enabled: true },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error('Payment intent error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
