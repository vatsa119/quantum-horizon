'use client'

import dynamic from 'next/dynamic'
import type { GlobeMarker, AnalyticsEvent } from '@/types/globe'

const SphereH = dynamic(
  () => import('@/components/three/SphereH'),
  { ssr: false, loading: () => null }
)

interface SphereHWrapperProps {
  markers: GlobeMarker[]
  autoRotateSpeed?: number
  enableStoryMode?: boolean
  onAnalyticsEvent?: (event: AnalyticsEvent) => void
}

export default function SphereHWrapper({
  markers,
  autoRotateSpeed = 0,
  enableStoryMode = false,
  onAnalyticsEvent,
}: SphereHWrapperProps) {
  return (
    <SphereH
      markers={markers}
      autoRotateSpeed={autoRotateSpeed}
      enableStoryMode={enableStoryMode}
      onAnalyticsEvent={(e) => {
        if (onAnalyticsEvent) onAnalyticsEvent(e)
        // Fallback for when the Server Component cannot pass the function:
        else if (process.env.NODE_ENV === 'development') {
          console.log('[Globe Analytics]', e)
        }
      }}
      onMarkerClick={(marker) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Globe] Marker clicked:', marker.label)
        }
      }}
    />
  )
}
