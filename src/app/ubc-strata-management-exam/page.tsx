import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'UBC Strata Management Exam Prep | StrataReady',
  description: 'Preparing for the BC Strata Management licensing exam after completing the UBC Sauder course? StrataReady\'s practice exams test the same legislation and scenario-based format as the real exam.',
  keywords: ['UBC strata management exam', 'UBC Sauder strata management', 'strata management licensing exam prep', 'BC strata management course exam'],
  alternates: { canonical: '/ubc-strata-management-exam' },
  openGraph: {
    title: 'UBC Strata Management Exam Prep | StrataReady',
    description: 'Practice exams for the BC Strata Management licensing exam.',
    url: 'https://strataready.ca/ubc-strata-management-exam',
  },
}

export default function UBCStrataManagementExamPage() {
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
              <span style={{ color: '#00a79d', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Exam Prep</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              Finished the strata management course? Now prepare for the exam.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              StrataReady is an independent exam preparation tool built from the same BC legislation the licensing exam tests. 420 scenario-based questions. Two attempts at the real exam. Make the first one count.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
                Start Free Diagnostic →
              </Link>
              <Link href="/signup" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14, textDecoration: 'none', borderBottom: '1px solid rgba(247,249,252,0.2)', paddingBottom: 1, marginTop: 14 }}>
                View pricing
              </Link>
            </div>
            <p style={{ color: 'rgba(247,249,252,0.3)', fontSize: 13, marginTop: 16 }}>Not affiliated with UBC Sauder or the BCFSA</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Gap Between Course and Exam</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>Completing the course is not the same as being ready for the exam</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The BC Strata Management Licensing Exam is a separate step after completing the licensing course. Many candidates who have diligently completed the coursework are still surprised by how difficult the exam is. The reason is simple: the course teaches the material, but the exam tests your ability to apply it under time pressure to scenario-based questions where multiple answers seem plausible.</p>
            <p>The exam format is 100 multiple choice questions in three hours. Questions present realistic strata management situations — disputes between owners and councils, bylaw enforcement scenarios, financial decisions, privacy obligations — and ask you to identify the legally correct answer. All four options are designed to seem reasonable to someone who hasn't studied carefully.</p>
            <p>StrataReady bridges this gap. It's not a replacement for the course — it's the step between finishing the course and writing the exam. 420 scenario-based questions, each built from the actual BC legislation, delivered in timed 100-question practice exams that mirror the real thing.</p>
            <p>StrataReady is independent — it is not affiliated with, endorsed by, or connected to UBC Sauder School of Business, the BCFSA, or any other educational or regulatory body. It is a study tool built to help candidates pass the licensing exam.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>What StrataReady Tests</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>The same legislation. The same format.</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>Every question in StrataReady is sourced from authoritative BC legislation — the same sources the real exam draws from. The questions are updated to reflect legislative amendments through 2024, including the removal of residential rental restriction bylaws (Bill 44, 2022), the new 5-year depreciation report cycle, and the 10% minimum CRF contribution requirement (November 2023).</p>
            <p>Questions are weighted to reflect actual exam emphasis. The Strata Act, Governance, Operating Budget, and CRF sections carry the most weight — and StrataReady's practice exams give them more questions accordingly.</p>
            <p>When you miss a question, you see exactly why. The distractor explanation walks through why each option is right or wrong. A study note explains the underlying concept in plain language. A source citation tells you exactly where in the legislation to look if you want to go deeper.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Two Attempts</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>You get two attempts. Use the first one wisely.</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The BC Strata Management Licensing Exam allows two attempts. If you fail both, you must complete additional coursework before you can apply again. This makes preparation critical — not just for passing, but for passing the first time.</p>
            <p>Candidates who take multiple StrataReady practice exams consistently perform better. Not because the questions are the same as the real exam — they're not — but because the format, the difficulty level, and the pressure of working through 100 questions in a timed session builds the pattern recognition that the real exam requires.</p>
            <p>The skills map and readiness meter in your StrataReady dashboard give you an honest picture of where you stand. When your readiness score is consistently high and your weak sections are improving, you're ready to write.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Simple pricing</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { name: 'Per Exam', price: '$19.99 CAD', desc: 'One full practice exam with instant results, distractor explanations, and source citations.', cta: 'Get started' },
              { name: 'Full Prep Access', price: '$49.99 CAD', desc: 'Unlimited exams, skills map, readiness meter, and study notes. Recommended for serious candidates.', cta: 'Get full access', highlight: true },
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
          <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 24 }}>Try 5 free diagnostic questions first — <Link href="/demo" style={{ color: '#00a79d', textDecoration: 'none', fontWeight: 600 }}>no account required →</Link></p>
        </div>
      </section>

      <footer style={{ backgroundColor: '#F1F5F9', borderTop: '1px solid #E2E8F0' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={24} />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0B1F33' }}>StrataReady</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>BC Strata Management Licensing Exam Preparation · Not affiliated with UBC Sauder or the BC Financial Services Authority</p>
          <div style={{ display: 'flex', gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}>Privacy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none' }}>Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
