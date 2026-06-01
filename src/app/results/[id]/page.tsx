'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type Answer = {
  id: string
  question_id: string
  selected_answer: string | null
  is_correct: boolean
  questions: {
    section_id: number
    question_text: string
    option_a: string
    option_b: string
    option_c: string
    option_d: string
    correct_answer: string
    explanation: string
    act_reference: string | null
    regulation_ref: string | null
  }
}

type Attempt = {
  id: string
  started_at: string
  completed_at: string | null
  score: number
  total_questions: number
  passed: boolean
}

type Section = {
  id: number
  number: number
  title: string
}

function elapsed(start: string, end: string | null) {
  if (!end) return '—'
  const ms = new Date(end).getTime() - new Date(start).getTime()
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${mins}m ${secs}s`
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [attempt, setAttempt] = useState<Attempt | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const [attemptRes, answersRes, sectionsRes] = await Promise.all([
        supabase.from('exam_attempts').select('*').eq('id', params.id).eq('user_id', user.id).single(),
        supabase.from('attempt_answers').select('*, questions(section_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, act_reference, regulation_ref)').eq('attempt_id', params.id),
        supabase.from('sections').select('id, number, title').order('number'),
      ])

      setAttempt(attemptRes.data)
      setAnswers(answersRes.data || [])
      setSections(sectionsRes.data || [])
      setLoading(false)
    }
    load()
  }, [params.id, router])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: 14 }}>Loading results...</p>
      </div>
    )
  }

  if (!attempt) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#991B1B', fontSize: 14 }}>Results not found.</p>
      </div>
    )
  }

  const pct = Math.round((attempt.score / attempt.total_questions) * 100)
  const passed = pct >= 70

  // Section breakdown
  const sectionMap: Record<number, { title: string; correct: number; total: number }> = {}
  for (const s of sections) {
    sectionMap[s.id] = { title: s.title, correct: 0, total: 0 }
  }
  for (const a of answers) {
    const sid = a.questions?.section_id
    if (sid && sectionMap[sid]) {
      sectionMap[sid].total++
      if (a.is_correct) sectionMap[sid].correct++
    }
  }

  const sectionBreakdown = Object.entries(sectionMap)
    .filter(([, v]) => v.total > 0)
    .map(([id, v]) => ({ ...v, sectionId: parseInt(id), pct: Math.round((v.correct / v.total) * 100) }))
    .sort((a, b) => a.pct - b.pct)

  const optionText = (answer: Answer, key: string) => {
    const q = answer.questions
    if (!q) return ''
    return q[`option_${key.toLowerCase()}` as keyof typeof q] as string
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>

      {/* Nav */}
      <nav style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <Link href="/dashboard" style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)', textDecoration: 'none' }}>← Dashboard</Link>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

        {/* Score card */}
        <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '32px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Exam Complete</p>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px' }}>
                {attempt.score}/{attempt.total_questions} correct
              </h1>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                Time: {elapsed(attempt.started_at, attempt.completed_at)}
              </p>
            </div>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              backgroundColor: passed ? '#DCFCE7' : '#FEE2E2',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: passed ? '#166534' : '#991B1B' }}>{pct}%</span>
            </div>
          </div>

          {/* Score bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, marginBottom: 6 }}>
              <div style={{ height: 8, borderRadius: 4, width: `${pct}%`, backgroundColor: passed ? '#16A34A' : '#DC2626', transition: 'width 1s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8' }}>
              <span>0%</span>
              <span style={{ color: '#64748B', fontWeight: 500 }}>Pass mark: 70%</span>
              <span>100%</span>
            </div>
          </div>

          <div style={{ backgroundColor: passed ? '#F0FDF4' : '#FFF7ED', border: `1px solid ${passed ? '#BBF7D0' : '#FED7AA'}`, borderRadius: 8, padding: '14px 16px' }}>
            <p style={{ fontSize: 14, color: passed ? '#166534' : '#9A3412', lineHeight: 1.6 }}>
              {passed
                ? 'Congratulations — you passed. Review the results below to reinforce your weaker areas before the real exam.'
                : `You scored ${pct}% — ${70 - pct}% below the passing mark. Use the study references below to focus your preparation.`}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid #E2E8F0' }}>
          {(['summary', 'review'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                border: 'none', backgroundColor: 'transparent', textTransform: 'capitalize',
                color: activeTab === tab ? '#0B1F33' : '#94A3B8',
                borderBottom: `2px solid ${activeTab === tab ? '#0B1F33' : 'transparent'}`,
                marginBottom: -1,
              }}
            >
              {tab === 'summary' ? 'Section Summary' : `Question Review (${answers.filter(a => !a.is_correct).length} incorrect)`}
            </button>
          ))}
        </div>

        {/* Section summary */}
        {activeTab === 'summary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sectionBreakdown.map(s => (
              <div key={s.sectionId} style={{ backgroundColor: 'white', borderRadius: 10, border: '1px solid #E2E8F0', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#0B1F33' }}>{s.title}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: s.pct >= 70 ? '#166534' : s.pct >= 50 ? '#92400E' : '#991B1B' }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 6, backgroundColor: '#E2E8F0', borderRadius: 3 }}>
                    <div style={{
                      height: 6, borderRadius: 3, width: `${s.pct}%`,
                      backgroundColor: s.pct >= 70 ? '#16A34A' : s.pct >= 50 ? '#D97706' : '#DC2626',
                    }} />
                  </div>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{s.correct}/{s.total} correct</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Question review */}
        {activeTab === 'review' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {answers.map((answer, i) => {
              const q = answer.questions
              if (!q) return null
              const correct = answer.is_correct
              const selectedText = answer.selected_answer ? optionText(answer, answer.selected_answer) : 'Not answered'
              const correctText = optionText(answer, q.correct_answer)

              return (
                <div key={answer.id} style={{ backgroundColor: 'white', borderRadius: 12, border: `1px solid ${correct ? '#BBF7D0' : '#FECACA'}`, overflow: 'hidden' }}>
                  <div style={{ padding: '14px 20px', borderBottom: `1px solid ${correct ? '#DCFCE7' : '#FEE2E2'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: correct ? '#F0FDF4' : '#FFF5F5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: correct ? '#166534' : '#991B1B' }}>
                        {correct ? '✓' : '✗'} Q{i + 1}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, padding: '2px 8px', borderRadius: 4, backgroundColor: correct ? '#DCFCE7' : '#FEE2E2', color: correct ? '#166534' : '#991B1B' }}>
                      {correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.65, marginBottom: 14 }}>{q.question_text}</p>

                    {!correct && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                        <div style={{ fontSize: 13, color: '#991B1B', backgroundColor: '#FEE2E2', padding: '8px 12px', borderRadius: 6 }}>
                          <strong>Your answer ({answer.selected_answer || '—'}):</strong> {selectedText}
                        </div>
                        <div style={{ fontSize: 13, color: '#166534', backgroundColor: '#DCFCE7', padding: '8px 12px', borderRadius: 6 }}>
                          <strong>Correct answer ({q.correct_answer}):</strong> {correctText}
                        </div>
                      </div>
                    )}

                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65, marginBottom: q.act_reference || q.regulation_ref ? 12 : 0 }}>
                      {q.explanation}
                    </p>

                    {(q.act_reference || q.regulation_ref) && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                        {q.act_reference && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 11, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>
                              {q.act_reference}
                            </span>
                          </div>
                        )}
                        {q.regulation_ref && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontFamily: 'monospace', fontSize: 11, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>
                              {q.regulation_ref}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
            Back to dashboard
          </Link>
          <Link href="/exam" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
            Take another exam →
          </Link>
        </div>

      </div>
    </div>
  )
}
