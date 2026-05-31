import { assembleExam } from '@/lib/exam'

export async function GET() {
  try {
    const questions = await assembleExam()
    return Response.json({ questions })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Failed to assemble exam' },
      { status: 500 }
    )
  }
}