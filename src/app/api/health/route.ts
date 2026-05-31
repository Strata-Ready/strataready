import { adminClient } from '@/lib/supabase/admin'

export async function GET() {
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20))

  const { data, error } = await adminClient
    .from('sections')
    .select('number, title')
    .order('number')

  if (error) {
    return Response.json({ status: 'error', error: error.message }, { status: 500 })
  }

  return Response.json({
    status: 'ok',
    database: 'connected',
    sections: data.length,
    first: data[0].title,
    last: data[data.length - 1].title,
  })
}