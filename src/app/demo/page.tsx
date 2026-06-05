'use client'

import { useState } from 'react'
import Logo from '@/components/logo'
import Link from 'next/link'

const DEMO_QUESTIONS = [
  {
    id: 1,
    section: 'Professionalism and Ethics',
    question_text: 'Which type of misconduct under the Real Estate Services Act focuses on overall professionalism over and above technical compliance with legislation and the Real Estate Services Rules?',
    option_a: 'Professional misconduct',
    option_b: 'Lapse of character',
    option_c: 'Conduct unbecoming a licensee',
    option_d: 'Breach of civility',
    correct_answer: 'C',
    explanation: 'Conduct unbecoming a licensee is conduct that is contrary to the interests of the public, undermines public confidence, or brings the real estate industry into disrepute. This goes above and beyond technical compliance with legislation and the Rules. Professional misconduct is concerned with technical compliance.',
    distractor_explanations: 'Option (A) is incorrect because professional misconduct relates to technical breaches of legislation and the Rules, not broader professionalism. Option (B) is incorrect — "lapse of character" is not a defined category under RESA. Option (D) is incorrect — "breach of civility" is not a defined term under RESA.',
    study_note: 'RESA creates two distinct misconduct categories. Professional misconduct is about breaking specific rules. Conduct unbecoming sets a higher bar — it captures behaviour that damages the profession\'s reputation or public trust even when no specific rule has been broken.',
    act_reference: 'RESA s.35',
  },
  {
    id: 2,
    section: 'Strata Management Contracts and Agency',
    question_text: 'Under the Real Estate Services Rules, when must a brokerage enter into a written service agreement before providing strata management services to a strata corporation?',
    option_a: 'Within 30 days of commencing services',
    option_b: 'Before the brokerage provides any of the services to the strata corporation',
    option_c: 'At the first annual general meeting of the strata corporation',
    option_d: 'Within 14 days of the strata council\'s written request',
    correct_answer: 'B',
    explanation: 'Section 43(2)(c) of the Real Estate Services Rules requires that the service agreement must be entered into before the brokerage provides any of the services to the strata corporation.',
    distractor_explanations: 'Option (A) is incorrect — there is no 30-day grace period. Option (C) is incorrect — the AGM timing is irrelevant to the service agreement requirement. Option (D) is incorrect — the 14-day period does not appear in the Rules.',
    study_note: 'The written service agreement requirement is strict — no services at all can be provided before the agreement is signed. This protects both parties by establishing the scope, fees, and terms before any work begins.',
    act_reference: 'Real Estate Services Rules, s. 43(2)(c)',
  },
  {
    id: 3,
    section: 'Overview of the Strata Property Act',
    question_text: 'Under the Strata Property Act, which of the following best describes "common property"?',
    option_a: 'All personal property held by or on behalf of a strata corporation, including lawnmowers and caretaker suites',
    option_b: 'That part of the land and buildings shown on a strata plan that is not part of a strata lot, plus pipes, wires, cables and similar facilities in certain locations',
    option_c: 'Common property designated for the exclusive use of the owners of one or more strata lots',
    option_d: 'Land held in the name of or on behalf of a strata corporation that is not shown on the strata plan',
    correct_answer: 'B',
    explanation: 'The SPA defines "common property" as that part of the land and buildings shown on a strata plan that is not part of a strata lot, and pipes, wires, cables, chutes, ducts and other facilities in certain locations. Option A describes "common assets," Option C describes "limited common property," and Option D is part of the definition of "common assets."',
    distractor_explanations: 'Option (A) describes common assets — moveable property owned by the strata corporation. Option (C) describes limited common property — common property designated for exclusive use by specific owners. Option (D) describes land held as common assets, not common property.',
    study_note: 'The SPA has four related but distinct concepts: common property (land/buildings on the strata plan not in a strata lot), common assets (personal property owned by the corporation), limited common property (common property for exclusive use), and strata lots. Keeping these definitions clear is essential for the exam.',
    act_reference: 'Strata Property Act, s. 1',
  },
  {
    id: 4,
    section: 'Strata Meetings and Governance',
    question_text: 'Under the Strata Property Act, a developer is required to hold the first Annual General Meeting (AGM) during the six-week period that begins on the earlier of two dates. Which of the following correctly identifies BOTH trigger dates?',
    option_a: 'The date on which 25% of strata lots have been conveyed, or six months after the first conveyance',
    option_b: 'The date on which 50% plus one of the strata lots have been conveyed, or nine months after the date of the first conveyance of a strata lot to a purchaser',
    option_c: 'The date on which 50% plus one of the strata lots have been conveyed, or twelve months after the date of the first conveyance of a strata lot to a purchaser',
    option_d: 'The date on which all strata lots have been conveyed, or nine months after the date of the first conveyance of a strata lot to a purchaser',
    correct_answer: 'B',
    explanation: 'Section 16 of the SPA requires the developer to hold the first AGM during the six-week period beginning on the earlier of: (a) the date on which 50% plus one of the strata lots have been conveyed to purchasers, or (b) the date that is nine months after the date of the first conveyance of a strata lot to a purchaser.',
    distractor_explanations: 'Option (A) uses incorrect thresholds — 25% and six months do not appear in s.16. Option (C) uses twelve months instead of nine. Option (D) incorrectly requires all lots to be conveyed, which could indefinitely delay the first AGM.',
    study_note: 'The first AGM trigger dates are a favourite exam topic. Remember: majority (50%+1) conveyed, OR nine months after first conveyance — whichever comes first. The six-week window then begins from that earlier date.',
    act_reference: 'Strata Property Act, s. 16',
  },
  {
    id: 5,
    section: 'Budgeting: Operating Budget and Fund',
    question_text: 'A strata corporation with a building of 60 units and total unit entitlement of 5,335 m² has budgeted total strata fees of $193,433 for the year. Strata Lot 101 has a unit entitlement of 105 m². What is the correct annual strata fee contribution for Strata Lot 101?',
    option_a: '$3,223.88',
    option_b: '$3,807.02',
    option_c: '$4,115.25',
    option_d: '$3,500.00',
    correct_answer: 'B',
    explanation: 'Using the formula under section 99 of the Act: (unit entitlement of strata lot / total unit entitlement) x total contribution = (105/5,335) x $193,433 = $3,807.02 per annum.',
    distractor_explanations: 'Option (A) uses an incorrect divisor. Option (C) incorrectly divides by the number of units rather than total unit entitlement. Option (D) is a round number with no formula basis.',
    study_note: 'Strata fee calculations always use unit entitlement, not number of units. The formula is: (lot\'s unit entitlement ÷ total unit entitlement) × total budget. Memorize this — calculation questions appear on nearly every exam.',
    act_reference: 'Strata Property Act, s. 99',
  },
]

type Answer = 'A' | 'B' | 'C' | 'D'
type Answers = Record<number, Answer>

function ScoreBar({ score, total }: { score: number; total: number }) {
  const pct = Math.round((score / total) * 100)
  const passed = pct >= 70
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: '#64748B' }}>{score} of {total} correct</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: passed ? '#166534' : '#991B1B' }}>{pct}%</span>
      </div>
      <div style={{ height: 8, backgroundColor: '#E2E8F0', borderRadius: 4 }}>
        <div style={{ height: 8, borderRadius: 4, width: `${pct}%`, backgroundColor: passed ? '#16A34A' : '#DC2626', transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

export default function DemoPage() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null)

  const q = DEMO_QUESTIONS[current]
  const isLast = current === DEMO_QUESTIONS.length - 1
  const score = submitted
    ? DEMO_QUESTIONS.filter(q => answers[q.id] === q.correct_answer).length
    : 0

  function selectOption(opt: Answer) {
    if (submitted) return
    setSelectedOption(opt)
  }

  function next() {
    if (!selectedOption) return
    const newAnswers = { ...answers, [q.id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)
    if (isLast) {
      setSubmitted(true)
    } else {
      setCurrent(c => c + 1)
    }
  }

  const options: { key: Answer; text: string }[] = [
    { key: 'A', text: q.option_a },
    { key: 'B', text: q.option_b },
    { key: 'C', text: q.option_c },
    { key: 'D', text: q.option_d },
  ]

  if (submitted) {
    const pct = Math.round((score / DEMO_QUESTIONS.length) * 100)
    const passed = pct >= 70
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <Logo />
            <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
          </Link>
          <span style={{ color: 'rgba(247,249,252,0.5)', fontSize: 13 }}>Free Diagnostic — Results</span>
        </div>

        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>

          {/* Score card */}
          <div style={{ backgroundColor: 'white', borderRadius: 12, border: '1px solid #E2E8F0', padding: '32px', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Diagnostic Complete</p>
                <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px' }}>
                  {score}/{DEMO_QUESTIONS.length} correct
                </h1>
              </div>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                backgroundColor: passed ? '#DCFCE7' : '#FEE2E2',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column'
              }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: passed ? '#166534' : '#991B1B' }}>{pct}%</span>
              </div>
            </div>
            <ScoreBar score={score} total={DEMO_QUESTIONS.length} />
            <div style={{ backgroundColor: passed ? '#F0FDF4' : '#FFF7ED', border: `1px solid ${passed ? '#BBF7D0' : '#FED7AA'}`, borderRadius: 8, padding: '14px 16px' }}>
              <p style={{ fontSize: 14, color: passed ? '#166534' : '#9A3412', lineHeight: 1.6 }}>
                {passed
                  ? 'Strong result on this diagnostic. The full exam covers all relevant exam material in depth — this is a sample of what to expect.'
                  : 'This diagnostic covers 10 of 21 sections. The full exam requires 70% to pass. Use the study references below to identify exactly what to review.'}
              </p>
            </div>
          </div>

          {/* Question review */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B1F33', marginBottom: 16, letterSpacing: '-0.3px' }}>Question review</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {DEMO_QUESTIONS.map((dq, i) => {
              const userAnswer = answers[dq.id]
              const correct = userAnswer === dq.correct_answer
              return (
                <div key={dq.id} style={{ backgroundColor: 'white', borderRadius: 12, border: `1px solid ${correct ? '#BBF7D0' : '#FECACA'}`, overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', borderBottom: `1px solid ${correct ? '#DCFCE7' : '#FEE2E2'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: correct ? '#F0FDF4' : '#FFF5F5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: correct ? '#166534' : '#991B1B' }}>
                        {correct ? '✓' : '✗'} Q{i + 1}
                      </span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>{dq.section}</span>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: correct ? '#166534' : '#991B1B', backgroundColor: correct ? '#DCFCE7' : '#FEE2E2', padding: '2px 8px', borderRadius: 4 }}>
                      {correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.6, marginBottom: 12 }}>{dq.question_text}</p>
                    {!correct && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, color: '#991B1B', backgroundColor: '#FEE2E2', padding: '8px 12px', borderRadius: 6 }}>
                          <strong>Your answer ({userAnswer}):</strong> {dq[`option_${userAnswer?.toLowerCase()}` as keyof typeof dq] as string}
                        </div>
                        <div style={{ fontSize: 13, color: '#166534', backgroundColor: '#DCFCE7', padding: '8px 12px', borderRadius: 6 }}>
                          <strong>Correct answer ({dq.correct_answer}):</strong> {dq[`option_${dq.correct_answer.toLowerCase()}` as keyof typeof dq] as string}
                        </div>
                      </div>
                    )}
                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65, marginBottom: 12 }}>
                      {!correct && dq.distractor_explanations ? dq.distractor_explanations : dq.explanation}
                    </p>
                    {!correct && dq.study_note && (
                      <div style={{ backgroundColor: '#F8F6F1', border: '1px solid #E8E0CE', borderLeft: '3px solid #B08D57', borderRadius: 6, padding: '12px 14px', marginBottom: 12 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Study note</p>
                        <p style={{ fontSize: 13, color: '#4A3728', lineHeight: 1.7 }}>{dq.study_note}</p>
                      </div>
                    )}
                    {dq.act_reference && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                        <span style={{ fontFamily: 'monospace', fontSize: 11, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>
                          {dq.act_reference}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div style={{ backgroundColor: '#0B1F33', borderRadius: 12, padding: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#F7F9FC', letterSpacing: '-0.5px', marginBottom: 10 }}>
              Ready for the full exam?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(247,249,252,0.6)', marginBottom: 24, lineHeight: 1.7 }}>
              The full exam covers all relevant exam material with 105 questions.<br />Every wrong answer includes exact source references.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/signup" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
                Create account — $19.99 per exam
              </Link>
              <Link href="/signup?plan=unlimited" style={{ backgroundColor: 'transparent', color: '#F7F9FC', fontSize: 14, fontWeight: 500, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', border: '1px solid rgba(247,249,252,0.2)' }}>
                Full Prep Access — $49.99
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </Link>
        <span style={{ color: 'rgba(247,249,252,0.5)', fontSize: 13 }}>Free Diagnostic · Question {current + 1} of {DEMO_QUESTIONS.length}</span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, backgroundColor: '#E2E8F0' }}>
        <div style={{ height: 3, backgroundColor: '#B08D57', width: `${((current + 1) / DEMO_QUESTIONS.length) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>

        {/* Section label */}
        <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
          {q.section}
        </p>

        {/* Question */}
        <h2 style={{ fontSize: 19, fontWeight: 600, color: '#0B1F33', lineHeight: 1.55, marginBottom: 32, letterSpacing: '-0.2px' }}>
          {q.question_text}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {options.map(opt => {
            const isSelected = selectedOption === opt.key
            return (
              <button
                key={opt.key}
                onClick={() => selectOption(opt.key)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 18px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: `2px solid ${isSelected ? '#0B1F33' : '#E2E8F0'}`,
                  backgroundColor: isSelected ? 'rgba(11,31,51,0.04)' : 'white',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  border: `2px solid ${isSelected ? '#0B1F33' : '#CBD5E1'}`,
                  backgroundColor: isSelected ? '#0B1F33' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1,
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

        {/* Next button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>
            {DEMO_QUESTIONS.length - current - 1} questions remaining
          </span>
          <button
            onClick={next}
            disabled={!selectedOption}
            style={{
              backgroundColor: selectedOption ? '#0B1F33' : '#E2E8F0',
              color: selectedOption ? '#F7F9FC' : '#94A3B8',
              fontSize: 14, fontWeight: 600, padding: '12px 28px', borderRadius: 8,
              border: 'none', cursor: selectedOption ? 'pointer' : 'not-allowed',
              transition: 'all 0.15s ease',
            }}
          >
            {isLast ? 'Submit & see results' : 'Next question →'}
          </button>
        </div>

      </div>
    </div>
  )
}
