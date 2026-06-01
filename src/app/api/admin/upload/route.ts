import { adminClient } from '@/lib/supabase/admin'

export const maxDuration = 60

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

  return Response.json({
    error: 'Direct upload via API is disabled. Use the local sync script instead.',
  }, { status: 400 })
}