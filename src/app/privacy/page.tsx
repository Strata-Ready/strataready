import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F9FC' }}>
      <nav style={{ backgroundColor: '#0B1F33', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, backgroundColor: '#B08D57', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#0B1F33', fontSize: 11, fontWeight: 700 }}>SR</span>
          </div>
          <span style={{ color: '#F7F9FC', fontSize: 15, fontWeight: 600 }}>StrataReady</span>
        </Link>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#B08D57', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Legal</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 48 }}>Last updated June 1, 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>1. Information We Collect</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              StrataReady collects only the information necessary to provide the service. This includes:
            </p>
            <ul style={{ marginTop: 12, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Your full name and email address, provided when you create an account.',
                'Your exam attempts, scores, and answers, recorded to provide your results and history.',
                'Payment information, processed securely by Stripe. StrataReady never stores your credit card details.',
              ].map(item => (
                <li key={item} style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>{item}</li>
              ))}
            </ul>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, marginTop: 12 }}>
              We do not collect browsing history, device information, or any personal information beyond what is listed above.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>2. How We Use Your Information</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              Your information is used solely to operate StrataReady — to create and manage your account, process your payment, deliver exam results, and maintain your score history. We do not use your information for marketing, advertising, or any purpose beyond providing the service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>3. Information Sharing</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              We do not sell, rent, or share your personal information with any third parties, except as required to operate the service. Your email address and name are shared with Stripe solely for the purpose of processing your payment. Stripe&apos;s privacy policy governs their handling of your information.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>4. Data Storage</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              Your account information and exam data are stored securely using Supabase, a cloud database provider with servers in Canada. Your data is encrypted at rest and in transit.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>5. Data Retention</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              We retain your account information and exam history for as long as your account is active. If you request account deletion, your personal information and exam history will be permanently deleted within 30 days.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>6. Your Rights</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              You have the right to access, correct, or delete your personal information at any time. To make a request, contact us at <a href="mailto:support@strataready.ca" style={{ color: '#0B1F33' }}>support@strataready.ca</a>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>7. Cookies</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              StrataReady uses only essential session cookies required for authentication. We do not use tracking cookies or third-party analytics cookies.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>8. Changes to This Policy</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the service after changes are posted constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>9. Contact</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              For privacy-related questions or requests, contact us at <a href="mailto:support@strataready.ca" style={{ color: '#0B1F33' }}>support@strataready.ca</a>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid #E2E8F0', display: 'flex', gap: 24 }}>
          <Link href="/terms" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>Terms of Use</Link>
          <Link href="/" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>← Back to StrataReady</Link>
        </div>
      </div>
    </div>
  )
}
