'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/client'

type Question = {
  id: string
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
  difficulty: number
}

type Answers = Record<string, string>

export default function ExamPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [startTime] = useState(Date.now())
  const attemptIdRef = useRef<string | null>(null)

  useEffect(() => {
    async function startExam() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { router.push('/login'); return }

        const params = new URLSearchParams(window.location.search)
        if (params.get('paid') === 'true') {
          await new Promise(r => setTimeout(r, 2000))
        }

        // Check for existing in-progress attempt first
        const resumeRes = await fetch('/api/exam/resume', { method: 'GET' })
        const resumeData = await resumeRes.json()
        if (resumeData.attemptId && resumeData.questions?.length > 0) {
          setQuestions(resumeData.questions)
          setAttemptId(resumeData.attemptId)
          attemptIdRef.current = resumeData.attemptId
          if (resumeData.answers) {
            setAnswers(resumeData.answers)
            // Resume at first unanswered question
            const firstUnanswered = resumeData.questions.findIndex((q: any) => !resumeData.answers[q.id])
            if (firstUnanswered > 0) setCurrent(firstUnanswered)
          }
          setLoading(false)
          return
        }

        const res = await fetch('/api/exam/start', { method: 'POST' })
        const data = await res.json()
        if (data.error) { setError(data.error); setLoading(false); return }
        setQuestions(data.questions)
        setAttemptId(data.attemptId)
        attemptIdRef.current = data.attemptId
        setLoading(false)
      } catch (err) {
        setError('Failed to load exam. Please try again.')
        setLoading(false)
      }
    }
    startExam()
  }, [])

  async function saveAnswer(questionId: string, selectedAnswer: string, correctAnswer: string) {
    const aid = attemptIdRef.current
    if (!aid) return
    try {
      await fetch('/api/exam/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId: aid,
          questionId,
          selectedAnswer,
          correctAnswer,
        }),
      })
    } catch (err) {
      // Silent fail — answer is still in local state
      console.error('Auto-save failed', err)
    }
  }

  function handleSelectAnswer(questionId: string, optionKey: string, correctAnswer: string) {
    setAnswers(prev => ({ ...prev, [questionId]: optionKey }))
    saveAnswer(questionId, optionKey, correctAnswer)
  }

  async function handleSubmit() {
    if (!attemptId) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setSubmitting(false); return }
      router.push(`/results/${attemptId}`)
    } catch (err) {
      setError('Failed to submit exam. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
        <div style={{ width: 32, height: 32, border: '3px solid #E2E8F0', borderTopColor: '#0B1F33', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: '#64748B', fontSize: 14 }}>Preparing your exam...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#8f1e22', fontSize: 15, marginBottom: 16 }}>{error}</p>
          <button onClick={() => router.push('/dashboard')} style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14 }}>
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const totalAnswered = Object.keys(answers).length
  const unanswered = questions.length - totalAnswered
  const options: { key: string; text: string }[] = [
    { key: 'A', text: q.option_a },
    { key: 'B', text: q.option_b },
    { key: 'C', text: q.option_c },
    { key: 'D', text: q.option_d },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)' }}>
            {totalAnswered} of {questions.length} answered
          </span>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer' }}
          >
            Submit exam
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, backgroundColor: '#E2E8F0', flexShrink: 0 }}>
        <div style={{ height: 3, backgroundColor: '#00a79d', width: `${((current + 1) / questions.length) * 100}%`, transition: 'width 0.2s ease' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', maxWidth: 1100, margin: '0 auto', width: '100%', padding: '32px 24px', gap: 32 }}>

        {/* Question panel */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
            Question {current + 1} of {questions.length}
          </p>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#0B1F33', lineHeight: 1.6, marginBottom: 28, letterSpacing: '-0.2px' }}>
            {(() => {
              // Split question into: stem, A/B/C/D items, optional closing question
              const nlIndex = q.question_text.indexOf('\nA. ')
              const inlineIndex = q.question_text.search(/[:.?] +A\. /)
              const splitIndex = nlIndex > -1 ? nlIndex : inlineIndex
              const isNewline = nlIndex > -1
              if (splitIndex > -1) {
                const inlineMatch = q.question_text.slice(splitIndex).match(/[:?\.] +/)
                const stem = q.question_text.slice(0, isNewline ? splitIndex : splitIndex + (inlineMatch ? inlineMatch[0].length : 2)).trim()
                const listPart = isNewline
                  ? q.question_text.slice(splitIndex + 1)
                  : q.question_text.slice(splitIndex).replace(/^[:\.]+\s+/, '')
                const items = isNewline
                  ? listPart.split(/\n(?=[A-D]\.\s)/).map(s => s.trim()).filter(Boolean)
                  : listPart.split(/(?<=\.\s{0,2})(?=[B-D]\.\s)/).map(s => s.trim()).filter(Boolean)
                const lastItem = items[items.length - 1]
                const closingMatch = lastItem.match(/^([A-D]\..+?)\s{2,}(.+)$/) ||
                                     lastItem.match(/^([A-D]\..+?\.)(\s+Which .+|\s+What .+|\s+Under .+)$/)
                if (closingMatch) {
                  items[items.length - 1] = closingMatch[1].trim()
                  const closing = closingMatch[2].trim()
                  return (
                    <>
                      <span>{stem}</span>
                      <div style={{ marginTop: 12, marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {items.map((item, idx) => (
                          <div key={idx} style={{ fontSize: 15, fontWeight: 400, paddingLeft: 8, borderLeft: '2px solid #E2E8F0', lineHeight: 1.5 }}>{item}</div>
                        ))}
                      </div>
                      <span>{closing}</span>
                    </>
                  )
                }
                return (
                  <>
                    <span>{stem}</span>
                    <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {items.map((item, idx) => (
                        <div key={idx} style={{ fontSize: 15, fontWeight: 400, paddingLeft: 8, borderLeft: '2px solid #E2E8F0', lineHeight: 1.5 }}>{item}</div>
                      ))}
                    </div>
                  </>
                )
              }
              return <span>{q.question_text}</span>
            })()}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
            {options.map(opt => {
              const isSelected = answers[q.id] === opt.key
              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer(q.id, opt.key, q.correct_answer)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '14px 18px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                    border: `2px solid ${isSelected ? '#0B1F33' : '#E2E8F0'}`,
                    backgroundColor: isSelected ? 'rgba(11,31,51,0.04)' : 'white',
                    transition: 'all 0.15s ease', width: '100%',
                  }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${isSelected ? '#0B1F33' : '#CBD5E1'}`,
                    backgroundColor: isSelected ? '#0B1F33' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
                  }}>
                    {isSelected
                      ? <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white' }} />
                      : <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>{opt.key}</span>
                    }
                  </div>
                  <span style={{ fontSize: 14, color: '#2D3748', lineHeight: 1.55 }}>{opt.text}</span>
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              disabled={current === 0}
              style={{
                fontSize: 14, fontWeight: 500, padding: '10px 20px', borderRadius: 8,
                border: '1.5px solid #E2E8F0', backgroundColor: 'white',
                color: current === 0 ? '#CBD5E1' : '#0B1F33',
                cursor: current === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Back
            </button>

            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent(c => c + 1)}
                style={{
                  fontSize: 14, fontWeight: 600, padding: '10px 24px', borderRadius: 8,
                  border: 'none', backgroundColor: '#0B1F33', color: '#F7F9FC', cursor: 'pointer',
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                style={{
                  fontSize: 14, fontWeight: 600, padding: '10px 24px', borderRadius: 8,
                  border: 'none', backgroundColor: '#00a79d', color: '#ffffff', cursor: 'pointer',
                }}
              >
                Review & Submit
              </button>
            )}
          </div>
        </div>

        {/* Question grid sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Questions</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {questions.map((ques, i) => {
              const answered = !!answers[ques.id]
              const isCurrent = i === current
              return (
                <button
                  key={ques.id}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: 34, height: 34, borderRadius: 6, fontSize: 12, fontWeight: 600,
                    border: isCurrent ? '2px solid #0B1F33' : '1.5px solid #E2E8F0',
                    backgroundColor: isCurrent ? '#0B1F33' : answered ? '#e6f7f6' : 'white',
                    color: isCurrent ? '#F7F9FC' : answered ? '#007a72' : '#94A3B8',
                    cursor: 'pointer',
                  }}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 16 }}>
            {totalAnswered} answered · {unanswered} remaining
          </p>
        </div>

      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 24 }}>
          <div style={{ backgroundColor: 'white', borderRadius: 16, padding: '32px', maxWidth: 420, width: '100%' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px', marginBottom: 8 }}>Submit your exam?</h2>
            {unanswered > 0 ? (
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
                You have <strong>{unanswered} unanswered question{unanswered !== 1 ? 's' : ''}</strong>. Unanswered questions will be marked incorrect. Are you sure you want to submit?
              </p>
            ) : (
              <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
                You have answered all {questions.length} questions. Ready to see your results?
              </p>
            )}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                style={{ flex: 1, fontSize: 14, padding: '11px', borderRadius: 8, border: '1.5px solid #E2E8F0', backgroundColor: 'white', color: '#64748B', cursor: 'pointer', fontWeight: 500 }}
              >
                Keep going
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{ flex: 1, fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, border: 'none', backgroundColor: '#0B1F33', color: '#F7F9FC', cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {submitting ? 'Submitting...' : 'Submit exam'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
