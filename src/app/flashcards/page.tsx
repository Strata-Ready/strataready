'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Logo from '@/components/logo'
import { createClient } from '@/lib/supabase/client'
import { FLASHCARD_SECTIONS, FREE_PREVIEW_COUNT } from '@/data/flashcards'

function FlashcardsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [cards, setCards] = useState<{ q: string; a: string }[]>([])
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)

      // Auto-select section from query param (e.g. from skills map click)
      const sectionParam = searchParams.get('section')
      if (sectionParam) {
        const sectionId = parseInt(sectionParam)
        handleSelectSection(sectionId, !!user)
      }
    }
    checkAuth()
  }, [])

  function handleSelectSection(sectionId: number, isLoggedIn: boolean) {
    const section = FLASHCARD_SECTIONS.find(s => s.id === sectionId)
    if (!section) return

    const shuffled = [...section.cards].sort(() => Math.random() - 0.5)
    const available = isLoggedIn ? shuffled : shuffled.slice(0, FREE_PREVIEW_COUNT)

    setSelectedSection(sectionId)
    setCards(available)
    setCardIndex(0)
    setFlipped(false)
    setShowUpgradePrompt(false)
  }

  function handleNext() {
    if (cardIndex < cards.length - 1) {
      setCardIndex(i => i + 1)
      setFlipped(false)
    } else if (!user) {
      setShowUpgradePrompt(true)
    }
  }

  function handlePrev() {
    if (cardIndex > 0) {
      setCardIndex(i => i - 1)
      setFlipped(false)
    }
  }

  function handleShuffle() {
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setCardIndex(0)
    setFlipped(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748B', fontSize: 14 }}>Loading...</p>
      </div>
    )
  }

  const section = FLASHCARD_SECTIONS.find(s => s.id === selectedSection)
  const totalCards = user ? (section?.cards.length || 0) : Math.min(FREE_PREVIEW_COUNT, section?.cards.length || 0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      {/* Nav */}
      <nav style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo />
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {user
            ? <Link href="/dashboard" style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)', textDecoration: 'none' }}>← Dashboard</Link>
            : <>
                <Link href="/login" style={{ fontSize: 13, color: 'rgba(247,249,252,0.6)', textDecoration: 'none' }}>Sign in</Link>
                <Link href="/signup" style={{ fontSize: 13, color: '#00a79d', fontWeight: 600, textDecoration: 'none' }}>Get full access →</Link>
              </>
          }
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.5px' }}>Flashcards</h1>
            {!user && (
              <span style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', backgroundColor: 'rgba(0,167,157,0.1)', padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(0,167,157,0.2)' }}>
                FREE PREVIEW
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            {user
              ? 'Select a section to study. Cards are shuffled each session.'
              : `Preview ${FREE_PREVIEW_COUNT} cards per section free. Sign in for full access to all cards.`
            }
          </p>
        </div>

        {/* Section picker */}
        {!selectedSection ? (
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Choose a section</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
              {FLASHCARD_SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSection(s.id, !!user)}
                  style={{
                    backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 10,
                    padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#00a79d')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
                >
                  <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>Section {s.id}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0B1F33' }}>{s.title}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
                    {user ? s.cards.length : Math.min(FREE_PREVIEW_COUNT, s.cards.length)} cards
                    {!user && s.cards.length > FREE_PREVIEW_COUNT ? ` of ${s.cards.length}` : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : showUpgradePrompt ? (
          <div style={{ backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0', padding: '48px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>You've previewed {FREE_PREVIEW_COUNT} cards</p>
            <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32, lineHeight: 1.6 }}>
              Create a free account to access all {section?.cards.length} cards in {section?.title} — plus all 21 sections.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link href="/signup" style={{ backgroundColor: '#00a79d', color: 'white', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
                Create free account →
              </Link>
              <button
                onClick={() => setSelectedSection(null)}
                style={{ backgroundColor: 'white', color: '#64748B', fontSize: 14, padding: '12px 24px', borderRadius: 8, border: '1px solid #E2E8F0', cursor: 'pointer' }}
              >
                Choose another section
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <button
                  onClick={() => setSelectedSection(null)}
                  style={{ fontSize: 13, color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 4 }}
                >
                  ← All sections
                </button>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B1F33' }}>Section {selectedSection}: {section?.title}</h2>
              </div>
              <button
                onClick={handleShuffle}
                style={{ fontSize: 13, color: '#64748B', background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}
              >
                🔀 Shuffle
              </button>
            </div>

            {/* Card counter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#94A3B8' }}>Card {cardIndex + 1} of {totalCards}</p>
              <div style={{ display: 'flex', gap: 4 }}>
                {cards.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6, height: 6, borderRadius: '50%',
                      backgroundColor: i === cardIndex ? '#0B1F33' : i < cardIndex ? '#00a79d' : '#E2E8F0'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Flashcard */}
            <div
              onClick={() => setFlipped(f => !f)}
              style={{
                backgroundColor: 'white', borderRadius: 16, border: '1px solid #E2E8F0',
                minHeight: 280, padding: '40px 40px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)', transition: 'transform 0.1s ease',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Card type indicator */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: flipped ? '#00a79d' : '#94A3B8'
              }}>
                {flipped ? 'Answer' : 'Question'}
              </div>

              {/* Content */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 16 }}>
                {!flipped ? (
                  <p style={{ fontSize: 18, fontWeight: 600, color: '#0B1F33', lineHeight: 1.6, textAlign: 'center' }}>
                    {cards[cardIndex]?.q}
                  </p>
                ) : (
                  <p style={{ fontSize: 16, color: '#2D3748', lineHeight: 1.7, textAlign: 'center' }}>
                    {cards[cardIndex]?.a}
                  </p>
                )}
              </div>

              {/* Tap hint */}
              <p style={{ fontSize: 12, color: '#CBD5E1', textAlign: 'center', marginTop: 24 }}>
                {flipped ? 'Tap to see question' : 'Tap to reveal answer'}
              </p>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24 }}>
              <button
                onClick={handlePrev}
                disabled={cardIndex === 0}
                style={{
                  fontSize: 14, fontWeight: 500, padding: '11px 28px', borderRadius: 8,
                  border: '1.5px solid #E2E8F0', backgroundColor: 'white',
                  color: cardIndex === 0 ? '#CBD5E1' : '#0B1F33',
                  cursor: cardIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                disabled={cardIndex === cards.length - 1 && !!user}
                style={{
                  fontSize: 14, fontWeight: 600, padding: '11px 28px', borderRadius: 8,
                  border: 'none', backgroundColor: '#0B1F33', color: '#F7F9FC',
                  cursor: (cardIndex === cards.length - 1 && !!user) ? 'not-allowed' : 'pointer',
                  opacity: (cardIndex === cards.length - 1 && !!user) ? 0.5 : 1,
                }}
              >
                Next →
              </button>
            </div>

            {/* Done message for logged in users */}
            {user && cardIndex === cards.length - 1 && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <p style={{ fontSize: 14, color: '#00a79d', fontWeight: 600, marginBottom: 12 }}>✓ You've reviewed all {cards.length} cards!</p>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                  <button
                    onClick={handleShuffle}
                    style={{ fontSize: 13, color: '#0B1F33', background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Shuffle & restart
                  </button>
                  <button
                    onClick={() => setSelectedSection(null)}
                    style={{ fontSize: 13, color: '#0B1F33', background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Study another section
                  </button>
                </div>
              </div>
            )}

            {/* Non-logged in upgrade nudge */}
            {!user && (
              <div style={{ marginTop: 24, backgroundColor: 'rgba(0,167,157,0.06)', border: '1px solid rgba(0,167,157,0.15)', borderRadius: 10, padding: '14px 20px', textAlign: 'center' }}>
                <p style={{ fontSize: 13, color: '#0B1F33', marginBottom: 8 }}>
                  You're previewing {FREE_PREVIEW_COUNT} of {section?.cards.length} cards in this section.
                </p>
                <Link href="/signup" style={{ fontSize: 13, color: '#00a79d', fontWeight: 600, textDecoration: 'none' }}>
                  Create a free account to unlock all cards →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#64748B', fontSize: 14 }}>Loading...</p></div>}>
      <FlashcardsContent />
    </Suspense>
  )
}