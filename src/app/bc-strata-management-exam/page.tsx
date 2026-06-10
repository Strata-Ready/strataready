import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'BC Strata Management Exam — Prep & Practice | StrataReady',
  description: 'Prepare for the BC Strata Management licensing exam with 420 scenario-based practice questions, instant results, and legislation-cited explanations. Two attempts. Make the first one count.',
  keywords: ['BC strata management exam', 'strata management licensing exam BC', 'BCFSA strata exam', 'strata management exam prep'],
  alternates: { canonical: '/bc-strata-management-exam' },
  openGraph: {
    title: 'BC Strata Management Exam — Prep & Practice | StrataReady',
    description: 'Prepare for the BC Strata Management licensing exam with 420 scenario-based practice questions.',
    url: 'https://strataready.ca/bc-strata-management-exam',
  },
}

export default function BCStrataManagementExamPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F9FC', color: '#0B1F33' }}>

      <nav style={{ backgroundColor: 'rgba(11,31,51,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={32} />
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px' }}>StrataReady</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none' }}>Sign in</Link>
            <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, textDecoration: 'none' }}>
              Free Diagnostic
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden', minHeight: 560, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,31,51,0.97) 35%, rgba(11,31,51,0.55) 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-20 relative" style={{ zIndex: 1, width: '100%' }}>
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#00a79d', borderRadius: '50%' }} />
              <span style={{ color: '#00a79d', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>BC Strata Management Exam</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              The BC Strata Management Exam is tough.<br />StrataReady prepares you for it.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              420 scenario-based practice questions built from the actual BC legislation. Instant results. Source citations on every explanation. Know before you go.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Start Free Diagnostic →
              </Link>
              <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none', borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }}>
                View pricing
              </Link>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
          </div>
        </div>
      </section>

      {/* Exam stats bar */}
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

      {/* About the exam */}
      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>About the Exam</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>What is the BC Strata Management Licensing Exam?</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The BC Strata Management Licensing Exam is required for anyone who wants to work as a licensed strata manager in British Columbia. It is administered by the BC Financial Services Authority (BCFSA) and tests candidates on their knowledge of BC strata legislation, governance, financial management, and professional obligations under RESA.</p>
            <p>The exam consists of 100 multiple choice questions and candidates have three hours to complete it. A score of 70% or higher is required to pass. Candidates are permitted two attempts. If both attempts are unsuccessful, additional coursework is required before re-applying.</p>
            <p>The exam covers 20+ subject areas drawn directly from BC legislation including the Strata Property Act, the Real Estate Services Act, PIPA, and the Residential Tenancy Act. Questions are scenario-based — they present real-world situations and ask candidates to identify the correct course of action or legal principle.</p>
            <p>Most candidates find the breadth of the material challenging. The exam is not designed to test memorization — it tests the ability to apply legislation to practical situations. This is exactly why practice exams are so valuable.</p>
          </div>
        </div>
      </section>

      {/* What StrataReady covers */}
      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>What We Cover</p>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>420 questions across every exam topic</h2>
            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>StrataReady covers all subject areas tested on the BC Strata Management Licensing Exam. Every question is sourced from authoritative BC legislation and weighted to reflect the actual exam emphasis.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              'Law & RESA', 'Ethics', 'Land & Title', 'Liability', 'Tenancies', 'Contracts',
              'Agency', 'Disputes', 'Strata Properties', 'Strata Act', 'Sections', 'Governance',
              'Privacy', 'Construction', 'Maintenance', 'Risk & Insurance', 'Local Government',
              'Accounting', 'Operating Budget', 'CRF & Depreciation', 'Purchasing & Personnel',
            ].map(topic => (
              <div key={topic} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#0B1F33', fontWeight: 500 }}>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How StrataReady works */}
      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>How It Works</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>More than a practice test</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { title: 'Realistic scenario-based questions', body: 'Every question presents a real-world strata management situation. You\'re not memorizing definitions — you\'re applying legislation to practical problems, exactly as the real exam requires.' },
              { title: 'Instant results with full explanations', body: 'The moment you submit, you see your score broken down by section. Every wrong answer shows you the correct answer, explains why each option is right or wrong, and cites the specific section of BC legislation.' },
              { title: 'Study notes on every missed question', body: 'For every incorrect answer, StrataReady generates a plain-language study note explaining the underlying concept. No hunting through legislation — the key principle is explained right there.' },
              { title: 'Skills map and readiness meter', body: 'Your dashboard tracks performance across all 21 subject areas, showing where you\'re strong and where you need work. The exam readiness meter gives you an honest assessment of how prepared you are.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#0B1F33', color: '#00a79d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: '#0B1F33', marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>Simple, affordable pricing</h2>
          <p style={{ fontSize: 16, color: '#475569', marginBottom: 40 }}>One exam or unlimited access — your choice.</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              { name: 'Per Exam', price: '$19.99', desc: 'One full 100-question exam attempt with instant results, full explanations, and source citations.', cta: 'Get started' },
              { name: 'Full Prep Access', price: '$49.99', desc: 'Unlimited exam attempts, progress tracking, skills map, readiness meter, and study notes on every missed question.', cta: 'Get full access', highlight: true },
            ].map(plan => (
              <div key={plan.name} style={{ backgroundColor: plan.highlight ? '#0B1F33' : '#F8FAFC', border: `1px solid ${plan.highlight ? 'transparent' : '#E2E8F0'}`, borderRadius: 12, padding: '28px 24px', textAlign: 'left' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? '#00a79d' : '#94A3B8', marginBottom: 8 }}>{plan.name}</p>
                <p style={{ fontSize: 32, fontWeight: 800, color: plan.highlight ? '#F7F9FC' : '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>{plan.price} <span style={{ fontSize: 14, fontWeight: 400 }}>CAD</span></p>
                <p style={{ fontSize: 14, color: plan.highlight ? 'rgba(247,249,252,0.6)' : '#64748B', lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.highlight ? '#00a79d' : '#0B1F33', color: plan.highlight ? '#ffffff' : '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, textDecoration: 'none' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center relative" style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-1px', marginBottom: 16 }}>Start with a free diagnostic</h2>
          <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', marginBottom: 32 }}>5 questions. No account required. Instant results with full explanations.</p>
          <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Start Free Diagnostic Exam →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#F1F5F9', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={24} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0B1F33' }}>StrataReady</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>BC Strata Management Licensing Exam Preparation · Not affiliated with the BC Financial Services Authority</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
