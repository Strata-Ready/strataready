import { adminClient } from '@/lib/supabase/admin'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: docs, error } = await adminClient
    .from('kb_documents')
    .select('id, file_name, file_path, doc_type, lesson_number, act_name, page_count, processed, created_at')    .order('doc_type', { ascending: true })
  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // List all files in bucket folders
  const folders = ['chapters', 'assignments', 'data']
  const allBucketFiles: string[] = []

  for (const folder of folders) {
    const { data: files } = await adminClient.storage
      .from('knowledge-base')
      .list(folder)

    if (files) {
      allBucketFiles.push(...files
        .filter(f => f.name !== '.emptyFolderPlaceholder')
        .map(f => `${folder}/${f.name}`)
      )
    }
  }

  const processedPaths = new Set((docs || []).map(d => d.file_path))
  const unprocessed = allBucketFiles.filter(f => !processedPaths.has(f))

  return Response.json({
    documents: docs || [],
    unprocessed,
    bucketTotal: allBucketFiles.length,
  })
}