import { adminClient } from './supabase/admin'
import { Question } from './types'

export async function assembleExam(): Promise<Question[]> {
  // Fetch all active questions with their section info
  const { data, error } = await adminClient
    .from('questions')
    .select(`
      *,
      sections (
        id,
        number,
        title
      )
    `)
    .eq('is_active', true)

  if (error) throw new Error(`Failed to fetch questions: ${error.message}`)
  if (!data || data.length === 0) throw new Error('No questions found in database')

  // Group by section
  const bySection: Record<number, Question[]> = {}
  for (const q of data) {
    const sid = q.section_id
    if (!bySection[sid]) bySection[sid] = []
    bySection[sid].push(q)
  }

  // Pick 5 random questions per section
  const exam: Question[] = []
  for (const sid of Object.keys(bySection)) {
    const pool = bySection[Number(sid)]
    const shuffled = pool.sort(() => Math.random() - 0.5)
    exam.push(...shuffled.slice(0, 5))
  }

  // Shuffle the final exam
  return exam.sort(() => Math.random() - 0.5)
}