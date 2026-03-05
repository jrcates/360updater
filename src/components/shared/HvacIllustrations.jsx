// Variant configs for visual differentiation
const OLD_UNIT_VARIANTS = [
  { bodyW: 360, bodyH: 155, bodyX: 120, bodyY: 160, fanCount: 1, fanX: 300, color: '#e5e7eb', label: 'Old Unit' },
  { bodyW: 320, bodyH: 140, bodyX: 140, bodyY: 175, fanCount: 2, fanX: 260, color: '#dbeafe', label: 'Old Unit' },
  { bodyW: 400, bodyH: 130, bodyX: 100, bodyY: 180, fanCount: 1, fanX: 300, color: '#e5e7eb', label: 'Old Unit' },
  { bodyW: 280, bodyH: 160, bodyX: 160, bodyY: 155, fanCount: 2, fanX: 240, color: '#fef3c7', label: 'Old Unit' },
]

const NEW_UNIT_VARIANTS = [
  { accent: '#4f46e5', accentLight: '#eef2ff', badge: 'ECO', bodyW: 320, bodyX: 140, label: 'New Unit' },
  { accent: '#0891b2', accentLight: '#ecfeff', badge: 'HE', bodyW: 300, bodyX: 150, label: 'New Unit' },
  { accent: '#7c3aed', accentLight: '#f5f3ff', badge: 'PRO', bodyW: 340, bodyX: 130, label: 'New Unit' },
  { accent: '#059669', accentLight: '#ecfdf5', badge: 'MAX', bodyW: 290, bodyX: 155, label: 'New Unit' },
]

const ADAPTER_VARIANTS = [
  { topW: 260, botW: 340, slope: 40, color: '#f3f4f6', label: 'Curb Adapter' },
  { topW: 220, botW: 360, slope: 55, color: '#eff6ff', label: 'Curb Adapter' },
  { topW: 290, botW: 320, slope: 25, color: '#f3f4f6', label: 'Curb Adapter' },
  { topW: 200, botW: 380, slope: 65, color: '#fefce8', label: 'Curb Adapter' },
]

export function OldUnitIllustration({ className = '', variant = 1 }) {
  const v = OLD_UNIT_VARIANTS[(variant - 1) % OLD_UNIT_VARIANTS.length]
  const cx = v.bodyX + v.bodyW / 2
  const bodyBottom = v.bodyY + v.bodyH
  const fanHousingY = v.bodyY - 45
  const seam1X = v.bodyX + v.bodyW * 0.25
  const seam2X = v.bodyX + v.bodyW * 0.75
  const seamMidY = v.bodyY + v.bodyH * 0.5

  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Old HVAC rooftop unit">
      <rect width="600" height="400" fill="#f9fafb" />
      <ellipse cx={cx} cy="340" rx={v.bodyW / 2 + 20} ry="12" fill="#e5e7eb" />

      {/* Legs */}
      <rect x={v.bodyX + 20} y={bodyBottom} width="20" height="30" rx="2" fill="#9ca3af" stroke="#6b7280" strokeWidth="1.5" />
      <rect x={v.bodyX + v.bodyW - 40} y={bodyBottom} width="20" height="30" rx="2" fill="#9ca3af" stroke="#6b7280" strokeWidth="1.5" />

      {/* Main body */}
      <rect x={v.bodyX} y={v.bodyY} width={v.bodyW} height={v.bodyH} rx="4" fill={v.color} stroke="#6b7280" strokeWidth="2" />

      {/* Panel seams */}
      <line x1={seam1X} y1={v.bodyY} x2={seam1X} y2={bodyBottom} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={seam2X} y1={v.bodyY} x2={seam2X} y2={bodyBottom} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={v.bodyX} y1={seamMidY} x2={v.bodyX + v.bodyW} y2={seamMidY} stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Service access panel */}
      <rect x={v.bodyX + 25} y={v.bodyY + 20} width="50" height="40" rx="2" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx={v.bodyX + 65} cy={v.bodyY + 40} r="3" fill="#9ca3af" />

      {/* Ventilation grille */}
      <rect x={cx - 55} y={v.bodyY + 15} width="110" height="50" rx="3" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1={cx - 45 + i * 14} y1={v.bodyY + 20} x2={cx - 45 + i * 14} y2={v.bodyY + 60} stroke="#9ca3af" strokeWidth="1" />
      ))}

      {/* Fan housing */}
      {v.fanCount === 1 ? (
        <>
          <rect x={cx - 70} y={fanHousingY} width="140" height="45" rx="4" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
          <circle cx={cx} cy={fanHousingY + 22} r="16" fill={v.color} stroke="#6b7280" strokeWidth="1.5" />
          <circle cx={cx} cy={fanHousingY + 22} r="4" fill="#9ca3af" />
          <line x1={cx} y1={fanHousingY + 8} x2={cx} y2={fanHousingY + 36} stroke="#9ca3af" strokeWidth="1.5" />
          <line x1={cx - 14} y1={fanHousingY + 22} x2={cx + 14} y2={fanHousingY + 22} stroke="#9ca3af" strokeWidth="1.5" />
        </>
      ) : (
        <>
          <rect x={cx - 90} y={fanHousingY} width="180" height="45" rx="4" fill="#d1d5db" stroke="#6b7280" strokeWidth="2" />
          {[cx - 40, cx + 40].map((fx, fi) => (
            <g key={fi}>
              <circle cx={fx} cy={fanHousingY + 22} r="14" fill={v.color} stroke="#6b7280" strokeWidth="1.5" />
              <circle cx={fx} cy={fanHousingY + 22} r="3.5" fill="#9ca3af" />
              <line x1={fx} y1={fanHousingY + 10} x2={fx} y2={fanHousingY + 34} stroke="#9ca3af" strokeWidth="1.5" />
              <line x1={fx - 12} y1={fanHousingY + 22} x2={fx + 12} y2={fanHousingY + 22} stroke="#9ca3af" strokeWidth="1.5" />
            </g>
          ))}
        </>
      )}

      {/* Electrical conduit */}
      <rect x={v.bodyX + v.bodyW - 60} y={v.bodyY + 15} width="35" height="55" rx="2" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <line key={i} x1={v.bodyX + v.bodyW - 55} y1={v.bodyY + 30 + i * 10} x2={v.bodyX + v.bodyW - 30} y2={v.bodyY + 30 + i * 10} stroke="#9ca3af" strokeWidth="1" />
      ))}

      {/* Rust/wear marks */}
      <circle cx={v.bodyX + 40} cy={bodyBottom - 25} r="6" fill="#d1d5db" opacity="0.6" />
      <circle cx={v.bodyX + v.bodyW - 30} cy={bodyBottom - 35} r="5" fill="#d1d5db" opacity="0.6" />
      <circle cx={cx + 50} cy={bodyBottom - 15} r="4" fill="#d1d5db" opacity="0.5" />

      <text x="300" y="380" textAnchor="middle" fontSize="12" fill="#9ca3af" fontFamily="system-ui, sans-serif">{v.label}</text>
    </svg>
  )
}

export function NewUnitIllustration({ className = '', variant = 1 }) {
  const v = NEW_UNIT_VARIANTS[(variant - 1) % NEW_UNIT_VARIANTS.length]
  const cx = v.bodyX + v.bodyW / 2
  const bodyRight = v.bodyX + v.bodyW

  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="New HVAC rooftop unit">
      <rect width="600" height="400" fill="#f9fafb" />
      <ellipse cx={cx} cy="335" rx={v.bodyW / 2 + 10} ry="10" fill="#e5e7eb" />

      {/* Base frame */}
      <rect x={v.bodyX - 5} y="310" width={v.bodyW + 10} height="20" rx="3" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />

      {/* Main body */}
      <rect x={v.bodyX} y="165" width={v.bodyW} height="150" rx="6" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" />

      {/* Clean panel line */}
      <line x1={cx} y1="165" x2={cx} y2="315" stroke="#e5e7eb" strokeWidth="1.5" />

      {/* Modern louvered air intake - left side */}
      <rect x={v.bodyX + 20} y="185" width={cx - v.bodyX - 40} height="70" rx="4" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={v.bodyX + 28} y1={193 + i * 8} x2={cx - 28} y2={193 + i * 8} stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
      ))}

      {/* Digital control panel */}
      <rect x={cx + 20} y="185" width={bodyRight - cx - 40} height="45" rx="4" fill={v.accentLight} stroke={v.accent} strokeWidth="1.5" />
      <rect x={cx + 32} y="195" width="50" height="12" rx="2" fill={v.accent} opacity="0.15" />
      <circle cx={bodyRight - 40} cy="201" r="5" fill={v.accent} opacity="0.3" />
      <circle cx={bodyRight - 24} cy="201" r="5" fill="#22c55e" opacity="0.4" />
      <circle cx={cx + 30} cy="222" r="2.5" fill="#22c55e" />
      <text x={cx + 38} y="225" fontSize="8" fill="#6b7280" fontFamily="system-ui, sans-serif">READY</text>

      {/* Brand plate */}
      <rect x={cx + 20} y="260" width={bodyRight - cx - 40} height="35" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />
      <rect x={cx + 40} y="270" width={bodyRight - cx - 80} height="4" rx="2" fill="#d1d5db" />
      <rect x={cx + 55} y="280" width={bodyRight - cx - 110} height="3" rx="1.5" fill="#e5e7eb" />

      {/* Top unit */}
      <rect x={cx - 100} y="125" width="200" height="44" rx="5" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" />

      {/* Fan grille */}
      <circle cx={cx} cy="147" r="16" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" />
      <circle cx={cx} cy="147" r="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="1" />
      <circle cx={cx} cy="147" r="4" fill="#9ca3af" />

      {/* Efficiency badge */}
      <rect x={cx + 50} y="133" width="38" height="18" rx="9" fill={v.accent} opacity="0.1" stroke={v.accent} strokeWidth="1" />
      <text x={cx + 69} y="146" textAnchor="middle" fontSize="8" fill={v.accent} fontFamily="system-ui, sans-serif" fontWeight="600">{v.badge}</text>

      {/* Refrigerant lines */}
      <path d={`M${v.bodyX} 250 L${v.bodyX - 10} 250 L${v.bodyX - 10} 180 L${v.bodyX} 180`} stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d={`M${v.bodyX} 260 L${v.bodyX - 15} 260 L${v.bodyX - 15} 190 L${v.bodyX} 190`} stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />

      <text x="300" y="380" textAnchor="middle" fontSize="12" fill="#9ca3af" fontFamily="system-ui, sans-serif">{v.label}</text>
    </svg>
  )
}

export function AdapterIllustration({ className = '', variant = 1 }) {
  const v = ADAPTER_VARIANTS[(variant - 1) % ADAPTER_VARIANTS.length]
  const cx = 300
  const topLeft = cx - v.topW / 2
  const topRight = cx + v.topW / 2
  const botLeft = cx - v.botW / 2
  const botRight = cx + v.botW / 2
  const topY = 170 - (v.slope > 40 ? 10 : 0)
  const botY = topY + 90 + (v.slope > 40 ? 15 : 0)

  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Curb adapter">
      <rect width="600" height="400" fill="#f9fafb" />
      <ellipse cx={cx} cy="330" rx={v.botW / 2 + 10} ry="8" fill="#e5e7eb" />

      {/* Bottom frame (old curb) */}
      <path d={`M${botLeft} ${botY + 50} L${botLeft} ${botY} L${botRight} ${botY} L${botRight} ${botY + 50} Z`} fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" strokeLinejoin="round" />

      {/* Transition walls */}
      <path d={`M${botLeft} ${botY} L${topLeft} ${topY} L${topRight} ${topY} L${botRight} ${botY} Z`} fill={v.color} stroke="#6b7280" strokeWidth="2" strokeLinejoin="round" />

      {/* Top frame (new unit) */}
      <path d={`M${topLeft} ${topY} L${topLeft} ${topY - 30} L${topRight} ${topY - 30} L${topRight} ${topY} Z`} fill="#e5e7eb" stroke="#6b7280" strokeWidth="2" strokeLinejoin="round" />

      {/* Internal cross-bracing */}
      <line x1={topLeft + v.topW * 0.15} y1={topY} x2={botLeft + v.botW * 0.1} y2={botY} stroke="#d1d5db" strokeWidth="1.5" />
      <line x1={cx} y1={topY} x2={cx} y2={botY} stroke="#d1d5db" strokeWidth="1.5" />
      <line x1={topRight - v.topW * 0.15} y1={topY} x2={botRight - v.botW * 0.1} y2={botY} stroke="#d1d5db" strokeWidth="1.5" />

      {/* Horizontal stiffener */}
      <line x1={botLeft + 15} y1={(topY + botY) / 2} x2={botRight - 15} y2={(topY + botY) / 2} stroke="#d1d5db" strokeWidth="1.5" />

      {/* Insulation gasket - top */}
      <rect x={topLeft + 5} y={topY - 33} width={v.topW - 10} height="6" rx="2" fill="#fbbf24" opacity="0.4" stroke="#f59e0b" strokeWidth="0.5" />

      {/* Insulation gasket - bottom */}
      <rect x={botLeft + 5} y={botY + 47} width={v.botW - 10} height="6" rx="2" fill="#fbbf24" opacity="0.4" stroke="#f59e0b" strokeWidth="0.5" />

      {/* Mounting bolt holes - top */}
      <circle cx={topLeft + 15} cy={topY - 15} r="6" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx={topLeft + 15} cy={topY - 15} r="2.5" fill="#9ca3af" />
      <circle cx={topRight - 15} cy={topY - 15} r="6" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx={topRight - 15} cy={topY - 15} r="2.5" fill="#9ca3af" />

      {/* Mounting bolt holes - bottom */}
      <circle cx={botLeft + 18} cy={botY + 25} r="6" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx={botLeft + 18} cy={botY + 25} r="2.5" fill="#9ca3af" />
      <circle cx={botRight - 18} cy={botY + 25} r="6" fill="#d1d5db" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx={botRight - 18} cy={botY + 25} r="2.5" fill="#9ca3af" />

      {/* Dimension line - top */}
      <line x1={topLeft} y1={topY - 50} x2={topRight} y2={topY - 50} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={topLeft} y1={topY - 55} x2={topLeft} y2={topY - 45} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={topRight} y1={topY - 55} x2={topRight} y2={topY - 45} stroke="#9ca3af" strokeWidth="0.75" />
      <polygon points={`${topLeft},${topY - 50} ${topLeft + 6},${topY - 53} ${topLeft + 6},${topY - 47}`} fill="#9ca3af" />
      <polygon points={`${topRight},${topY - 50} ${topRight - 6},${topY - 53} ${topRight - 6},${topY - 47}`} fill="#9ca3af" />

      {/* Dimension line - bottom */}
      <line x1={botLeft} y1={botY + 70} x2={botRight} y2={botY + 70} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={botLeft} y1={botY + 65} x2={botLeft} y2={botY + 75} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={botRight} y1={botY + 65} x2={botRight} y2={botY + 75} stroke="#9ca3af" strokeWidth="0.75" />
      <polygon points={`${botLeft},${botY + 70} ${botLeft + 6},${botY + 67} ${botLeft + 6},${botY + 73}`} fill="#9ca3af" />
      <polygon points={`${botRight},${botY + 70} ${botRight - 6},${botY + 67} ${botRight - 6},${botY + 73}`} fill="#9ca3af" />

      {/* Dimension line - height */}
      <line x1={botRight + 30} y1={topY - 30} x2={botRight + 30} y2={botY + 50} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={botRight + 25} y1={topY - 30} x2={botRight + 35} y2={topY - 30} stroke="#9ca3af" strokeWidth="0.75" />
      <line x1={botRight + 25} y1={botY + 50} x2={botRight + 35} y2={botY + 50} stroke="#9ca3af" strokeWidth="0.75" />

      <text x={cx} y={topY - 60} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="system-ui, sans-serif">NEW UNIT</text>
      <text x={cx} y={botY + 88} textAnchor="middle" fontSize="9" fill="#9ca3af" fontFamily="system-ui, sans-serif">OLD CURB</text>
      <text x="300" y="385" textAnchor="middle" fontSize="12" fill="#9ca3af" fontFamily="system-ui, sans-serif">{v.label}</text>
    </svg>
  )
}

export const HVAC_ILLUSTRATIONS = {
  oldUnit: OldUnitIllustration,
  newUnit: NewUnitIllustration,
  adapter: AdapterIllustration,
}
