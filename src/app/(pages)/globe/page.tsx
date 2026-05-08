import type { GlobeMarker } from '@/types/globe'
import SphereHWrapper from '@/components/three/SphereHWrapper'

// ─── SIGMA OPERATIONAL LOCATIONS — full metadata ───────────────────────────────
const SIGMA_LOCATIONS: GlobeMarker[] = [
  {
    lat: 25.2048,
    lng: 55.2708,
    label: 'Dubai HQ',
    color: '#dc2626',
    metadata: {
      region: 'United Arab Emirates',
      status: 'hub',
      volume: '4.2M tonnes / yr',
      established: 2003,
      description: 'Global headquarters at Jebel Ali Free Zone. Central hub for procurement, logistics, and client operations across the GCC.',
      tradeRoutes: ['India Operations', 'Bahrain', 'Riyadh', 'Kuwait'],
    },
  },
  {
    lat: 20.5937,
    lng: 78.9629,
    label: 'India Operations',
    color: '#f59e0b',
    metadata: {
      region: 'South Asia',
      status: 'hub',
      volume: '1.8M tonnes / yr',
      established: 2008,
      description: 'Manufacturing and sourcing centre. Supplies precision-engineered components across oilfield, industrial, and marine sectors.',
      tradeRoutes: ['Dubai HQ', 'UAE Operations'],
    },
  },
  {
    lat: 26.2235,
    lng: 50.5876,
    label: 'Bahrain',
    color: '#10b981',
    metadata: {
      region: 'Middle East',
      status: 'operational',
      volume: '0.6M tonnes / yr',
      established: 2011,
      description: 'Regional sales and distribution. Key partner for downstream and petrochemical supply in the Kingdom.',
      tradeRoutes: ['Dubai HQ', 'Riyadh'],
    },
  },
  {
    lat: 29.3759,
    lng: 47.9774,
    label: 'Kuwait',
    color: '#10b981',
    metadata: {
      region: 'Middle East',
      status: 'operational',
      volume: '0.9M tonnes / yr',
      established: 2013,
      description: 'Supports Kuwait Oil Company and affiliated contractors. Focus on upstream oilfield supply.',
      tradeRoutes: ['Dubai HQ', 'Riyadh'],
    },
  },
  {
    lat: 24.7136,
    lng: 46.6753,
    label: 'Riyadh',
    color: '#6366f1',
    metadata: {
      region: 'Saudi Arabia',
      status: 'partner',
      volume: '1.1M tonnes / yr',
      established: 2015,
      description: 'Strategic partner office serving Saudi Aramco and the broader Saudi industrial corridor.',
      tradeRoutes: ['Dubai HQ', 'Kuwait', 'Bahrain'],
    },
  },
  {
    lat: 23.4241,
    lng: 53.8478,
    label: 'UAE Operations',
    color: '#dc2626',
    metadata: {
      region: 'United Arab Emirates',
      status: 'active',
      volume: '0.7M tonnes / yr',
      established: 2009,
      description: 'Inland field operations and ADNOC supply chain support across the UAE mainland.',
      tradeRoutes: ['Dubai HQ', 'India Operations'],
    },
  },
]

export const metadata = {
  title: 'Global Reach | Sigma Oilfield & Industrial Supply FZCO',
  description: 'Sigma operates across the Middle East and South Asia — precision engineering delivered everywhere.',
}

export default function GlobePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--sigma-carbon-black, #0a0f18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vh, 120px) var(--section-padding-x, 24px)',
        gap: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="section-dark section-grain"
    >
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(26,39,68,0.45) 0%, transparent 70%)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '40%', pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center bottom, rgba(220,38,38,0.06) 0%, transparent 70%)',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <p
          className="section-label"
          style={{ justifyContent: 'center', color: 'var(--sigma-red-400, #f87171)', marginBottom: 16 }}
        >
          Global Operational Reach
        </p>
        <h2 style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900,
          color: 'white',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          margin: 0,
        }}>
          Precision delivered
          <br />
          <span style={{ color: 'var(--sigma-red-500, #dc2626)' }}>everywhere.</span>
        </h2>
      </div>

      {/* Globe */}
      <div style={{
        width: 'clamp(320px, 70vw, 720px)',
        height: 'clamp(420px, 72vw, 780px)',
        position: 'relative',
        zIndex: 2,
      }}>
        <SphereHWrapper
          markers={SIGMA_LOCATIONS}
          enableStoryMode
        />
      </div>
    </div>
  )
}
