'use client'

import { useEffect, useRef } from 'react'

const SECTIONS = [
  { title: 'Law & RESA', pct: 78 },
  { title: 'Ethics', pct: 85 },
  { title: 'Land & Title', pct: 62 },
  { title: 'Liability', pct: 71 },
  { title: 'Tenancies', pct: 55 },
  { title: 'Contracts', pct: 80 },
  { title: 'Agency', pct: 74 },
  { title: 'Disputes', pct: 45 },
  { title: 'Strata Properties', pct: 38 },
  { title: 'Strata Act', pct: 66 },
  { title: 'Sections', pct: 72 },
  { title: 'Governance', pct: 58 },
  { title: 'Privacy', pct: 83 },
  { title: 'Construction', pct: 42 },
  { title: 'Maintenance', pct: 70 },
  { title: 'Risk & Insurance', pct: 67 },
  { title: 'Local Government', pct: 88 },
  { title: 'Accounting', pct: 53 },
  { title: 'Operating Budget', pct: 61 },
  { title: 'CRF & Depreciation', pct: 49 },
  { title: 'Purchasing & Personnel', pct: 76 },
]

function color(pct: number) { return pct >= 70 ? '#00a79d' : pct >= 50 ? '#d67229' : '#c22934' }
function bgColor(pct: number) { return pct >= 70 ? '#e6f7f6' : pct >= 50 ? '#fdf0e6' : '#fce8e9' }

export default function SkillsMapDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const avgPct = Math.round(SECTIONS.reduce((s, x) => s + x.pct, 0) / SECTIONS.length)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 2
    const size = 540
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = '100%'
    canvas.style.maxWidth = size + 'px'
    ctx.scale(dpr, dpr)

    const cx = size / 2, cy = size / 2
    const outerR = size * 0.38, innerR = size * 0.195
    const gap = 0.025
    const segSpan = (2 * Math.PI / 21) - gap

    let startAngle = -Math.PI / 2

    SECTIONS.forEach(s => {
      const endAngle = startAngle + segSpan
      const fillR = innerR + (outerR - innerR) * (s.pct / 100)
      const midAngle = startAngle + segSpan / 2

      ctx.beginPath()
      ctx.moveTo(cx + innerR * Math.cos(startAngle), cy + innerR * Math.sin(startAngle))
      ctx.lineTo(cx + outerR * Math.cos(startAngle), cy + outerR * Math.sin(startAngle))
      ctx.arc(cx, cy, outerR, startAngle, endAngle)
      ctx.lineTo(cx + innerR * Math.cos(endAngle), cy + innerR * Math.sin(endAngle))
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true)
      ctx.closePath()
      ctx.fillStyle = bgColor(s.pct)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(cx + innerR * Math.cos(startAngle), cy + innerR * Math.sin(startAngle))
      ctx.lineTo(cx + fillR * Math.cos(startAngle), cy + fillR * Math.sin(startAngle))
      ctx.arc(cx, cy, fillR, startAngle, endAngle)
      ctx.lineTo(cx + innerR * Math.cos(endAngle), cy + innerR * Math.sin(endAngle))
      ctx.arc(cx, cy, innerR, endAngle, startAngle, true)
      ctx.closePath()
      ctx.fillStyle = color(s.pct)
      ctx.globalAlpha = 0.85
      ctx.fill()
      ctx.globalAlpha = 1

      const labelR = outerR + 20
      const lx = cx + labelR * Math.cos(midAngle)
      const ly = cy + labelR * Math.sin(midAngle)
      const cosM = Math.cos(midAngle)
      const anchor = cosM > 0.15 ? 'left' : cosM < -0.15 ? 'right' : 'center'

      ctx.textAlign = anchor as CanvasTextAlign
      ctx.textBaseline = 'middle'

      const words = s.title.split(' ')
      const midW = Math.ceil(words.length / 2)
      const line1 = words.slice(0, midW).join(' ')
      const line2 = words.slice(midW).join(' ')

      if (words.length > 2) {
        ctx.font = '500 9.5px -apple-system,sans-serif'
        ctx.fillStyle = '#0B1F33'
        ctx.fillText(line1, lx, ly - 9)
        ctx.fillText(line2, lx, ly + 1)
        ctx.font = '600 9.5px -apple-system,sans-serif'
        ctx.fillStyle = color(s.pct)
        ctx.fillText(s.pct + '%', lx, ly + 11)
      } else {
        ctx.font = '500 9.5px -apple-system,sans-serif'
        ctx.fillStyle = '#0B1F33'
        ctx.fillText(s.title, lx, ly - 5)
        ctx.font = '600 9.5px -apple-system,sans-serif'
        ctx.fillStyle = color(s.pct)
        ctx.fillText(s.pct + '%', lx, ly + 6)
      }

      startAngle = endAngle + gap
    })

    ctx.beginPath()
    ctx.arc(cx, cy, innerR - 2, 0, 2 * Math.PI)
    ctx.fillStyle = '#F7F9FC'
    ctx.fill()

    ctx.font = '400 11px -apple-system,sans-serif'
    ctx.fillStyle = '#94A3B8'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('avg score', cx, cy - 10)

    ctx.font = '700 24px -apple-system,sans-serif'
    ctx.fillStyle = '#0B1F33'
    ctx.fillText(avgPct + '%', cx, cy + 12)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 540, display: 'block' }} />
      <div style={{ display: 'flex', gap: 20, fontSize: 12 }}>
        {[
          { color: '#00a79d', label: '70%+ Strong' },
          { color: '#d67229', label: '50–69% Review' },
          { color: '#c22934', label: 'Below 50% Focus' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.color }} />
            <span style={{ color: '#64748B' }}>{l.label}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', maxWidth: 320, margin: 0 }}>
        Your personalised skills map appears after your first practice exam.
      </p>
    </div>
  )
}
