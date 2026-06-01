import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CHAPTER_TO_LESSON: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 3, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7, 10: 7,
  11: 8, 12: 9, 13: 10, 14: 11, 15: 12, 16: 12, 17: 13, 18: 14,
  19: 15, 20: 16, 21: 16, 22: 17, 23: 18, 24: 19, 25: 20, 26: 21, 27: 21
}

function detectFileInfo(fileName: string) {
  const name = fileName.toLowerCase()

  if (name.startsWith('chapter')) {
    const match = name.match(/chapter(\d+)/)
    if (match) {
      const chapterNum = parseInt(match[1])
      return {
        docType: 'chapter' as const,
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
        docType: 'assignment' as const,
        lessonNumber: parseInt(match[1]),
        chapterNumber: null,
        actName: null,
      }
    }
  }

  return {
    docType: 'data' as const,
    lessonNumber: null,
    chapterNumber: null,
    actName: fileName.replace('.pdf', '').replace(/_/g, ' '),
  }
}

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<{ text: string; pages: number }> {
  // Use pdf.js for text extraction in Deno
  const uint8 = new Uint8Array(buffer)
  
  // Simple text extraction: scan for text between BT and ET markers
  // This works reliably for clean text-layer PDFs
  const decoder = new TextDecoder('latin1')
  const raw = decoder.decode(uint8)
  
  const textBlocks: string[] = []
  const btEtRegex = /BT([\s\S]*?)ET/g
  const tjRegex = /\(((?:[^()\\]|\\.)*)\)\s*T[jJ]/g
  const arrayTjRegex = /\[((?:[^\[\]]*(?:\([^)]*\))?)*)\]\s*TJ/g
  
  let btMatch
  while ((btMatch = btEtRegex.exec(raw)) !== null) {
    const block = btMatch[1]
    
    let tjMatch
    while ((tjMatch = tjRegex.exec(block)) !== null) {
      const text = tjMatch[1]
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\\(/g, '(')
        .replace(/\\\)/g, ')')
        .replace(/\\\\/g, '\\')
      if (text.trim()) textBlocks.push(text)
    }
    
    let arrayMatch
    while ((arrayMatch = arrayTjRegex.exec(block)) !== null) {
      const inner = arrayMatch[1]
      const pieces: string[] = []
      const pieceRegex = /\(((?:[^()\\]|\\.)*)\)/g
      let pieceMatch
      while ((pieceMatch = pieceRegex.exec(inner)) !== null) {
        pieces.push(pieceMatch[1])
      }
      if (pieces.length) textBlocks.push(pieces.join(''))
    }
  }

  // Count pages
  const pageCount = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length || 1

  return {
    text: textBlocks.join(' ').replace(/\s+/g, ' ').trim(),
    pages: pageCount,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { filePath } = await req.json()
    if (!filePath) {
      return Response.json({ error: 'filePath required' }, { status: 400 })
    }

    // Download file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('knowledge-base')
      .download(filePath)

    if (downloadError || !fileData) {
      return Response.json({ error: `Download failed: ${downloadError?.message}` }, { status: 500 })
    }

    const buffer = await fileData.arrayBuffer()
    const { text: extractedText, pages: pageCount } = await extractTextFromPDF(buffer)

    const fileName = filePath.split('/').pop() || filePath
    const { docType, lessonNumber, chapterNumber, actName } = detectFileInfo(fileName)

    const { error: dbError } = await supabase
      .from('kb_documents')
      .upsert({
        file_name: fileName,
        file_path: filePath,
        doc_type: docType,
        lesson_number: lessonNumber,
        chapter_number: chapterNumber,
        act_name: actName,
        extracted_text: extractedText,
        page_count: pageCount,
        processed: true,
      }, { onConflict: 'file_path' })

    if (dbError) {
      return Response.json({ error: `DB error: ${dbError.message}` }, { status: 500 })
    }

    return Response.json({
      ok: true,
      file: fileName,
      pages: pageCount,
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
})