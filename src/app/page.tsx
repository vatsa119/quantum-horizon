'use client'

import dynamic from 'next/dynamic'
import CorporateNarrative from '@/components/sections/CorporateNarrative'
import GlobalSourcing from '@/components/sections/GlobalSourcing'
import StatsBanner from '@/components/sections/StatsBanner'
import ClientsPreview from '@/components/sections/ClientsPreview'

const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection'),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: '100dvh', background: 'var(--sigma-carbon-black)' }} />
    ),
  }
)

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CorporateNarrative />
      <GlobalSourcing />
      <StatsBanner />
      <ClientsPreview />
      <footer id="main-footer" style={{ minHeight: '60px', background: 'var(--sigma-carbon-black)' }}>
        {/* Full footer built in Prompt 5 */}
      </footer>
    </>
  )
}
