import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'StrataReady — BC Strata Management Exam Prep'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0B1F33',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
          <img src="https://strataready.ca/favicon.png" alt="StrataReady" style={{ width: 56, height: 56, borderRadius: 12 }} />
          <span style={{ color: '#F7F9FC', fontSize: 28, fontWeight: 600 }}>StrataReady</span>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#F7F9FC', lineHeight: 1.1, marginBottom: 24, letterSpacing: '-2px' }}>
          Know before<br />you go.
        </div>
        <div style={{ fontSize: 24, color: 'rgba(247,249,252,0.6)', lineHeight: 1.5, maxWidth: 700 }}>
          BC Strata Management licensing exam prep.<br />
          420 scenario-based questions. Instant results.
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 16 }}>
          {['100 questions', 'Weighted sections', 'Source citations', 'Distractor explanations'].map(tag => (
            <div key={tag} style={{
              backgroundColor: 'rgba(176,141,87,0.15)', border: '1px solid rgba(176,141,87,0.3)',
              borderRadius: 8, padding: '8px 16px', fontSize: 16, color: '#00a79d', fontWeight: 500,
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
