import Link from 'next/link'
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
            <div style={{ width: 32, height: 32, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#0B1F33', fontSize: 12, fontWeight: 700, letterSpacing: '-0.5px' }}>SR</span>
            </div>
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px' }}>StrataReady</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">How it works</a>
            <a href="#topics" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Topics</a>
            <a href="#faq" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">FAQ</a>
            <a href="#pricing" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Pricing</a>
            <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, border: '1px solid rgba(247,249,252,0.2)', padding: '7px 16px', borderRadius: 6 }} className="hidden md:block hover:text-white transition-colors">Get started</Link>
            <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.01em' }} className="hover:opacity-90 transition-opacity">
              Free Diagnostic
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden', minHeight: 680, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.45 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,31,51,0.97) 35%, rgba(11,31,51,0.55) 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-24 relative" style={{ zIndex: 1, width: '100%' }}>
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#B08D57', borderRadius: '50%' }}></div>
              <span style={{ color: '#B08D57', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>BC Strata Management Exam Prep</span>
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 24 }}>
              Two attempts.<br />Make the first<br />one count.
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 12, maxWidth: 520 }}>
              Practice with realistic BC strata management licensing exam questions. Identify weak areas, study with source-cited explanations, and verify your readiness before writing the real exam.
            </p>
            <p style={{ fontSize: 15, color: 'rgba(247,249,252,0.4)', lineHeight: 1.6, marginBottom: 40, maxWidth: 520 }}>
              100 questions · 3 hours · 70% required to pass.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, letterSpacing: '-0.2px', whiteSpace: 'nowrap' }} className="hover:opacity-90 transition-opacity">
                Start Free Diagnostic Exam →
              </Link>
              <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }} className="hover:text-white transition-colors">
                How it works
              </a>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
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
              { value: '100', label: 'Multiple choice questions' },
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
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Exam</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', maxWidth: 640, marginBottom: 16 }}>
              What the BC Strata Management Licensing Exam Looks Like
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, maxWidth: 680 }}>
              The Strata Management Licensing Examination consists of 100 multiple-choice questions completed over three hours. A minimum score of 70% is required to pass. StrataReady helps you prepare under realistic exam conditions so you can assess your readiness before writing the official examination.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                num: '01',
                title: 'Practice under real exam conditions',
                desc: '100 multiple-choice questions across all exam topics, weighted to reflect the actual licensing examination. Timed. The same format as the BC Strata Management licensing examination — so there are no surprises on exam day.',
              },
              {
                num: '02',
                title: 'Receive your score instantly',
                desc: 'No waiting. Your score appears the moment you submit. Every wrong answer is shown alongside the correct answer and a clear explanation of why — including the specific legislation or course material that applies.',
              },
              {
                num: '03',
                title: 'Know exactly what to study',
                desc: 'A personalised skills map identifies your weak areas with direct links to the Strata Property Act, RESA, PIPA, and other authoritative sources so you can study the right material before your next attempt.',
              },
            ].map(item => (
              <div key={item.num}>
                <p style={{ fontSize: 42, fontWeight: 700, color: '#B08D57', letterSpacing: '-1px', marginBottom: 16, lineHeight: 1 }}>{item.num}</p>
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
              <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Why StrataReady</p>
              <h2 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 20 }}>
                Every Answer Includes a Source Citation
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
                Every explanation links back to the relevant course material, legislation, or reference source. Instead of simply showing the correct answer, StrataReady shows where the answer comes from and why it is correct.
              </p>
              <p style={{ fontSize: 15, color: 'rgba(247,249,252,0.5)', lineHeight: 1.7, marginBottom: 24 }}>Students can verify answers against:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-3">
                {[
                  'Strata Property Act and Regulation',
                  'Real Estate Services Act (RESA)',
                  'Personal Information Protection Act (PIPA)',
                  'BC Financial Services Authority regulatory guidance',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(247,249,252,0.75)' }}>
                    <div style={{ width: 4, height: 4, backgroundColor: '#B08D57', borderRadius: '50%', flexShrink: 0 }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#F7F9FC', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF5F5' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>QUESTION 47 — RESULT</span>
                <span style={{ fontSize: 12, backgroundColor: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>Incorrect</span>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.6, marginBottom: 16 }}>
                  Which of the following best describes the strata corporation&apos;s duty to repair and maintain common property under the <em>Strata Property Act</em>?
                </p>
                <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 6, padding: '10px 12px', marginBottom: 8 }}>
                  <p style={{ fontSize: 12, color: '#991B1B' }}><strong>Your answer (A):</strong> The strata corporation may delegate all repair responsibilities to individual owners by bylaw.</p>
                </div>
                <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #BBF7D0', borderRadius: 6, padding: '10px 12px', marginBottom: 14 }}>
                  <p style={{ fontSize: 12, color: '#166534' }}><strong>Correct answer (C):</strong> The strata corporation must repair and maintain common property and common assets.</p>
                </div>
                <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.65, marginBottom: 12 }}>
                  Option (A) is incorrect because bylaws cannot override the statutory duty to repair — the SPA imposes this obligation directly on the strata corporation. Option (B) confuses repair obligations with insurance obligations. Option (D) incorrectly limits the duty to structural elements only.
                </p>
                <div style={{ backgroundColor: '#F8F6F1', border: '1px solid #E8E0CE', borderLeft: '3px solid #B08D57', borderRadius: 6, padding: '12px 14px', marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Study note</p>
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

      {/* Topics coverage */}
      <section id="topics" className="py-24" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Curriculum</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 16 }}>
              Coverage Across All Major Licensing Topics
            </h2>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.7, maxWidth: 600 }}>
              Practice questions are organized across all subject areas tested in the BC Strata Management Licensing curriculum, weighted to reflect the actual exam emphasis.
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
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px' }}>Simple. No subscriptions.</h2>
            <p style={{ fontSize: 16, color: '#64748B', marginTop: 8 }}>Less than the cost of a single exam attempt. A fraction of the cost of failing one.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Free Diagnostic</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>See what StrataReady can do</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px', marginBottom: 24 }}>$0</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['5 sample questions', 'Instant score', 'Sample study references', 'No account required'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#B08D57', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Start diagnostic
              </Link>
            </div>

            <div style={{ border: '2px solid #0B1F33', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0B1F33', color: '#B08D57', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Per Exam</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Pay as you go</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$9.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>/ attempt</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['100 questions', 'Instant results', 'Full study guide', 'Source citations for every answer', 'Section performance breakdown'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#B08D57', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:opacity-90 transition-opacity">
                Get started
              </Link>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Full Prep Access</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Best value for serious prep</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$49.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>one-time</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['Unlimited exam attempts', 'Everything in Per Exam', 'Progress tracking over time', 'Score trend analysis', 'Exam readiness score'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#B08D57', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=unlimited" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Get full access
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</p>
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
                q: 'Is the Strata Management Licensing Exam difficult?',
                a: 'Many students find the breadth of material challenging. The exam covers legislation, governance, accounting, contracts, budgeting, agency law, and strata operations across 20+ subject areas. Candidates who take multiple timed practice exams consistently perform better than those who only read course materials.',
              },
              {
                q: 'How should I prepare for the exam?',
                a: 'The most effective preparation combines course study with repeated practice exams. Focus on high-weight areas like the Strata Property Act, governance, budgeting, and the CRF — these sections carry the most marks. Review every wrong answer and trace it back to the source legislation.',
              },
              {
                q: 'Are StrataReady questions based on BC legislation?',
                a: 'Yes. Every question is sourced from BC strata management licensing course materials and authoritative regulatory sources including the Strata Property Act, RESA, PIPA, and the Residential Tenancy Act. Every explanation includes a source citation.',
              },
              {
                q: 'Is StrataReady affiliated with UBC Sauder or the BCFSA?',
                a: 'No. StrataReady is an independent exam preparation tool. It is not affiliated with, endorsed by, or connected to UBC Sauder School of Business, the BC Financial Services Authority, or any other regulatory or educational body.',
              },
              {
                q: 'What is the difference between the Per Exam and Full Prep Access plans?',
                a: 'Per Exam ($9.99) gives you one full 100-question practice exam with complete results and source citations. Full Prep Access ($49.99 one-time) gives you unlimited attempts plus progress tracking, score trends, and an exam readiness score across all your attempts.',
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
            Ready to find out if you&apos;re exam ready?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.55)', marginBottom: 12, lineHeight: 1.8 }}>
            Take a free 5-question diagnostic based on the BC Strata Management Licensing curriculum.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 36, fontSize: 13, color: 'rgba(247,249,252,0.45)' }}>
            {['Timed exam environment', 'Detailed explanations', 'Source citations', 'Performance breakdown by topic'].map(f => (
              <span key={f}>✓ {f}</span>
            ))}
          </div>
          <Link href="/demo" style={{ display: 'inline-block', backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 8, letterSpacing: '-0.2px' }} className="hover:opacity-90 transition-opacity">
            Start Free Diagnostic Exam →
          </Link>
          <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #E2E8F0', backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, backgroundColor: '#0B1F33', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#B08D57', fontSize: 10, fontWeight: 700 }}>SR</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33' }}>StrataReady</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>
            BC Strata Management Licensing Exam Preparation · Not affiliated with the BC Financial Services Authority
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Terms</Link>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #E2E8F0', padding: '10px 0', textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: '#CBD5E1' }}>Photo by </span>
          <a href="https://unsplash.com/@victor_g" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#94A3B8' }}>Victor</a>
          <span style={{ fontSize: 11, color: '#CBD5E1' }}> on </span>
          <a href="https://unsplash.com/photos/JONURCNG7fQ" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: '#94A3B8' }}>Unsplash</a>
        </div>
      </footer>

    </main>
  )
}
