export async function POST(request: Request) {
  const { key } = await request.json()
  
  if (key !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return Response.json({ ok: true })
}