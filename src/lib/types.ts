export type Section = {
  id: number
  number: number
  title: string
  description: string | null
}

export type Question = {
  id: string
  section_id: number
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  textbook_chapter: number | null
  textbook_pages: string | null
  act_reference: string | null
  regulation_ref: string | null
  difficulty: 1 | 2 | 3
  sections?: Section
}

export type ExamQuestion = Question & {
  userAnswer?: 'A' | 'B' | 'C' | 'D' | null
  flagged?: boolean
}

export type ExamResult = {
  questions: ExamQuestion[]
  score: number
  total: number
  passed: boolean
  sectionResults: SectionResult[]
}

export type SectionResult = {
  section_id: number
  title: string
  correct: number
  total: number
  pct: number
  wrongQuestions: ExamQuestion[]
}