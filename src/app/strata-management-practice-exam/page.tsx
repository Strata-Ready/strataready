import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'Strata Management Practice Exam | StrataReady',
  description: 'Take a strata management practice exam built from BC legislation. 100 scenario-based questions, instant results, distractor explanations, and study notes on every missed answer.',
  keywords: ['strata management practice exam', 'BC strata exam practice', 'strata management exam practice questions', 'strata licensing practice test'],
  alternates: { canonical: '/strata-management-practice-exam' },
  openGraph: {
    title: 'Strata Management Practice Exam | StrataReady',
    description: 'Take a strata management practice exam built from BC legislation.',
    url: 'https://strataready.ca/strata-management-practice-exam',
  },
}

export default function StrataManagementPracticeExamPage() {
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
            <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, textDecoration: 'none' }}>
              Free Diagnostic
            </Link>
          </div>
        </div>
      </nav>

      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden', minHeight: 560, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,31,51,0.97) 35%, rgba(11,31,51,0.55) 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-20 relative" style={{ zIndex: 1, width: '100%' }}>
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#B08D57', borderRadius: '50%' }} />
              <span style={{ color: '#B08D57', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Practice Exam</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              A strata management practice exam that actually prepares you.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Most candidates who fail the BC Strata Management Licensing Exam didn't practice enough under real conditions. StrataReady simulates the real exam — 100 questions, 3 hours, instant results.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Try a Free Diagnostic →
              </Link>
              <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none', borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }}>
                See pricing
              </Link>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>No account required · 5 questions · Instant results</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#0B1F33', borderBottom: '1px solid rgba(247,249,252,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: '100', label: 'Questions per exam' },
              { value: '420', label: 'Total practice questions' },
              { value: '21', label: 'Subject areas covered' },
              { value: '70%', label: 'Passing score' },
              { value: '3 hrs', label: 'Timed exam session' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <p style={{ fontSize: 20, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-0.5px' }}>{item.value}</p>
                <p style={{ fontSize: 12, color: 'rgba(247,249,252,0.45)', marginTop: 2 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Why Practice Matters</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>Reading the material is not enough</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The BC Strata Management Licensing Exam doesn't test whether you've read the legislation — it tests whether you can apply it. Questions present realistic scenarios involving named characters, specific strata corporations, and real-world disputes. You need to identify the correct legal principle and know why the other options are wrong.</p>
            <p>Candidates who only study the material without doing practice exams consistently underperform on the real thing. They know the concepts in isolation but struggle to apply them under time pressure to scenario-based questions where multiple answers seem plausible.</p>
            <p>StrataReady is designed around this gap. Every practice exam presents 100 questions drawn from all 21 subject areas, weighted to reflect the actual exam emphasis — more questions from the Strata Act, Governance, Operating Budget, and CRF sections, which carry the most weight on the real exam.</p>
            <p>When you finish a practice exam, you don't just see your score. You see a full breakdown by section, a skills map showing your strengths and weaknesses across all 21 topics, and detailed explanations for every question — including why each wrong answer is wrong, and a study note explaining the underlying concept in plain language.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>What You Get</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Everything you need. Nothing you don&apos;t.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: '100-question timed exam', body: 'Identical format to the real BC Strata Management Licensing Exam. Three hours. One attempt at a time. Navigation between questions.' },
              { title: 'Weighted question selection', body: 'Questions are drawn from all 21 sections weighted to match the real exam emphasis. Strata Act, Governance, and CRF get more questions because the real exam does too.' },
              { title: 'Distractor explanations', body: 'Every wrong answer is explained. Not just "B is correct because..." — you see exactly why A, C, and D are wrong, and what concept each distractor is testing.' },
              { title: 'Study notes on missed questions', body: 'Plain-language explanations of the underlying concept behind every question you get wrong. No hunting through legislation. The key principle is right there.' },
              { title: 'Skills map', body: 'A radial chart showing your performance across all 21 subject areas. Green means you\'re solid. Red means you need work. It\'s immediately obvious where to focus.' },
              { title: 'Exam readiness meter', body: 'A composite score based on your average, trend, recency, and section coverage. Tells you honestly how ready you are — capped at 95% because there\'s always room to improve.' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '20px 22px' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0B1F33', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Start for $19.99</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Per Exam', price: '$19.99 CAD', desc: 'One full practice exam with instant results, distractor explanations, and source citations.', cta: 'Buy one exam' },
              { name: 'Full Prep Access', price: '$49.99 CAD', desc: 'Unlimited practice exams, skills map, readiness meter, and study notes. Best value for candidates who want to be sure.', cta: 'Get full access', highlight: true },
            ].map(plan => (
              <div key={plan.name} style={{ backgroundColor: plan.highlight ? '#0B1F33' : 'white', border: `1px solid ${plan.highlight ? 'transparent' : '#E2E8F0'}`, borderRadius: 12, padding: '28px 24px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? '#B08D57' : '#94A3B8', marginBottom: 8 }}>{plan.name}</p>
                <p style={{ fontSize: 28, fontWeight: 800, color: plan.highlight ? '#F7F9FC' : '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>{plan.price}</p>
                <p style={{ fontSize: 14, color: plan.highlight ? 'rgba(247,249,252,0.6)' : '#64748B', lineHeight: 1.6, marginBottom: 24 }}>{plan.desc}</p>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.highlight ? '#B08D57' : '#0B1F33', color: plan.highlight ? '#0B1F33' : '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, textDecoration: 'none' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="max-w-3xl mx-auto px-6 py-20 text-center relative" style={{ zIndex: 1 }}>
          <h2 style={{ fontSize: 40, fontWeight: 700, color: '#F7F9FC', letterSpacing: '-1px', marginBottom: 16 }}>Try before you buy</h2>
          <p style={{ fontSize: 16, color: 'rgba(247,249,252,0.6)', marginBottom: 32 }}>5 free diagnostic questions with instant results. No account required.</p>
          <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Start Free Diagnostic →
          </Link>
        </div>
      </section>

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
