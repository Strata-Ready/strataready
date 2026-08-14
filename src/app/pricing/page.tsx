import Link from 'next/link'
import Logo from '@/components/logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — StrataReady BC Strata Management Exam Prep',
  description: 'Simple one-time pricing for BC Strata Management licensing exam preparation. Free diagnostic, $19.99 per exam, or $49.99 for unlimited access.',
  alternates: { canonical: '/pricing' },
}

export default function PricingPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F9FC', color: '#0B1F33' }}>
      <nav style={{ backgroundColor: 'rgba(11,31,51,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={32} />
            <span style={{ color: '#F7F9FC', fontSize: 16, fontWeight: 600, letterSpacing: '-0.3px' }}>StrataReady</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/login" style={{ color: 'rgba(247,249,252,0.6)', fontSize: 14 }} className="hover:text-white transition-colors">Sign in</Link>
            <Link href="/demo" style={{ backgroundColor: '#00a79d', color: '#ffffff', fontSize: 13, fontWeight: 600, padding: '8px 18px', borderRadius: 6 }} className="hover:opacity-90 transition-opacity">Free Diagnostic</Link>
          </div>
        </div>
      </nav>

      <section className="py-24" style={{ backgroundColor: 'white' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p style={{ fontSize: 11, fontWeight: 600, color: '#00a79d', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</p>
            <h1 style={{ fontSize: 48, fontWeight: 700, color: '#0B1F33', letterSpacing: '-0.8px' }}>Simple Pricing. No Subscription Required.</h1>
            <p style={{ fontSize: 16, color: '#64748B', marginTop: 8 }}>Preparing properly costs far less than rewriting the licensing exam. Choose a single practice exam or unlock unlimited access until you&apos;re confident you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Free Diagnostic</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Find out how prepared you are in just a few minutes.</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px', marginBottom: 24 }}>$0</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['5 sample questions', 'Instant score', 'Sample explanations', 'No account required'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/demo" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Start diagnostic
              </Link>
            </div>

            <div style={{ border: '2px solid #0B1F33', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0B1F33', color: '#00a79d', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Per Exam</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>One complete licensing simulation.</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$19.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>/ attempt</span>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 20 }}>Less than one exam re-booking fee</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['100 realistic questions', 'Instant results', 'Detailed explanations', 'Source citations for every answer'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{ display: 'block', textAlign: 'center', backgroundColor: '#0B1F33', color: '#F7F9FC', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:opacity-90 transition-opacity">
                Get started
              </Link>
              <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 10 }}>7-day money-back guarantee</p>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: 12, padding: '28px 24px', backgroundColor: 'white' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33', marginBottom: 4 }}>Full Prep Access</p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>Everything you need to prepare with confidence.</p>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: '#0B1F33', letterSpacing: '-1px' }}>$49.99</span>
                <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 4 }}>one-time</span>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginBottom: 20 }}>A fraction of the cost of the licensing course</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0' }} className="space-y-2">
                {['Unlimited practice exams', 'Flashcards', 'Progress tracking', 'Performance history', 'Exam readiness insights'].map(f => (
                  <li key={f} style={{ fontSize: 13, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#00a79d', fontWeight: 600 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup?plan=unlimited" style={{ display: 'block', textAlign: 'center', border: '1px solid #E2E8F0', color: '#0B1F33', fontSize: 13, fontWeight: 600, padding: '10px 0', borderRadius: 8 }} className="hover:bg-gray-50 transition-colors">
                Get full access
              </Link>
              <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 10 }}>7-day money-back guarantee</p>
            </div>

          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #E2E8F0', backgroundColor: '#F7F9FC' }}>
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={24} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#0B1F33' }}>StrataReady</span>
          </div>
          <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>BC Strata Management Licensing Exam Preparation · Not affiliated with the BC Financial Services Authority</p>
          <div className="flex gap-6">
            <Link href="/privacy" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" style={{ fontSize: 12, color: '#94A3B8' }} className="hover:text-gray-600">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
