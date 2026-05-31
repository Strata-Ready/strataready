import { adminClient } from '@/lib/supabase/admin'
import pdf from 'pdf-parse'

export const maxDuration = 60

export async function POST(request: Request) {
  const formData = await request.formData()
  const key = formData.get('key') as string
  const file = formData.get('file') as File
  const docType = formData.get('docType') as string
  const lessonNumber = parseInt(formData.get('lessonNumber') as string)
  const actName = formData.get('actName') as string

  if (key !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!file) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  try {
    // Convert file to buffer and extract text
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await pdf(buffer)
    const extractedText = pdfData.text
    const pageCount = pdfData.numpages

    // Determine storage path
    const folder = docType === 'chapter' ? 'chapters' 
                 : docType === 'assignment' ? 'assignments' 
                 : 'data'
    const filePath = `${folder}/${file.name}`

    // Upload PDF to Supabase Storage
    const { error: storageError } = await adminClient.storage
      .from('knowledge-base')
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (storageError) {
      return Response.json({ error: `Storage error: ${storageError.message}` }, { status: 500 })
    }

    // Save metadata + extracted text to kb_documents
    const { error: dbError } = await adminClient
      .from('kb_documents')
      .upsert({
        file_name: file.name,
        file_path: filePath,
        doc_type: docType,
        lesson_number: docType !== 'data' ? lessonNumber : null,
        act_name: docType === 'data' ? actName : null,
        extracted_text: extractedText,
        page_count: pageCount,
        processed: true,
      }, { onConflict: 'file_path' })

    if (dbError) {
      return Response.json({ error: `Database error: ${dbError.message}` }, { status: 500 })
    }

    return Response.json({
      message: `${file.name} uploaded successfully. ${pageCount} pages extracted.`,
    })

  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    )
  }
}