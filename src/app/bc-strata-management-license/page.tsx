import Link from 'next/link'
import type { Metadata } from 'next'
import Logo from '@/components/logo'

export const metadata: Metadata = {
  title: 'BC Strata Management License — Exam Prep | StrataReady',
  description: 'Getting your BC strata management license requires passing the BCFSA licensing exam. StrataReady prepares you with 420 practice questions, instant results, and study notes.',
  keywords: ['BC strata management license', 'strata manager license BC', 'strata management licensing BC', 'BCFSA strata manager license'],
  alternates: { canonical: '/bc-strata-management-license' },
  openGraph: {
    title: 'BC Strata Management License — Exam Prep | StrataReady',
    description: 'Prepare for the BC strata management licensing exam with StrataReady.',
    url: 'https://strataready.ca/bc-strata-management-license',
  },
}

export default function BCStrataManagementLicensePage() {
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
            <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6, textDecoration: 'none' }}>
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
              <span style={{ color: '#00a79d', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>BC Strata Management License</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#F7F9FC', lineHeight: 1.1, letterSpacing: '-1.2px', marginBottom: 20 }}>
              The exam is the last step to your BC strata management license.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(247,249,252,0.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              StrataReady helps you pass the BCFSA licensing exam the first time. 420 scenario-based practice questions, instant results, and study notes on every question you miss.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#0B1F33', fontSize: 15, fontWeight: 600, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
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

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Licensing Process</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>What does it take to get a BC strata management license?</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>In British Columbia, anyone who is paid to provide strata management services must hold a licence issued by the BC Financial Services Authority (BCFSA). This includes individuals working for a licensed brokerage as well as managing brokers.</p>
            <p>The path to licensing involves completing an approved strata management licensing course, then passing the BCFSA licensing examination. The exam is the final hurdle — and for many candidates, it's the hardest part. You have two attempts. If both fail, you must return to coursework before reapplying.</p>
            <p>The licensing exam is 100 multiple choice questions, three hours, and requires a score of 70% or higher to pass. It tests knowledge across 20+ subject areas drawn from BC legislation including the Strata Property Act, the Real Estate Services Act, PIPA, and the Residential Tenancy Act.</p>
            <p>StrataReady is designed specifically for this step — the gap between completing your coursework and writing the exam. It's not a replacement for the licensing course; it's the practice that turns course knowledge into exam performance.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>The Exam</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 20 }}>What the BCFSA licensing exam looks like</h2>
          <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>The licensing exam uses scenario-based multiple choice questions. Each question presents a realistic situation — a dispute between a strata council and an owner, a financial decision that needs to be made, a bylaw that may or may not be enforceable — and asks you to identify the legally correct outcome.</p>
            <p>All four options are designed to be plausible. The wrong answers exploit common misunderstandings — a wrong vote threshold, an obsolete rule, a principle that applies in a different context. Eliminating obviously wrong answers isn't possible; you need to know why the correct answer is correct and why each alternative is wrong.</p>
            <p>The exam is weighted by topic. The Strata Act (10 questions), Governance (8), Operating Budget (8), and CRF & Depreciation (8) carry the most weight. Law & RESA, Contracts, and Agency each contribute 6 questions. The remaining sections contribute 2–5 questions each.</p>
            <p>Time management matters. At 100 questions in 3 hours, you have about 1.8 minutes per question. Candidates who haven't practiced under timed conditions often run short. StrataReady's practice exams replicate this pressure.</p>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#F7F9FC' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>How StrataReady Helps</p>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Built for the licensing exam. Not a generic quiz tool.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { title: 'Questions built from current BC legislation', body: 'Every question is sourced from authoritative BC legislation and updated for 2024 amendments. The rental restriction bylaw changes, the new depreciation report requirements, and the CRF minimum contribution are all reflected.' },
              { title: 'Weighted to match the real exam', body: 'Each practice exam draws questions weighted by section — more from the Strata Act, Governance, and financial sections, less from Local Government and Strata Properties. This reflects how the real exam is structured.' },
              { title: 'Distractor explanations on every question', body: 'When you get a question wrong, you see not just the correct answer but why each option is right or wrong. This is how you learn to recognize the traps the real exam sets.' },
              { title: 'Study notes on missed questions', body: 'Plain-language explanations of the underlying concept behind every question you miss. No hunting through the Act. The key principle is explained right there in the review.' },
              { title: 'Progress tracking across all 21 sections', body: 'Your dashboard shows your performance in every section, your exam readiness score, and which areas need the most attention. You always know where you stand.' },
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

      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 32 }}>Get your license. Pass the exam.</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { name: 'Per Exam', price: '$19.99 CAD', desc: 'One full practice exam with instant results, distractor explanations, and source citations.', cta: 'Buy one exam' },
              { name: 'Full Prep Access', price: '$49.99 CAD', desc: 'Unlimited exams, skills map, readiness meter, and study notes. The complete prep package.', cta: 'Get full access', highlight: true },
            ].map(plan => (
              <div key={plan.name} style={{ backgroundColor: plan.highlight ? '#0B1F33' : '#F8FAFC', border: `1px solid ${plan.highlight ? 'transparent' : '#E2E8F0'}`, borderRadius: 12, padding: '24px' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: plan.highlight ? '#00a79d' : '#94A3B8', marginBottom: 8 }}>{plan.name}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: plan.highlight ? '#F7F9FC' : '#0B1F33', letterSpacing: '-0.8px', marginBottom: 12 }}>{plan.price}</p>
                <p style={{ fontSize: 14, color: plan.highlight ? 'rgba(247,249,252,0.6)' : '#64748B', lineHeight: 1.6, marginBottom: 20 }}>{plan.desc}</p>
                <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: plan.highlight ? '#00a79d' : '#0B1F33', color: plan.highlight ? '#0B1F33' : '#F7F9FC', fontSize: 14, fontWeight: 600, padding: '11px', borderRadius: 8, textDecoration: 'none' }}>
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
