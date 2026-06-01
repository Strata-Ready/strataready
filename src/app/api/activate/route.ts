import { adminClient } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const { userId, plan } = await request.json()
    if (!userId || !plan) return Response.json({ error: 'Missing fields' }, { status: 400 })

    await adminClient.from('users').update({ plan }).eq('id', userId)

    return Response.json({ ok: true })
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
