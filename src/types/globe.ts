// ─── GLOBE TYPE SYSTEM ────────────────────────────────────────────────────────
// Production types for Sigma Oilfield Interactive Globe

export interface GlobeMarker {
  lat: number
  lng: number
  label: string
  color?: string

  // Rich metadata
  metadata?: {
    region?: string
    status?: 'active' | 'operational' | 'hub' | 'partner'
    volume?: string         // e.g. "2.4M tonnes/yr"
    established?: number
    description?: string
    tradeRoutes?: string[]  // labels of connected locations
  }
}

export interface GlobeProps {
  markers?: GlobeMarker[]
  autoRotateSpeed?: number
  pointCount?: number
  pointColor?: string
  atmosphereColor?: string
  className?: string
  onMarkerClick?: (marker: GlobeMarker) => void
  onAnalyticsEvent?: (event: AnalyticsEvent) => void
  theme?: 'dark' | 'light'
  enableStoryMode?: boolean
}

export interface AnalyticsEvent {
  type: 'marker_click' | 'marker_hover' | 'region_view' | 'zoom' | 'story_step'
  marker?: string
  region?: string
  timestamp: number
  sessionId: string
}

export interface ArcData {
  from: GlobeMarker
  to: GlobeMarker
}
