'use client'

import dynamic from 'next/dynamic'

const ProductsCinema = dynamic(
  () => import('@/components/sections/ProductsCinema'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '100dvh',
        background: '#0a0f18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}>
          Loading...
        </span>
      </div>
    ),
  }
)

export default function ProductsCinemaWrapper() {
  return <ProductsCinema />
}
