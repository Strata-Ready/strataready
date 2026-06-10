import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'Strata Property Act Practice Questions | StrataReady',
  description: 'Practice questions sourced directly from the Strata Property Act. Scenario-based, fully explained, and updated for 2024 amendments. Prep for the BC Strata Management licensing exam.',
  keywords: ['Strata Property Act practice questions', 'strata property act exam questions', 'SPA practice test BC', 'strata management SPA questions'],
  alternates: { canonical: '/strata-property-act-practice-questions' },
  openGraph: {
    title: 'Strata Property Act Practice Questions | StrataReady',
    description: 'Practice questions sourced directly from the Strata Property Act.',
    url: 'https://strataready.ca/strata-property-act-practice-questions',
  },
}

export default function StrataPropertyActPracticeQuestionsPage() {
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

      <section style={{ position: 'relative', backgroundColor: '#0B1F33', overflow: 'hidden', minHeight: 560, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/hero-building.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(11,31,51,0.97) 35%, rgba(11,31,51,0.55) 100%)' }} />
        <div className="max-w-6xl mx-auto px-6 py-20 relative" style={{ zIndex: 1, width: '100%' }}>
          <div className="max-w-2xl">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)', borderRadius: 4, padding: '5px 12px', marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, backgroundColor: '#00a79d', borderRadius: '50%' }} />
              <span style={{ color: '#00a79d', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Strata Property Act</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              Strata Property Act practice questions. Current. Sourced. Explained.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              The SPA is the foundation of the BC Strata Management Licensing Exam. StrataReady's questions are drawn directly from the Act and its Regulation, updated for 2024 amendments, and explained with full source citations.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Try Free Questions →
              </Link>
              <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none', borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }}>
                See full pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Act</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>Why the Strata Property Act is central to the exam</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The Strata Property Act is the primary legislation governing strata corporations in British Columbia. It covers everything from the creation of a strata plan to the rights and obligations of owners, the powers and duties of strata councils, meeting procedures, bylaw enforcement, financial management, and dispute resolution.</p>
            <p>The BC Strata Management Licensing Exam draws heavily from the SPA. The Strata Act section alone accounts for 10 of the 100 exam questions — the single largest section by weight. But SPA concepts also appear in Governance (8 questions), Operating Budget (8 questions), CRF & Depreciation (8 questions), and several other sections.</p>
            <p>Understanding the SPA isn't just about knowing what it says — it's about being able to apply it. The exam presents scenarios and asks you to identify the correct legal outcome. This requires knowing not just the rule, but its exceptions, its vote thresholds, its timelines, and how it interacts with other legislation.</p>
            <p>StrataReady's questions are built from the current SPA, including amendments through 2024. The 2022 removal of rental restriction bylaws, the new depreciation report requirements effective July 2024, and the 10% minimum CRF contribution requirement that came into force November 2023 are all reflected in the question bank.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Key SPA Topics</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>What the SPA covers — and what the exam tests</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { topic: 'Strata plan and common property', detail: 'Definitions, types of property, owner rights' },
              { topic: 'Strata council powers and duties', detail: 'Composition, authority, liability, decision-making' },
              { topic: 'General meetings', detail: 'AGM requirements, notice, quorum, voting procedures' },
              { topic: 'Bylaws and rules', detail: 'Enforcement, amendment, registration, standard bylaws' },
              { topic: 'Financial management', detail: 'Operating fund, CRF, special levies, strata fees' },
              { topic: 'Depreciation reports', detail: '5-year cycle, mandatory for 5+ lot corporations' },
              { topic: 'Rental and age restrictions', detail: '2022 amendments — rental bylaws now unenforceable' },
              { topic: 'Repair and maintenance', detail: 'Common property obligations, owner responsibilities' },
              { topic: 'Insurance', detail: 'Minimum coverage, Form B disclosure, deductibles' },
              { topic: 'Dispute resolution', detail: 'Civil Resolution Tribunal, Supreme Court, arbitration' },
            ].map(item => (
              <div key={item.topic} style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: '16px 18px' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>{item.topic}</p>
                <p style={{ fontSize: 13, color: '#64748B' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>2024 Amendments</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>Current legislation. Not outdated course notes.</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The SPA has changed significantly in recent years. Study materials that haven't been updated will contain incorrect information — and incorrect information on a practice exam creates false confidence going into the real thing.</p>
            <p>StrataReady's questions are sourced directly from the current BC legislation and updated to reflect:</p>
            <ul style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>November 24, 2022 (Bill 44):</strong> Residential rental restriction bylaws eliminated. All existing rental restriction bylaws unenforceable. Short-term rental bylaws still permitted.</li>
              <li><strong>November 24, 2022 (Bill 44):</strong> Age restriction bylaws limited to 55-and-over only. 19-plus restrictions no longer permitted.</li>
              <li><strong>April 1, 2023:</strong> New Form B must include summary of strata corporation insurance coverage.</li>
              <li><strong>November 1, 2023:</strong> Minimum 10% annual contribution to CRF when approving budgets at AGM.</li>
              <li><strong>July 1, 2024:</strong> Depreciation reports — 5-year cycle, waiver option eliminated, mandatory for strata corporations with 5+ lots.</li>
            </ul>
            <p>When you answer a question on StrataReady, you're working with the current law — not a version that was accurate three years ago.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Start preparing today</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { name: 'Per Exam', price: '$19.99 CAD', desc: 'One full 100-question exam with instant results and full explanations including source citations.', cta: 'Get started' },
              { name: 'Full Prep Access', price: '$49.99 CAD', desc: 'Unlimited exams, skills map, readiness meter, and study notes on every missed question.', cta: 'Get full access', highlight: true },
            ].map(plan => (
              <div key={plan.name} style={{ backgroundColor: plan.highlight ? '#0B1F33' : '#F8FAFC', border: `1px solid ${plan.highlight ? 'transparent' : '#E2E8F0'}`, borderRadius: 12, padding: '24px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? '#00a79d' : '#94A3B8', marginBottom: 8 }}>{plan.name}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: plan.highlight ? '#F7F9FC' : '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>{plan.price}</p>
                <p style={{ fontSize: 14, color: plan.highlight ? 'rgba(247,249,252,0.6)' : '#64748B', lineHeight: 1.6, marginBottom: 20 }}>{plan.desc}</p>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.highlight ? '#00a79d' : '#0B1F33', color: plan.highlight ? '#ffffff' : '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, textDecoration: 'none' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 24 }}>Or try 5 free questions first — <Link href="/demo" style={{ color: '#00a79d', textDecoration: 'none', fontWeight: 600 }}>Start free diagnostic →</Link></p>
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
