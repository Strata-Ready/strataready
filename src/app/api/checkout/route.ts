import Stripe from 'stripe'
import { adminClient } from '@/lib/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-05-27.dahlia' })

export async function POST(request: Request) {
  try {
    const { plan, userId, email } = await request.json()

    if (!plan || !userId || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = plan === 'unlimited'
      ? process.env.STRIPE_PRICE_FULL_PREP!
      : process.env.STRIPE_PRICE_PER_EXAM!

    // Create or retrieve Stripe customer
    const { data: user } = await adminClient
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    let customerId = user?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({ email, metadata: { supabase_id: userId } })
      customerId = customer.id
      await adminClient.from('users').update({ stripe_customer_id: customerId }).eq('id', userId)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/signup`,
      metadata: { userId, plan },
    })

    return Response.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
