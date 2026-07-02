'use client'

import { useState } from 'react'

const DEMO_CARDS = [
  {
    q: 'Can a BC strata corporation pass a bylaw restricting residential rentals?',
    a: 'No. Since November 24, 2022 (Bill 44), all residential rental restriction bylaws are invalid and unenforceable. Short-term rental restrictions (e.g. Airbnb) are still permitted.'
  },
  {
    q: 'What vote is required to amend strata bylaws?',
    a: 'A 3/4 vote at a general meeting, unless a higher threshold (such as unanimous) is required for specific types of amendments.'
  },
  {
    q: 'How often must a strata corporation obtain a depreciation report under current BC law?',
    a: 'At least once every five years. Effective July 1, 2024, the previous 3-year cycle and the ability to defer by 3/4 vote were both eliminated.'
  },
  {
    q: 'What is the minimum annual CRF contribution required under the Strata Property Act?',
    a: 'At least 10% of the total annual operating fund budget, effective November 1, 2023.'
  },
  {
    q: 'What age restriction bylaws are still permitted under the Strata Property Act?',
    a: 'Only 55-and-over age restrictions. Age restrictions excluding persons under 19 are no longer valid following the 2022 amendments.'
  },
]

export default function FlashcardDemo() {
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = DEMO_CARDS[cardIndex]

  return (
    <div>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0',
          minHeight: 240, padding: '32px', cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: 16,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', transition: 'box-shadow 0.2s ease',
        }}
      >
        <div style={{ position: 'absolute', top: 14, right: 16, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: flipped ? '#00a79d' : '#94A3B8' }}>
          {flipped ? 'Answer' : 'Question'}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 16 }}>
          <p style={{ fontSize: 16, fontWeight: flipped ? 400 : 600, color: '#0B1F33', lineHeight: 1.65, textAlign: 'center' }}>
            {flipped ? card.a : card.q}
          </p>
        </div>
        <p style={{ fontSize: 11, color: '#CBD5E1', textAlign: 'center', marginTop: 16 }}>
          {flipped ? 'Tap to see question' : 'Tap to reveal answer'}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {DEMO_CARDS.map((_, i) => (
            <div
              key={i}
              onClick={() => { setCardIndex(i); setFlipped(false) }}
              style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: i === cardIndex ? '#0B1F33' : '#E2E8F0', cursor: 'pointer' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => { setCardIndex(i => Math.max(0, i - 1)); setFlipped(false) }}
            disabled={cardIndex === 0}
            style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: 'white', color: cardIndex === 0 ? '#CBD5E1' : '#0B1F33', cursor: cardIndex === 0 ? 'not-allowed' : 'pointer' }}
          >←</button>
          <button
            onClick={() => { setCardIndex(i => Math.min(DEMO_CARDS.length - 1, i + 1)); setFlipped(false) }}
            disabled={cardIndex === DEMO_CARDS.length - 1}
            style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8, border: '1px solid #E2E8F0', backgroundColor: 'white', color: cardIndex === DEMO_CARDS.length - 1 ? '#CBD5E1' : '#0B1F33', cursor: cardIndex === DEMO_CARDS.length - 1 ? 'not-allowed' : 'pointer' }}
          >→</button>
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 12, textAlign: 'center' }}>
        Card {cardIndex + 1} of {DEMO_CARDS.length} · Updated for 2024 legislation
      </p>
    </div>
  )
}
