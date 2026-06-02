import Link from 'next/link'

export default function TermsPage() {
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
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0B1F33', letterSpacing: '-0.8px', marginBottom: 8 }}>Terms of Use</h1>
        <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 48 }}>Last updated June 1, 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>1. Acceptance of Terms</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              By creating an account and purchasing access to StrataReady, you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use the service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>2. Nature of the Service</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              StrataReady is an exam preparation tool designed to help candidates practise for the BC Strata Management licensing examination. StrataReady is not affiliated with, endorsed by, or in any way connected to the BC Financial Services Authority (BCFSA), UBC Sauder School of Business, or any other regulatory or educational body that administers or oversees the licensing examination.
            </p>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, marginTop: 12 }}>
              Practice questions are generated from publicly available BC legislation and licensing course materials. They are intended for study purposes only and do not guarantee the content, format, or difficulty of the actual licensing examination.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>3. No Guarantee of Exam Results</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              StrataReady makes no representations, warranties, or guarantees regarding your performance on the BC Strata Management licensing examination or any other examination. Use of this service does not guarantee that you will pass the licensing examination. Exam results are determined solely by the administering body and are entirely your responsibility.
            </p>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, marginTop: 12 }}>
              StrataReady shall not be liable for any direct, indirect, incidental, or consequential damages arising from your examination results, including but not limited to failed examination attempts, lost licensing fees, or lost employment opportunities.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>4. Payment and Refund Policy</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              All purchases are final. StrataReady does not offer refunds for any reason, including but not limited to dissatisfaction with the service, failure to use purchased exam attempts, or failure to pass the licensing examination.
            </p>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8, marginTop: 12 }}>
              By completing a purchase, you acknowledge that you have read and understood this no-refund policy and agree to it without reservation. All prices are in Canadian dollars and include applicable taxes where required by law.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>5. Account Responsibility</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              You are responsible for maintaining the confidentiality of your account credentials. Each account is for individual use only and may not be shared or transferred. StrataReady reserves the right to terminate accounts that are found to be shared or used in violation of these terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>6. Intellectual Property</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              All content on StrataReady, including practice questions, explanations, and study references, is the property of StrataReady or its licensors. You may not reproduce, distribute, or create derivative works from any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>7. Limitation of Liability</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              To the fullest extent permitted by applicable law, StrataReady and its operators shall not be liable for any damages of any kind arising from the use of or inability to use the service. Your sole remedy for dissatisfaction with the service is to discontinue use.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>8. Governing Law</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              These Terms of Use are governed by the laws of the Province of British Columbia and the federal laws of Canada applicable therein. Any disputes arising from these terms shall be resolved in the courts of British Columbia.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>9. Changes to These Terms</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              StrataReady reserves the right to modify these terms at any time. Continued use of the service after changes are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0B1F33', marginBottom: 12 }}>10. Contact</h2>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.8 }}>
              For questions about these terms, contact us at <a href="mailto:support@strataready.ca" style={{ color: '#0B1F33' }}>support@strataready.ca</a>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid #E2E8F0', display: 'flex', gap: 24 }}>
          <Link href="/privacy" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/" style={{ fontSize: 13, color: '#64748B', textDecoration: 'none' }}>← Back to StrataReady</Link>
        </div>
      </div>
    </div>
  )
}
