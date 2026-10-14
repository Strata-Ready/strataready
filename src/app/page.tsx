import Link from 'next/link'
import Logo from '@/components/logo'
import FlashcardDemo from '@/components/flashcard-demo'
import SkillsMapDemo from '@/components/skills-map-demo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BC Strata Management Licensing Exam Prep | StrataReady',
  description: 'Practice for the BC Strata Management licensing exam with realistic scenario-based questions, instant results, and source-cited explanations. 100 questions. 3 hours. 70% to pass.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'BC Strata Management Licensing Exam Prep | StrataReady',
    description: 'Practice for the BC Strata Management licensing exam with realistic scenario-based questions, instant results, and source-cited explanations.',
    url: 'https://strataready.ca',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F9FC', color: '#0B1F33' }}>

      {/* Nav */}
      <nav style={{ backgroundColor: 'rgba(11,31,51,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px' }}>StrataReady</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">How it works</a>
            <a href="#topics" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Topics</a>
            <a href="#faq" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">FAQ</a>
            <Link href="/pricing" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, border: '1px solid rgba(247,249,252,0.2)', padding: '7px 16px', borderRadius: 6 }} className="hidden md:block hover:text-white transition-colors">Get started</Link>
            <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.01em' }} className="hover:opacity-90 transition-opacity">
              Free Diagnostic
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden', minHeight: 680, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.45 }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,31,51,0.97) 35%, rgba(11,31,51,0.55) 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-24 relative" style={{ zIndex: 1, width: '100%' }}>
          <span className="sr-only">StrataReady — BC strata building exterior. Practice your BC Strata Management licensing exam with 670+ scenario-based questions.</span>
            <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#00a79d', borderRadius: '50%' }}></div>
              <span style={{ color: '#00a79d', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>BC Strata Management Exam Prep</span>
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 24 }}>
              Pass the BC Strata Management<br />Licensing Exam with Confidence.
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 12, maxWidth: 520 }}>
              Practice with realistic licensing exams drawn from a 670+-question bank — every mock exam is a fresh 100 questions. Get instant feedback, legislation-backed explanations, and a clear understanding of what to study before exam day.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(247,249,252,0.4)', lineHeight: 1.6, marginBottom: 40, maxWidth: 520 }}>
              100 questions · 3 hours · 70% required to pass.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, letterSpacing: '-0.2px', whiteSpace: 'nowrap' }} className="hover:opacity-90 transition-opacity">
                Take Free Diagnostic Exam →
              </Link>
              <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }} className="hover:text-white transition-colors">
                How it works
              </a>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
          <p style={{ color: 'rgba(247,249,252,0.2)', fontSize: 10, marginTop: 32 }}>Photo by <a href="https://unsplash.com/@victor_g" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(247,249,252,0.2)' }}>Victor</a> on <a href="https://unsplash.com/photos/J0NURCNG7fQ" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(247,249,252,0.2)' }}>Unsplash</a></p>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 12, right: 16, zIndex: 2 }}>
          <a href="https://unsplash.com/photos/JONURCNG7fQ" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, color: 'rgba(247,249,252,0.2)', textDecoration: 'none' }}>Photo by Victor on Unsplash</a>
        </div>
      </section>

      {/* Exam format bar */}
      <section style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(247,249,252,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: '100', label: 'Questions per exam' },
              { value: '3 hrs', label: 'Exam duration' },
              { value: '70%', label: 'Required to pass' },
              { value: '2', label: 'Attempts permitted' },
              { value: 'BC', label: 'Licensing examination' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p style={{ fontSize: 20, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.5px' }}>{item.value}</p>
                <p style={{ fontSize: 12, color: 'rgba(247,249,252,0.45)', marginTop: 2 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the exam looks like */}
      <section id="how-it-works" className="py-24" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Exam</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', maxWidth: 640, marginBottom: 16 }}>
              Prepare for the Exam You'll Actually Write
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, maxWidth: 680 }}>
              Instead of simply studying the material, practise under the same conditions you&apos;ll face on exam day. Build confidence, identify weak areas, and know you&apos;re ready before you pay to write the real examination.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: '01',
                title: 'Practice under real exam conditions',
                desc: 'Complete a full 100-question practice exam designed to reflect the format, timing, and topic weighting of the BC Strata Management Licensing Examination. No surprises. No guesswork.',
              },
              {
                num: '02',
                title: 'Receive instant feedback',
                desc: 'The moment you finish, you&apos;ll see exactly how you performed. Every incorrect answer includes a detailed explanation, the correct answer, and references to the legislation that supports it.',
              },
              {
                num: '03',
                title: 'Know exactly what to study',
                desc: 'Instead of wondering what to review next, StrataReady identifies your weakest topics and directs you to the legislation and regulatory guidance that matters most.',
              },
            ].map(item => (
              <div key={item.num}>
                <p style={{ fontSize: 42, fontWeight: 700, color: '#00a79d', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1 }}>{item.num}</p>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0B1F33', letterSpacing: '-0.3px', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-0 pt-16" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/signup" style={{ backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
            Get started →
          </Link>
          <Link href="/demo" style={{ backgroundColor: 'transparent', color: '#64748B', fontSize: 14, padding: '12px 24px', borderRadius: 8, textDecoration: 'none', border: '1px solid #E2E8F0' }}>
            Try free diagnostic first
          </Link>
        </div>
      </section>

      {/* Why StrataReady / Citations */}
      <section id="citations" style={{ backgroundColor: '#0B1F33' }} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Why StrataReady</p>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 12 }}>
                Learn the Law—Not Just the Answers
              </h2>
              <p style={{ fontSize: 16, color: '#00a79d', fontWeight: 500, marginBottom: 16 }}>Every wrong answer explained in plain English, with the exact legislation cited.</p>
              <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', lineHeight: 1.7, marginBottom: 8 }}>
                Anyone can show you the correct answer.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.85)', fontWeight: 600, lineHeight: 1.7, marginBottom: 16 }}>
                StrataReady shows why it&apos;s correct.
              </p>
              <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
                Every explanation is backed by legislation or regulatory guidance, helping you build real understanding instead of memorizing practice questions.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(247,249,252,0.5)', lineHeight: 1.7, marginBottom: 24 }}>Every explanation links directly to authoritative BC sources, including:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-3">
                {[
                  'Strata Property Act and Regulation',
                  'Real Estate Services Act (RESA)',
                  'Personal Information Protection Act (PIPA)',
                  'BC Financial Services Authority regulatory guidance',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(247,249,252,0.75)' }}>
                    <div style={{ width: 4, height: 4, backgroundColor: '#00a79d', borderRadius: '50%', flexShrink: 0 }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: '#F7F9FC', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff0f0' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>QUESTION 47 — RESULT</span>
                <span style={{ fontSize: 12, backgroundColor: '#fce8e9', color: '#8f1e22', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>Incorrect</span>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.6, marginBottom: 16 }}>
                  Which of the following best describes the strata corporation&apos;s duty to repair and maintain common property under the <em>Strata Property Act</em>?
                </p>
                <div style={{ backgroundColor: '#fce8e9', border: '1px solid #f2b0b3', borderRadius: 6, padding: '10px 12px', marginBottom: 8 }}>
                  <p style={{ fontSize: 12, color: '#8f1e22' }}><strong>Your answer (A):</strong> The strata corporation may delegate all repair responsibilities to individual owners by bylaw.</p>
                </div>
                <div style={{ backgroundColor: '#e6f7f6', border: '1px solid #b3e8e5', borderRadius: 6, padding: '10px 12px', marginBottom: 14 }}>
                  <p style={{ fontSize: 12, color: '#007a72' }}><strong>Correct answer (C):</strong> The strata corporation must repair and maintain common property and common assets.</p>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65, marginBottom: 12 }}>
                  Option (A) is incorrect because bylaws cannot override the statutory duty to repair — the SPA imposes this obligation directly on the strata corporation. Option (B) confuses repair obligations with insurance obligations. Option (D) incorrectly limits the duty to structural elements only.
                </p>
                <div style={{ backgroundColor: '#F8F6F1', border: '1px solid #E8E0CE', borderLeft: '3px solid #00a79d', borderRadius: 6, padding: '12px 14px', marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Study note</p>
                  <p style={{ fontSize: 12, color: '#4A3728', lineHeight: 1.7 }}>
                    The duty to repair and maintain common property is one of the strata corporation&apos;s core non-delegable obligations. Unlike many other strata functions, this duty cannot be shifted to owners by bylaw — it runs with the corporation regardless of what the bylaws say.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 11, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>Strata Property Act, s.72</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Flashcard Feature */}
      <section className="py-24" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Flashcards</p>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>
                Study the concepts. Then test yourself.
              </h2>
              <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
                Flashcards cover all 21 exam sections — definitions, legal principles, voting thresholds, and key rules from the SPA, RESA, PIPA, and the Residential Tenancy Act. Study a section, then take a practice exam to see what stuck.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {[
                  '21 curriculum sections',
                  'Hundreds of flashcards',
                  'Updated for current legislation',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#475569', marginBottom: 10 }}>
                    <div style={{ width: 4, height: 4, backgroundColor: '#00a79d', borderRadius: '50%', flexShrink: 0 }}></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'inline-block', backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
                Get full access →
              </Link>
            </div>
            <FlashcardDemo />
          </div>
        </div>
      </section>

      {/* Skills Map Feature */}
      <section className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Learn From Every Attempt</p>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>
                Know exactly where to focus next.
              </h2>
              <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, marginBottom: 24 }}>
                After every practice exam, StrataReady updates a personalized skills map showing your score so you can see at a glance where your knowledge is strong and where you need to focus.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {[
                  'Colour-coded by performance — green, amber, and red at a glance',
                  'Click any section to open its flashcard study set',
                  'Linked directly to the Strata Property Act, RESA, PIPA, and the Residential Tenancy Act',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#475569', marginBottom: 12 }}>
                    <div style={{ width: 4, height: 4, backgroundColor: '#00a79d', borderRadius: '50%', flexShrink: 0, marginTop: 7 }}></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'inline-block', backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
                Get started →
              </Link>
            </div>

            <SkillsMapDemo />
          </div>
        </div>
      </section>

      {/* Topics coverage */}
      <section id="topics" className="py-24" style={{ backgroundColor: '#0B1F33' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Curriculum</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 16 }}>
              Complete Coverage of the Licensing Curriculum
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', lineHeight: 1.7, maxWidth: 600 }}>
              The licensing exam tests much more than the Strata Property Act. StrataReady covers every major subject area in the BC licensing curriculum — from governance and budgeting to insurance, contracts, privacy, accounting, and agency law — weighted to reflect the actual examination.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { title: 'Law & RESA', desc: 'Licensing framework & BCFSA' },
              { title: 'Ethics', desc: 'Professional conduct' },
              { title: 'Land & Title', desc: 'Estates, interests & registration' },
              { title: 'Liability', desc: 'Torts, negligence & occupier liability' },
              { title: 'Tenancies', desc: 'Residential & commercial' },
              { title: 'Contracts', desc: 'Strata management agreements' },
              { title: 'Agency', desc: 'Fiduciary duties & authority' },
              { title: 'Disputes', desc: 'CRT & alternative resolution' },
              { title: 'Strata Properties', desc: 'Condominiums & cooperatives' },
              { title: 'Strata Act', desc: 'SPA definitions & requirements' },
              { title: 'Sections', desc: 'Strata sections & operation' },
              { title: 'Governance', desc: 'Meetings, votes & bylaws' },
              { title: 'Privacy', desc: 'PIPA & personal information' },
              { title: 'Construction', desc: 'Building design & systems' },
              { title: 'Maintenance', desc: 'Controls & energy conservation' },
              { title: 'Risk & Insurance', desc: 'Strata & owner policies' },
              { title: 'Local Government', desc: 'Municipal law & zoning' },
              { title: 'Accounting', desc: 'Financial statements & records' },
              { title: 'Operating Budget', desc: 'Strata fees & unit entitlement' },
              { title: 'CRF & Depreciation', desc: 'Contingency reserve funding' },
              { title: 'Purchasing & Personnel', desc: 'Contracts & HR management' },
            ].map(topic => (
              <div key={topic.title} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: 10, padding: '14px 16px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 3 }}>{topic.title}</p>
                <p style={{ fontSize: 11, color: '#94A3B8' }}>{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px' }}>Simple Pricing. No Subscription Required.</h2>
            <p style={{ fontSize: 16, color: '#64748B', marginTop: 8 }}>Preparing properly costs far less than rewriting the licensing exam. Choose a single practice exam or unlock unlimited access until you&apos;re confident you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Free Diagnostic</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Find out how prepared you are in just a few minutes.</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px', marginBottom: 24 }}>$0</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['5 sample questions', 'Instant score', 'Sample study references', 'No account required'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Start diagnostic
              </Link>
            </div>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Per Exam</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>One complete licensing simulation.</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$19.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>/ attempt</span>
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Less than one exam re-booking fee</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['100 questions', 'Instant results', 'Full study guide', 'Source citations for every answer', 'Section performance breakdown'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Get started
              </Link>
            </div>
            <div style={{ border: '2px solid #0B1F33', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0B1F33', color: '#00a79d', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Full Prep Access</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Everything you need to prepare with confidence.</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$49.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>one-time</span>
                <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>A fraction of the cost of the licensing course</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['Unlimited practice exams', 'Flashcards', 'Progress tracking', 'Performance history', 'Exam readiness insights'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=unlimited" style={{ display: 'block', textAlign: 'center', backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:opacity-90 transition-opacity">
                Get full access
              </Link>
            </div>
          </div>
        </div>
      </section>


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How many questions are on the BC Strata Management Licensing Exam?", "acceptedAnswer": { "@type": "Answer", "text": "The exam contains 100 multiple-choice questions completed within three hours." } },
            { "@type": "Question", "name": "What mark do I need to pass?", "acceptedAnswer": { "@type": "Answer", "text": "Students must achieve a minimum score of 70% to pass the licensing examination." } },
            { "@type": "Question", "name": "How many attempts am I allowed?", "acceptedAnswer": { "@type": "Answer", "text": "Under the challenge process, candidates are permitted two attempts at the licensing examination." } },
            { "@type": "Question", "name": "How difficult is the BC Strata Management Licensing Exam?", "acceptedAnswer": { "@type": "Answer", "text": "The exam covers legislation, governance, budgeting, accounting, contracts, agency law, insurance, privacy, and strata operations. Many candidates find the breadth of material more challenging than the individual questions." } },
            { "@type": "Question", "name": "What is the best way to prepare?", "acceptedAnswer": { "@type": "Answer", "text": "Start by identifying your current knowledge with a practice exam. Review every explanation carefully, study the supporting legislation, then repeat the process until your scores are consistently above the passing mark." } },
            { "@type": "Question", "name": "Are StrataReady questions based on BC legislation?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Every question is sourced from authoritative BC regulatory sources including the Strata Property Act, RESA, PIPA, and the Residential Tenancy Act. Every explanation includes a source citation." } },
            { "@type": "Question", "name": "Is StrataReady affiliated with UBC Sauder or the BCFSA?", "acceptedAnswer": { "@type": "Answer", "text": "No. StrataReady is an independent exam preparation tool. It is not affiliated with, endorsed by, or connected to UBC Sauder School of Business, the BC Financial Services Authority, or any other regulatory or educational body." } },
            { "@type": "Question", "name": "What is the difference between the Per Exam and Full Prep Access plans?", "acceptedAnswer": { "@type": "Answer", "text": "Per Exam ($19.99) gives you one full 100-question practice exam with complete results and source citations. Full Prep Access ($49.99 one-time) gives you unlimited attempts plus progress tracking, score trends, and an exam readiness score across all your attempts." } },
            { "@type": "Question", "name": "Can I take a free practice exam before purchasing?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — the free diagnostic exam includes 5 questions with instant results and source references. No account required." } },
            { "@type": "Question", "name": "Is there a refund policy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If StrataReady isn't right for you, email us at support@strataready.ca within 7 days of purchase for a full refund — no questions asked." } },
          ]
        }) }}
      />
      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px' }}>Common Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                q: 'How many questions are on the BC Strata Management Licensing Exam?',
                a: 'The exam contains 100 multiple-choice questions completed within three hours.',
              },
              {
                q: 'What mark do I need to pass?',
                a: 'Students must achieve a minimum score of 70% to pass the licensing examination.',
              },
              {
                q: 'How many attempts am I allowed?',
                a: 'Under the challenge process, candidates are permitted two attempts at the licensing examination. This is why preparation matters — there is limited room for error.',
              },
              {
                q: 'How difficult is the BC Strata Management Licensing Exam?',
                a: 'The exam covers legislation, governance, budgeting, accounting, contracts, agency law, insurance, privacy, and strata operations. Many candidates find the breadth of material more challenging than the individual questions. The best preparation is repeated practice under timed conditions followed by careful review of every incorrect answer.',
              },
              {
                q: 'What is the best way to prepare?',
                a: 'Start by identifying your current knowledge with a practice exam. Review every explanation carefully, study the supporting legislation, then repeat the process until your scores are consistently above the passing mark. The goal isn’t simply to answer questions correctly — it’s to understand why the correct answer is correct.',
              },
              {
                q: 'Are StrataReady questions based on BC legislation?',
                a: 'Yes. Every question is sourced from authoritative BC regulatory sources including the Strata Property Act, RESA, PIPA, and the Residential Tenancy Act. Every explanation includes a source citation.',
              },
              {
                q: 'Is StrataReady affiliated with UBC Sauder or the BCFSA?',
                a: 'No. StrataReady is an independent exam preparation tool. It is not affiliated with, endorsed by, or connected to UBC Sauder School of Business, the BC Financial Services Authority, or any other regulatory or educational body.',
              },
              {
                q: 'What is the difference between the Per Exam and Full Prep Access plans?',
                a: 'Per Exam ($19.99) gives you one full 100-question practice exam with complete results and source citations. Full Prep Access ($49.99 one-time) gives you unlimited attempts plus progress tracking, score trends, and an exam readiness score across all your attempts.',
              },
              {
                q: 'Can I take a free practice exam before purchasing?',
                a: 'Yes — the free diagnostic exam includes 5 questions with instant results and source references. No account required.',
              },

            ].map((item, i, arr) => (
              <div key={item.q} style={{ borderTop: '1px solid #E2E8F0', padding: '24px 0', borderBottom: i === arr.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0B1F33', marginBottom: 10, lineHeight: 1.5 }}>{item.q}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.75 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: '#0B1F33', position: 'relative', overflow: 'hidden' }} className="py-20">
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative" style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 16 }}>
            Know You're Ready Before Exam Day
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.55)', marginBottom: 12, lineHeight: 1.8 }}>
            Walk into the licensing examination knowing what to expect — not hoping you've studied enough. Take a free five-question diagnostic exam and see where you stand in just a few minutes.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 36, fontSize: 13, color: 'rgba(247,249,252,0.45)' }}>
            {['Timed experience', 'Instant results', 'Detailed explanations', 'Topic-by-topic feedback'].map(f => (
              <span key={f}>✓ {f}</span>
            ))}
          </div>
          <Link href="/demo" style={{ display: 'inline-block', backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 8, letterSpacing: '-0.2px' }} className="hover:opacity-90 transition-opacity">
            Start Free Diagnostic Exam →
          </Link>
          <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E2E8F0', backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={24} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33' }}>StrataReady</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>
            © 2026 Trickfilm Entertainment Inc. StrataReady.ca is a product of Trickfilm.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="flex gap-6">
              <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Privacy</Link>
              <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Terms</Link>
            </div>
            <div style={{ width: 1, height: 14, backgroundColor: '#E2E8F0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Powered by</span>
              <a href="https://trickfilm.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center' }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 207.69" style={{height:18,display:'block',opacity:0.75}}><path fill="#0B1F33" d="M209.45,75.05c-7.39-22.73-27.33-37.87-49.65-40.23C150.66,14.3,130.09,0,106.17,0s-44.49,14.3-53.63,34.82c-22.32,2.37-42.27,17.5-49.65,40.23-7.39,22.73-.15,46.7,16.53,61.74-4.66,21.97,3.57,45.64,22.92,59.69,19.34,14.05,44.38,14.57,63.84,3.36,19.46,11.22,44.5,10.7,63.84-3.36,19.35-14.05,27.58-37.72,22.92-59.69,16.67-15.04,23.91-39.01,16.53-61.74ZM157.52,63.99c0,10.31-3.04,19.92-8.28,27.96-10.41-2.5-21.46-2.16-31.87,1.23,0-10.94-3.08-21.54-8.67-30.66,6.03-7.47,14.23-13.33,24.04-16.52,6.86-2.23,13.85-2.93,20.61-2.3,2.68,6.23,4.17,13.09,4.17,20.3ZM58.99,43.69c6.75-.63,13.74.08,20.61,2.3,9.81,3.19,18.01,9.05,24.04,16.52-5.59,9.12-8.67,19.72-8.67,30.66-10.42-3.39-21.46-3.73-31.87-1.23-5.23-8.05-8.28-17.65-8.28-27.96,0-7.21,1.49-14.07,4.17-20.3ZM115.54,107.71c1.83,1.76,3.51,3.62,5.03,5.59-2.38.7-4.84,1.22-7.35,1.57.46-1.16.89-2.34,1.28-3.54.39-1.2.74-2.41,1.04-3.61ZM112.55,110.69c-.49,1.52-1.05,3-1.67,4.44-1.55.14-3.12.22-4.71.22s-3.16-.08-4.71-.22c-.62-1.44-1.18-2.92-1.67-4.44-.49-1.52-.91-3.04-1.25-4.57,1.17-1.03,2.4-2.01,3.69-2.94,1.29-.94,2.61-1.8,3.95-2.6,1.34.8,2.66,1.67,3.95,2.6,1.29.93,2.51,1.92,3.69,2.94-.35,1.53-.76,3.05-1.25,4.57ZM109.91,117.26c-1.1,2.27-2.35,4.43-3.74,6.47-1.39-2.04-2.64-4.2-3.74-6.47,1.24.08,2.48.12,3.74.12s2.5-.04,3.74-.12ZM97.85,111.32c.39,1.2.82,2.38,1.28,3.54-2.51-.34-4.97-.87-7.35-1.56,1.52-1.96,3.2-3.83,5.03-5.59.31,1.21.65,2.41,1.04,3.61ZM98.07,103.82c-.45-2.49-.7-4.97-.78-7.45,2.33.84,4.61,1.85,6.84,3.04-1.05.66-2.09,1.37-3.11,2.11-1.02.74-2,1.51-2.95,2.29ZM111.32,101.53c-1.02-.74-2.06-1.44-3.11-2.11,2.23-1.19,4.51-2.21,6.84-3.04-.08,2.47-.33,4.96-.78,7.45-.96-.79-1.94-1.56-2.95-2.29ZM106.17,98.18c-2.88-1.67-5.86-3.07-8.9-4.2.17-10.11,3.33-19.85,8.9-28.04,5.57,8.19,8.74,17.93,8.9,28.04-3.04,1.13-6.02,2.53-8.9,4.2ZM95.02,95.62c.14,3.24.54,6.51,1.24,9.76-2.49,2.23-4.74,4.64-6.76,7.19-9.57-3.28-17.86-9.31-23.93-17.15,9.52-2.77,19.78-2.77,29.45.2ZM88.02,114.52c-6.43,8.85-10.17,19.24-11.01,29.9-9.27,2.49-19.34,2.42-29.15-.77-6.86-2.23-12.93-5.77-18.02-10.24,1.49-6.61,4.32-13.04,8.56-18.87,6.06-8.34,14.17-14.32,23.13-17.76,6.95,8.14,16.08,14.35,26.5,17.74ZM90.35,115.22c3.14.88,6.38,1.5,9.7,1.84,1.35,3.04,2.93,5.91,4.73,8.61-6.08,8.09-14.37,14.11-23.7,17.47.31-9.9,3.47-19.65,9.28-27.92ZM106.17,127.68c6.43,8.86,15.16,15.63,25.05,19.73-.49,9.59-3.68,19.15-9.74,27.5-4.24,5.83-9.48,10.51-15.31,13.97-5.83-3.46-11.07-8.14-15.31-13.97-6.06-8.35-9.25-17.91-9.74-27.5,9.89-4.1,18.62-10.87,25.05-19.73ZM107.56,125.67c1.79-2.7,3.38-5.57,4.73-8.61,3.32-.35,6.56-.97,9.7-1.84,5.81,8.27,8.97,18.02,9.28,27.92-9.33-3.36-17.63-9.38-23.7-17.47ZM124.32,114.52c10.41-3.38,19.55-9.6,26.5-17.74,8.96,3.43,17.07,9.41,23.13,17.76,4.24,5.83,7.07,12.26,8.56,18.87-5.09,4.48-11.16,8.02-18.02,10.25-9.81,3.19-19.88,3.26-29.15.77-.84-10.66-4.58-21.05-11.01-29.9ZM122.85,112.57c-2.02-2.55-4.28-4.96-6.76-7.19.7-3.26,1.1-6.52,1.24-9.76,9.67-2.97,19.93-2.97,29.45-.2-6.07,7.83-14.36,13.87-23.93,17.15ZM106.17,12.63c17.49,0,32.94,8.75,42.21,22.1-4.29.39-8.6,1.26-12.86,2.65-12.27,3.99-22.32,11.63-29.35,21.33-7.03-9.7-17.08-17.35-29.35-21.33-4.27-1.39-8.58-2.26-12.86-2.65,9.27-13.36,24.72-22.1,42.21-22.1ZM14.9,78.96c5.4-16.62,18.48-28.6,34.03-33.3-.95,4.19-1.45,8.55-1.45,13.03,0,12.89,4.16,24.82,11.21,34.5-11.39,3.69-21.77,10.89-29.34,21.32-2.63,3.62-4.79,7.45-6.48,11.4-9.83-12.94-13.37-30.32-7.97-46.95ZM49.76,186.26c-14.15-10.28-21.5-26.44-21.16-42.69,3.7,2.2,7.69,4.03,11.96,5.42,12.26,3.98,24.88,3.71,36.27,0-.01,11.98,3.63,24.08,11.21,34.51,2.63,3.63,5.61,6.86,8.84,9.7-15.35,5.35-32.98,3.34-47.13-6.93ZM162.59,186.26c-14.15,10.28-31.78,12.28-47.12,6.93,3.23-2.83,6.21-6.07,8.84-9.7,7.58-10.43,11.22-22.53,11.21-34.51,11.39,3.71,24.01,3.99,36.27,0,4.26-1.39,8.26-3.22,11.96-5.42.35,16.25-7.01,32.41-21.16,42.69ZM182.99,114.51c-7.58-10.43-17.95-17.63-29.34-21.32,7.05-9.68,11.21-21.61,11.21-34.5,0-4.48-.5-8.84-1.45-13.03,15.56,4.7,28.63,16.68,34.04,33.3,5.4,16.63,1.86,34.01-7.97,46.95-1.69-3.95-3.85-7.77-6.48-11.4Z"/><path fill="#0B1F33" d="M380.87,86.97c8.63,0,19.1-5.36,19.1-14.13,0-6.15-7.59-10.33-15.83-10.33-11.25,0-19.49,7.06-19.49,13.6,0,7.98,9.55,10.86,16.22,10.86ZM670.58,86.97c8.63,0,19.1-5.36,19.1-14.13,0-6.15-7.59-10.33-15.83-10.33-11.25,0-19.49,7.06-19.49,13.6,0,7.98,9.55,10.86,16.22,10.86ZM893.33,130.92s-4.58,17.53-14.65,17.53c-1.96,0-4.84-.39-4.84-3.92,0-7.19,3.53-18.57,3.53-29.04,0-9.16-5.76-19.88-19.1-19.88s-21.58,9.16-25.5,14.26h-1.18c-1.44-6.02-6.54-14.26-18.44-14.26-13.87,0-21.84,7.72-25.9,12.82h-1.18c0-5.89-1.7-12.82-10.46-12.82s-15.83,1.44-21.58,4.45c0,0-3.02,21.07-3.93,35.66-2.09,5.19-6.44,12.73-13.99,12.73-4.71,0-6.15-6.02-6.15-12.95,0-7.59,1.7-16.22,2.48-18.57,5.36-8.5,11.77-21.84,11.77-34.66,0-10.07-4.32-18.44-13.87-18.44-28.51,0-33.35,37.28-33.35,60.56,0,5.03.43,10.44,1.55,15.64-2.97,4.27-7.54,8.42-14.1,8.42-4.58,0-5.89-1.18-5.89-5.1,0-7.59,6.41-21.06,6.41-32.31,0-7.59-3.53-15.44-15.17-15.44-12.82,0-18.31,3.4-20.4,4.32-.13,14.13-18.18,18.18-29.82,23.15l-1.18-8.24c12.69-8.89,19.49-22.63,19.49-34.01s-6.8-20.8-21.19-20.8c-22.24,0-36.23,20.01-36.23,57.29,0,10.46.39,21.97.39,21.97-4.57,2.58-8.63,5.48-12.19,8.58-4.46-8.88-10.91-16.17-24.17-16.17,17.79-9.68,25.51-20.01,25.51-26.94,0-5.36-4.32-8.76-12.03-8.76s-22.11,1.96-35.97,16.61h-1.05c4.05-15.04,6.28-24.59,6.28-35.05,0-8.11-6.02-13.47-14.78-13.47s-15.96,1.7-21.71,4.58c-1.14,16.36-4.24,48.29-5.04,67.63-7.17,9.19-15.25,12.02-25.69,12.02-13.08,0-22.63-7.59-22.63-20.01,0-7.59,4.58-15.3,11.12-15.3,0,0-.39,1.83-.39,4.18,0,4.97,1.83,12.3,13.08,12.3,8.63,0,13.6-6.41,13.6-15.04,0-10.6-6.8-18.84-26.29-18.84-23.54,0-39.76,15.7-39.76,40.03,0,.6.02,1.22.06,1.84-2.31,4.98-6.32,10.98-12.22,10.98-3.53,0-4.84-1.18-4.84-5.1,0-7.59,6.41-21.06,6.41-32.31,0-7.59-3.53-15.44-15.17-15.44-12.82,0-18.31,3.4-20.4,4.32,0,0-3.18,20.06-3.99,35.08-.94,1.69-1.96,3.27-3.07,4.68-3.53,4.58-8.63,8.76-15.3,8.76-4.58,0-5.76-1.44-5.76-3.92,0-8.11,10.99-22.76,10.99-28.78s-3.14-8.11-7.72-8.11c-7.33,0-14.13,6.28-19.1,6.28-3.14,0-3.92-1.18-3.92-3.14,0-3.01,1.96-7.46,1.96-12.56,0-4.18-1.05-10.07-8.5-10.07-13.73,0-26.03,14.78-26.03,30.87,0,5.36.78,11.25,3.27,15.56-8.24,11.51-18.18,18.97-26.68,18.97-6.15,0-8.37-5.62-8.37-13.08,0-8.24,2.62-18.7,5.36-25.9,11.51,0,22.37-3.79,22.37-13.34,0-5.1-5.76-9.16-15.3-9.16h-1.31c.39-2.22,1.05-3.27,1.05-7.46,0-8.37-4.19-15.43-13.47-15.43-16.09,0-24.07,13.34-28.25,29.04-9.29,3.53-13.08,7.98-13.08,11.12,0,3.79,4.06,6.8,10.2,7.46-.92,5.75-2.09,14.65-2.09,23.67,0,17.13,4.71,33.35,27.21,33.35,24.07,0,40.42-11.12,52.97-32.96,2.09.13,3.79.26,6.28-.26-1.57,3.14-2.75,7.45-2.75,13.6,0,9.16,4.97,16.61,20.8,16.61s30.67-9.62,39.28-19.65c2.51,8.86,8.96,13.76,20.1,13.76,17.36,0,27.37-6.82,32.75-14.24,4.97,9.06,15.71,16.73,36.7,16.73,15.78,0,28.95-6.6,37.24-14.56,1.66,6.91,6.1,12.21,16.78,12.21,10.07,0,18.97-2.75,18.97-2.75-2.75-4.32-3.92-10.99-4.05-16.61l2.75-1.7c14.09,3.13,9.92,27.29,29.75,34.24-.21,1.52-.32,3.01-.32,4.48,0,13.87,9.68,24.98,29.69,24.98,34.14,0,41.73-24.98,41.73-50.88,0-6.8-.52-13.73-1.18-20.27,7.19-3.53,17.4-5.62,25.64-8.76-.65,5.89-.92,11.77-.92,16.22,0,15.04,6.54,23.68,21.32,23.68,18.01,0,29.55-7.71,36.13-15.88,4.31,8.16,11.55,14.05,23.25,14.05s20.2-5.28,25.31-11.71c1.89,5.95,6.28,10.66,16.28,10.66,10.86,0,18.57-2.75,18.57-2.75-1.83-2.62-2.88-8.5-2.88-15.17,0-11.9,2.62-25.77,10.86-25.77,3.14,0,4.19,1.7,4.19,6.15,0,5.76-2.88,15.44-2.88,24.85,0,9.94,5.62,12.69,17.27,12.69,10.73,0,18.44-2.75,18.44-2.75-1.83-2.62-2.88-8.5-2.88-15.17,0-11.9,2.62-25.77,10.86-25.77,3.14,0,4.19,1.7,4.19,6.15,0,5.76-2.88,15.57-2.88,24.98,0,7.98,4.06,15.44,17.92,15.44,34.4,0,41.73-22.5,41.73-31.91,0-2.09-1.18-4.84-6.67-4.84ZM519.77,132.22h-2.22c1.83-10.33,13.21-16.87,19.49-16.87,1.31,0,1.57.52,1.57,1.18,0,7.19-13.34,13.6-18.84,15.7ZM581.04,173.71c-.21,1.45-.49,2.9-.85,4.29-1.34,5.2-3.8,9.55-8.36,9.55s-6.41-3.01-6.41-7.32c0-.06,0-.13,0-.19.07-5.73,3.41-13.53,8.66-19.36,2.18-2.42,4.68-4.51,7.42-5.96.13,2.22.26,4.58.26,7.06,0,2.13,0,6.99-.73,11.92ZM617.48,100.18h-1.18c-.26-2.09-.39-4.45-.39-6.8,0-8.76,1.83-18.7,6.02-18.7,2.88,0,4.06,1.7,4.06,4.97,0,6.54-5.36,17.92-8.5,20.54Z"/></svg></a>
            </div>
          </div>
        </div>

          <span style={{ fontSize: 11, color: '#CBD5E1' }}>Photo by </span>
          <a href="https://unsplash.com/@victor_g" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#94A3B8' }}>Victor</a>
          <span style={{ fontSize: 11, color: '#CBD5E1' }}> on </span>
          <a href="https://unsplash.com/photos/JONURCNG7fQ" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#94A3B8' }}>Unsplash</a>
        </div>
      </footer>

    </main>
  )
}
