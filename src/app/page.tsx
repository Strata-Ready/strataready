import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F9FC', color: '#0B1F33' }}>

      {/* Nav */}
      <nav style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div style={{ width: 32, height: 32, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#0B1F33', fontSize: 12, fontWeight: 700, letterSpacing: '-0.5px' }}>SR</span>
            </div>
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px' }}>StrataReady</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">How it works</a>
            <a href="#citations" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Citations</a>
            <a href="#pricing" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hidden md:block hover:text-white transition-colors">Pricing</a>
            <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, letterSpacing: '0.01em' }} className="hover:opacity-90 transition-opacity">
              Free Diagnostic
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ backgroundColor: '#0B1F33' }} className="pb-0">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 32 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#B08D57', borderRadius: '50%' }}></div>
              <span style={{ color: '#B08D57', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>BC Strata Management Licensing</span>
            </div>
            <h1 style={{ fontSize: 56, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.05, letterSpacing: '-1.5px', marginBottom: 24 }}>
              Two attempts.<br />Make the first<br />one count.
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Practice exams built from the official UBC Sauder course materials. Every wrong answer comes with exact textbook page references and Act citations — so you know precisely what to study before you sit.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, letterSpacing: '-0.2px' }} className="hover:opacity-90 transition-opacity">
                Start Free Diagnostic Exam →
              </Link>
              <a href="#how-it-works" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1 }} className="hover:text-white transition-colors">
                View exam format
              </a>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.35)', fontSize: 13, marginTop: 16 }}>No account required · 10 questions · Instant results</p>
          </div>
        </div>

        {/* Exam UI mockup */}
        <div className="max-w-6xl mx-auto px-6 pb-0">
          <div style={{ backgroundColor: '#F7F9FC', borderRadius: '16px 16px 0 0', padding: '28px 32px', border: '1px solid rgba(0,0,0,0.08)', borderBottom: 'none', boxShadow: '0 -8px 40px rgba(0,0,0,0.3)' }}>

            {/* Exam header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>QUESTION 23 OF 105</span>
                <div style={{ height: 4, width: 200, backgroundColor: '#E2E8F0', borderRadius: 2 }}>
                  <div style={{ height: 4, width: '22%', backgroundColor: '#0B1F33', borderRadius: 2 }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#FEF3C7', padding: '6px 12px', borderRadius: 6 }}>
                <div style={{ width: 7, height: 7, backgroundColor: '#D97706', borderRadius: '50%' }}></div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>2:18:44 remaining</span>
              </div>
            </div>

            {/* Question */}
            <p style={{ fontSize: 15, color: '#0B1F33', lineHeight: 1.7, marginBottom: 24, maxWidth: 640 }}>
              A strata corporation has 42 strata lots. Under the <em>Strata Property Act</em>, what is the minimum number of council members required to constitute a quorum at a council meeting?
            </p>

            {/* Options */}
            <div style={{ display: 'grid', gap: 10, maxWidth: 640 }}>
              {[
                { label: 'A', text: 'Two council members, regardless of total council size', selected: false },
                { label: 'B', text: 'A majority of the council members then holding office', selected: true },
                { label: 'C', text: 'Three council members, or one-third of the council', selected: false },
                { label: 'D', text: 'All council members must be present to constitute a quorum', selected: false },
              ].map(opt => (
                <div key={opt.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px',
                  borderRadius: 8, border: `1.5px solid ${opt.selected ? '#0B1F33' : '#E2E8F0'}`,
                  backgroundColor: opt.selected ? 'rgba(11,31,51,0.04)' : 'white',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${opt.selected ? '#0B1F33' : '#CBD5E1'}`,
                    backgroundColor: opt.selected ? '#0B1F33' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {opt.selected && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'white' }}></div>}
                  </div>
                  <span style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.5 }}>
                    <strong style={{ color: '#0B1F33' }}>{opt.label}.</strong> {opt.text}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Exam format bar */}
      <section style={{ backgroundColor: '#F0F4F8', borderBottom: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: '100', label: 'Multiple choice questions' },
              { value: '3 hrs', label: 'Exam duration' },
              { value: '70%', label: 'Required to pass' },
              { value: '2', label: 'Attempts permitted' },
              { value: 'UBC', label: 'Sauder School of Business' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p style={{ fontSize: 20, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.5px' }}>{item.value}</p>
                <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Process</p>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', maxWidth: 480 }}>
              Verify your readiness before your first attempt.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: '01',
                title: 'Practice under real exam conditions',
                desc: '105 multiple choice questions. 21 course sections. Timed. The same format as the UBC Sauder licensing examination — no surprises on exam day.',
              },
              {
                num: '02',
                title: 'Receive your score instantly',
                desc: 'No waiting. Your score appears the moment you submit. Every wrong answer is shown alongside the correct answer and a full explanation of why.',
              },
              {
                num: '03',
                title: 'Know exactly what to study',
                desc: 'A personalised study plan identifies your weak areas with exact textbook page numbers and legislation references. Not "study more" — study this, on this page.',
              },
            ].map(item => (
              <div key={item.num}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', marginBottom: 16 }}>{item.num}</p>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0B1F33', letterSpacing: '-0.3px', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation section */}
      <section id="citations" style={{ backgroundColor: '#0B1F33' }} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Differentiator</p>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 20 }}>
                Every answer is traceable.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
                Every question in StrataReady is sourced directly from the official UBC Sauder course materials. When you get something wrong, you don&apos;t just see the correct answer — you see exactly where to find it.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-3">
                {[
                  'Textbook chapter and page number',
                  'Strata Property Act section reference',
                  'Real Estate Services Act citations',
                  'Regulation and bylaw references where applicable',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(247,249,252,0.75)' }}>
                    <div style={{ width: 4, height: 4, backgroundColor: '#B08D57', borderRadius: '50%', flexShrink: 0 }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Citation card */}
            <div style={{ backgroundColor: '#F7F9FC', borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.05em' }}>QUESTION 47 — RESULT</span>
                <span style={{ fontSize: 12, backgroundColor: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: 4, fontWeight: 500 }}>Incorrect</span>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: 13, color: '#2D3748', lineHeight: 1.6, marginBottom: 16 }}>
                  Which of the following best describes the strata corporation&apos;s duty to repair and maintain common property under the <em>Strata Property Act</em>?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  <div style={{ padding: '10px 14px', borderRadius: 6, backgroundColor: '#FEE2E2', border: '1.5px solid #FECACA', fontSize: 13, color: '#991B1B' }}>
                    <strong>Your answer (C):</strong> The duty applies only to structural elements
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: 6, backgroundColor: '#DCFCE7', border: '1.5px solid #BBF7D0', fontSize: 13, color: '#166534' }}>
                    <strong>Correct answer (A):</strong> The strata corporation must repair and maintain common property and common assets
                  </div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: 8, padding: '14px 16px', borderLeft: '3px solid #B08D57' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', marginBottom: 8 }}>SOURCE REFERENCES</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>BCSPA s.72</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>Strata Property Act — Repair and maintenance</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 12, backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: 4, color: '#0B1F33', fontWeight: 600 }}>Ch. 10 p.188</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>Applied Strata Management Practice</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px' }}>Simple. No subscriptions.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Free Diagnostic</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Verify the product works</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px', marginBottom: 24 }}>$0</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['10 questions','Instant score','Sample study references','No account required'].map(f => (
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
                {['105 questions','Instant results','Full study guide','Exact page & Act references','Section performance breakdown'].map(f => (
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
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Best value</p>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$49.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>one-time</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['Unlimited exam attempts','Everything in Per Exam','Progress tracking over time','Score trend analysis','Exam readiness score'].map(f => (
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

      {/* Final CTA */}
      <section style={{ backgroundColor: '#0B1F33' }} className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.8px', marginBottom: 16 }}>
            Know before you go.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.55)', marginBottom: 36, lineHeight: 1.7 }}>
            The UBC Sauder licensing exam gives you two attempts.<br />
            Most candidates who fail wish they had practised more deliberately.<br />
            StrataReady is the deliberate practice.
          </p>
          <Link href="/demo" style={{ display: 'inline-block', backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 8, letterSpacing: '-0.2px' }} className="hover:opacity-90 transition-opacity">
            Start Free Diagnostic Exam →
          </Link>
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
            BC Strata Management Licensing Exam Preparation · Not affiliated with UBC Sauder School of Business or BCFSA
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}