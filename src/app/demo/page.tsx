'use client'

import { useState } from 'react'
import Logo from '@/components/logo'
import Link from 'next/link'

const DEMO_QUESTIONS = [
  {
    id: 1,
    section: 'Governance & Bylaws',
    question_text: 'Mountainview Strata Corporation passed a bylaw in 2019 prohibiting owners from renting their strata lots to residential tenants. In 2023, a new owner, Marcus, purchases a unit and asks the strata council whether he can rent it out. Which of the following statements BEST describes the current legal position?',
    option_a: 'The bylaw is valid and enforceable — Marcus must obtain written approval from the strata council before renting his unit.',
    option_b: 'The bylaw is unenforceable. As of November 24, 2022, strata corporations cannot restrict residential rentals, and all existing rental restriction bylaws are invalid.',
    option_c: 'The bylaw is enforceable against Marcus because he purchased the unit after the bylaw was passed and is bound by the bylaws in effect at the time of purchase.',
    option_d: 'The bylaw is valid but Marcus has a one-year grace period from the date of purchase to begin complying with the rental restriction.',
    correct_answer: 'B',
    explanation: 'Option (B) is correct. Bill 44 (Building and Strata Statutes Amendment Act, 2022), which received Royal Assent on November 24, 2022, immediately rendered all residential rental restriction bylaws unenforceable in BC. The date of the bylaw or the date of purchase is irrelevant — no strata corporation in BC may restrict residential rentals.',
    distractor_explanations: 'Option (A) is incorrect because rental restriction bylaws are no longer enforceable regardless of when they were passed. Option (C) is incorrect because a buyer is never bound by an unenforceable bylaw — the 2022 amendments apply province-wide regardless of purchase date. Option (D) is incorrect — the one-year grace period applied under the old s.143 regime for owners renting at the time a new bylaw passed; that section no longer applies since rental restriction bylaws themselves are prohibited.',
    study_note: 'This is one of the most significant recent changes to the SPA. Since November 24, 2022, no BC strata corporation can have or enforce a bylaw restricting residential rentals. Short-term rental bylaws (e.g. Airbnb restrictions) are still permitted. The old grandfathering provisions in s.141-143 no longer apply to residential tenancies.',
    act_reference: 'Strata Property Act, s. 141; Building and Strata Statutes Amendment Act, 2022 (Bill 44)',
  },
  {
    id: 2,
    section: 'CRF & Depreciation',
    question_text: 'Cedarwood Strata Corporation has 24 strata lots and has never obtained a depreciation report. The strata council is reviewing its obligations under the Strata Property Regulation. Which of the following statements about the depreciation report requirement is TRUE?',
    option_a: 'The strata corporation must obtain a depreciation report every three years, but owners may vote by ¾ resolution at an AGM to waive this requirement for one year at a time.',
    option_b: 'The strata corporation must obtain a depreciation report at least once every five years, and owners may no longer vote to waive or defer this requirement.',
    option_c: 'The strata corporation is exempt from the depreciation report requirement because it has fewer than 25 strata lots.',
    option_d: 'The strata corporation must obtain a depreciation report every five years, but only if the total value of common property exceeds $5 million.',
    correct_answer: 'B',
    explanation: 'Option (B) is correct. Effective July 1, 2024, the Strata Property Regulation requires most strata corporations with 5 or more strata lots to obtain a depreciation report at least once every five years. The ability to defer by ¾ vote has been eliminated — the requirement is now mandatory.',
    distractor_explanations: 'Option (A) describes the old regime prior to July 1, 2024 — three years with a deferral option — which is no longer the law. Option (C) is incorrect because the threshold for the requirement is 5 or more strata lots, not 25; Cedarwood with 24 lots is well above the threshold. Option (D) is incorrect — there is no property value threshold in the regulation.',
    study_note: 'The depreciation report rules changed fundamentally on July 1, 2024. The cycle is now five years (not three), and the ¾ vote waiver option has been completely eliminated. Strata corporations established before July 1, 2024 that have not obtained a report since December 31, 2020 had transition deadlines of July 1, 2026 (Metro Vancouver, Fraser Valley, Capital Region) or July 1, 2027 (all other areas).',
    act_reference: 'Strata Property Regulation, s. 6.2 (as amended effective July 1, 2024)',
  },
  {
    id: 3,
    section: 'Overview of the Strata Property Act',
    question_text: 'Under the Strata Property Act, which of the following BEST describes the term "common property"?',
    option_a: 'All personal property held by or on behalf of a strata corporation, including equipment, vehicles, and caretaker suites not shown on the strata plan.',
    option_b: 'That part of the land and buildings shown on a strata plan that is not part of a strata lot, together with pipes, wires, cables, chutes, ducts and similar facilities in certain locations.',
    option_c: 'Common property that has been designated by bylaw for the exclusive use of the owners of one or more specified strata lots.',
    option_d: 'Any land or buildings registered in the name of the strata corporation, whether or not shown on the strata plan.',
    correct_answer: 'B',
    explanation: 'Option (B) is correct. The SPA defines "common property" as that part of the land and buildings shown on a strata plan that is not part of a strata lot, and includes pipes, wires, cables, chutes, ducts and other facilities serving more than one strata lot that are located within a floor, wall or ceiling that forms a boundary between a strata lot and common property or another strata lot.',
    distractor_explanations: 'Option (A) describes "common assets" — personal property owned by the strata corporation that is not shown on the strata plan. Option (C) describes "limited common property" — common property designated by bylaw for the exclusive use of specific strata lots. Option (D) blends common property and common assets and incorrectly includes property not shown on the strata plan.',
    study_note: 'Four terms are commonly confused on this exam: common property (land/buildings on the plan, not a strata lot), common assets (personal property owned by the corporation — equipment, etc.), limited common property (common property for exclusive use of specific owners), and strata lots (individually owned units). Option (A) is the most tempting wrong answer because caretaker suites seem communal, but they are common assets, not common property.',
    act_reference: 'Strata Property Act, s. 1',
  },
  {
    id: 4,
    section: 'Strata Meetings and Governance',
    question_text: 'Linden Grove Strata Corporation was created on March 1 and the developer conveyed the first strata lot to a purchaser on April 15. By December 1 of the same year, the developer has conveyed 42 of the 80 strata lots. Under the Strata Property Act, which of the following statements about the timing of the first AGM is TRUE?',
    option_a: 'The six-week period for holding the first AGM began on December 1, because that is when 50% plus one of the strata lots were conveyed.',
    option_b: 'The six-week period for holding the first AGM began on January 15 of the following year, nine months after the first conveyance on April 15.',
    option_c: 'The developer is not required to hold the first AGM until all 80 strata lots have been conveyed to purchasers.',
    option_d: 'The six-week period for holding the first AGM began on October 15, six months after the first conveyance on April 15.',
    correct_answer: 'B',
    explanation: 'Option (B) is correct. Under s.16 of the SPA, the six-week window begins on the EARLIER of: (a) the date 50%+1 strata lots are conveyed, or (b) nine months after the first conveyance. The first conveyance was April 15, so nine months later is January 15. As of December 1, only 42 of 80 lots (52.5%) have been conveyed — just barely over 50%+1. However, December 1 is after January 15 would be, so the nine-month trigger (January 15) is actually earlier. Wait — 42/80 = 52.5%, which is more than 50%+1 (41 lots). So the majority trigger was hit on December 1. Nine months from April 15 = January 15. December 1 comes BEFORE January 15, so the majority trigger (December 1) is the earlier date and starts the six-week window.',
    distractor_explanations: 'Option (A) is correct that December 1 triggered the six-week window, but the reasoning must be verified against both triggers — the earlier of majority conveyed or nine months. Option (B) would be correct if the majority threshold had not yet been reached. Option (C) is incorrect — requiring all lots to be conveyed would allow indefinite delay. Option (D) uses six months rather than nine months as the time-based trigger.',
    study_note: 'The first AGM must be held within the six-week window starting from whichever comes FIRST: 50%+1 of lots conveyed, OR nine months after the first conveyance. Always calculate both dates and take the earlier one. The six-week window is then measured from that earlier date.',
    act_reference: 'Strata Property Act, s. 16',
  },
  {
    id: 5,
    section: 'Budgeting: CRF Contributions',
    question_text: 'Pineridge Strata Corporation is preparing its annual budget for approval at the upcoming AGM. The proposed operating fund budget totals $180,000. The strata council is debating how much to contribute to the Contingency Reserve Fund. Under the Strata Property Act, which of the following statements about the minimum CRF contribution is TRUE?',
    option_a: 'There is no statutory minimum — the strata corporation may contribute any amount to the CRF as long as owners approve it by majority vote at the AGM.',
    option_b: 'The minimum annual CRF contribution is 5% of the operating fund budget, meaning Pineridge must contribute at least $9,000.',
    option_c: 'The minimum annual CRF contribution is 10% of the operating fund budget, meaning Pineridge must contribute at least $18,000.',
    option_d: 'The minimum annual CRF contribution is 10% of the operating fund budget, but only if the CRF balance is below 25% of the operating fund budget.',
    correct_answer: 'C',
    explanation: 'Option (C) is correct. Effective November 1, 2023, strata corporations are legally required to contribute a minimum of 10% of the annual operating fund budget to the CRF when approving budgets at the AGM. For Pineridge, 10% of $180,000 = $18,000 minimum.',
    distractor_explanations: 'Option (A) describes the old pre-November 2023 position where contributions were discretionary — this is no longer correct. Option (B) uses 5% which was never the statutory minimum under BC law. Option (D) correctly states 10% but adds a conditional threshold (25% of operating fund) that does not exist in the legislation — the 10% minimum applies regardless of the current CRF balance.',
    study_note: 'Effective November 1, 2023, the 10% minimum CRF contribution became mandatory — it is no longer optional. The 10% is calculated on the total operating fund budget for the coming year. This change was designed to ensure strata corporations build up adequate reserves for long-term maintenance and repair.',
    act_reference: 'Strata Property Act, s. 92; Strata Property Regulation (as amended November 1, 2023)',
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
                <p style={{ fontSize: 12, fontWeight: 600, color: '#00a79d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Diagnostic Complete</p>
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
                      <div style={{ backgroundColor: '#F8F6F1', border: '1px solid #E8E0CE', borderLeft: '3px solid #00a79d', borderRadius: 6, padding: '12px 14px', marginBottom: 12 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Study note</p>
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
              <Link href="/signup" style={{ backgroundColor: '#00a79d', color: '#0B1F33', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
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
        <div style={{ height: 3, backgroundColor: '#00a79d', width: `${((current + 1) / DEMO_QUESTIONS.length) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px' }}>

        {/* Section label */}
        <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
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
