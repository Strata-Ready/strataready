import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'Strata Management Exam Questions | StrataReady',
  description: '420 strata management exam questions built from BC legislation. Scenario-based, fully explained, with source citations and study notes. Prep for the BC licensing exam.',
  keywords: ['strata management exam questions', 'BC strata exam questions', 'strata management practice questions', 'strata property act questions'],
  alternates: { canonical: '/strata-management-exam-questions' },
  openGraph: {
    title: 'Strata Management Exam Questions | StrataReady',
    description: '420 strata management exam questions built from BC legislation.',
    url: 'https://strataready.ca/strata-management-exam-questions',
  },
}

export default function StrataManagementExamQuestionsPage() {
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
              <span style={{ color: '#B08D57', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Exam Questions</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              420 strata management exam questions. Every answer explained.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Scenario-based questions drawn from BC legislation, delivered in timed 100-question exams. Not just right answers — full distractor explanations and study notes on every question you miss.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#B08D57', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Try 5 Free Questions →
              </Link>
              <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none', borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }}>
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Questions</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>What makes a good exam question?</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The BC Strata Management Licensing Exam uses scenario-based questions — not definitions, not fill-in-the-blank, not true/false. Every question presents a real situation involving named characters, a specific strata corporation, and a problem that needs to be solved using BC legislation.</p>
            <p>This means the questions on StrataReady look like this: "Sarah is a strata manager at Lakeview Strata Corporation. The council wants to pass a bylaw restricting short-term rentals. Under the Strata Property Act, which of the following statements about this bylaw is TRUE?" — followed by four plausible options, only one of which is correct.</p>
            <p>The wrong answers aren't obviously wrong. They're designed to catch candidates who partially understand the legislation but haven't studied it carefully enough. Each distractor exploits a common misconception — a wrong vote threshold, a reversed rule, a right answer in the wrong context.</p>
            <p>StrataReady's 420 questions were built from current BC legislation — the Strata Property Act, the Strata Property Regulation, RESA, the Real Estate Services Rules, PIPA, and the Residential Tenancy Act — and updated to reflect amendments through 2024 including the removal of rental restriction bylaws, the new 5-year depreciation report cycle, and the 10% minimum CRF contribution requirement.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Topic Coverage</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>20 questions per section. 21 sections.</h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, marginBottom: 32 }}>StrataReady has 20 active questions for each of the 21 exam subject areas. Each practice exam draws from all sections, weighted to reflect the real exam.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { section: 'Law & RESA', weight: 'High weight' },
              { section: 'Strata Act', weight: 'Highest weight' },
              { section: 'Governance', weight: 'High weight' },
              { section: 'Operating Budget', weight: 'High weight' },
              { section: 'CRF & Depreciation', weight: 'High weight' },
              { section: 'Contracts & Agency', weight: 'Medium weight' },
              { section: 'Liability & Insurance', weight: 'Medium weight' },
              { section: 'Privacy (PIPA)', weight: 'Medium weight' },
              { section: 'Tenancies', weight: 'Standard weight' },
              { section: 'Construction & Maintenance', weight: 'Standard weight' },
              { section: 'Disputes', weight: 'Standard weight' },
              { section: 'Ethics', weight: 'Standard weight' },
            ].map(item => (
              <div key={item.section} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '12px 16px' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#0B1F33' }}>{item.section}</span>
                <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>{item.weight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>After the Exam</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>Results that actually help you improve</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The moment you submit your practice exam, you get a full breakdown. Your score, the pass threshold, and how you performed in each of the 21 sections. A section summary shows every area sorted from weakest to strongest.</p>
            <p>The question review tab shows every question you got wrong. For each one: your answer, the correct answer, a detailed distractor explanation (why each option is right or wrong), and a study note that explains the underlying concept in plain language.</p>
            <p>Source citations are included on every question — the specific Act, section, and regulation the question is drawn from. If you want to go deeper, you know exactly where to look in the legislation.</p>
            <p>Over time, your dashboard builds a picture of your readiness. The skills map shows your performance in each section across all your exams. The readiness meter gives you a composite score based on your average, your recent trend, your core section performance, and how many exams you've taken.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Start with a free diagnostic</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Per Exam', price: '$19.99 CAD', desc: 'One full 100-question exam with instant results and full explanations.', cta: 'Buy one exam' },
              { name: 'Full Prep Access', price: '$49.99 CAD', desc: 'Unlimited exams, skills map, readiness meter, and study notes.', cta: 'Get full access', highlight: true },
            ].map(plan => (
              <div key={plan.name} style={{ backgroundColor: plan.highlight ? '#0B1F33' : '#F8FAFC', border: `1px solid ${plan.highlight ? 'transparent' : '#E2E8F0'}`, borderRadius: 12, padding: '24px', textAlign: 'left' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? '#B08D57' : '#94A3B8', marginBottom: 8 }}>{plan.name}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: plan.highlight ? '#F7F9FC' : '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>{plan.price}</p>
                <p style={{ fontSize: 14, color: plan.highlight ? 'rgba(247,249,252,0.6)' : '#64748B', lineHeight: 1.6, marginBottom: 20 }}>{plan.desc}</p>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.highlight ? '#B08D57' : '#0B1F33', color: plan.highlight ? '#0B1F33' : '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, textDecoration: 'none' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 24 }}>Or try 5 free questions first — <Link href="/demo" style={{ color: '#B08D57', textDecoration: 'none', fontWeight: 600 }}>Start free diagnostic →</Link></p>
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
