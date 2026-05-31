import { adminClient } from '@/lib/supabase/admin'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

const CHAPTER_TO_LESSON: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 3, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 7,
  11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 12, 17: 13, 18: 14,
  19: 15, 20: 16, 21: 16, 22: 17, 23: 18, 24: 19, 25: 20, 26: 21, 27: 21
}

function detectFileInfo(fileName: string): {
  docType: 'chapter' | 'assignment' | 'data'
  lessonNumber: number | null
  chapterNumber: number | null
  actName: string | null
} {
  const name = fileName.toLowerCase()

  if (name.startsWith('chapter')) {
    const match = name.match(/chapter(\d+)/)
    if (match) {
      const chapterNum = parseInt(match[1])
      return {
        docType: 'chapter',
        lessonNumber: CHAPTER_TO_LESSON[chapterNum] || null,
        chapterNumber: chapterNum,
        actName: null,
      }
    }
  }

  if (name.startsWith('view assignment') || name.startsWith('assignment')) {
    const match = name.match(/(\d+)/)
    if (match) {
      return {
        docType: 'assignment',
        lessonNumber: parseInt(match[1]),
        chapterNumber: null,
        actName: null,
      }
    }
  }

  return {
    docType: 'data',
    lessonNumber: null,
    chapterNumber: null,
    actName: fileName.replace('.pdf', '').replace(/_/g, ' '),
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (key !== process.env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { filePath } = await request.json()

  if (!filePath) {
    return Response.json({ error: 'filePath required' }, { status: 400 })
  }

  try {
    // Download PDF from Supabase Storage
    const { data: fileData, error: downloadError } = await adminClient.storage
      .from('knowledge-base')
      .download(filePath)

    if (downloadError || !fileData) {
      return Response.json({ error: `Download failed: ${downloadError?.message}` }, { status: 500 })
    }

    // Convert to base64 for Claude
    const arrayBuffer = await fileData.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // Use Claude to extract text from PDF
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64,
              },
            },
            {
              type: 'text',
              text: 'Extract all text from this document exactly as written. Preserve headings, section numbers, page numbers, and all content. Output only the extracted text with no commentary.',
            },
          ],
        },
      ],
    })

    const extractedText = response.content
      .filter(b => b.type === 'text')
      .map(b => (b as any).text)
      .join('\n')

    // Detect metadata from filename
    const fileName = filePath.split('/').pop() || filePath
    const { docType, lessonNumber, chapterNumber, actName } = detectFileInfo(fileName)

    // Save to kb_documents
    const { error: dbError } = await adminClient
      .from('kb_documents')
      .upsert({
        file_name: fileName,
        file_path: filePath,
        doc_type: docType,
        lesson_number: lessonNumber,
        chapter_number: chapterNumber,
        act_name: actName,
        extracted_text: extractedText,
        page_count: null,
        processed: true,
      }, { onConflict: 'file_path' })

    if (dbError) {
      return Response.json({ error: `DB error: ${dbError.message}` }, { status: 500 })
    }

    return Response.json({
      ok: true,
      file: fileName,
      docType,
      lessonNumber,
      chars: extractedText.length,
    })

  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Processing failed' },
      { status: 500 }
    )
  }
}