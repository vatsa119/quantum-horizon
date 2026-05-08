'use client'

/**
 * SphereH — Production Interactive Globe
 * ────────────────────────────────────────
 * Features:
 *  • Accurate land-dot generation from GeoJSON-inspired polygons
 *  • Animated arcs between trade route locations
 *  • Glowing pulsing markers with depth lighting
 *  • Hover tooltips + click info panel + chip↔globe sync
 *  • Zoom / drag / focus-on-click with smooth camera transitions
 *  • Day/night atmosphere shader
 *  • Story mode: guided camera tour
 *  • Keyboard navigation + ARIA fallback list
 *  • Analytics hook via onAnalyticsEvent prop
 *  • Instanced rendering + adaptive LOD
 *  • Mobile-aware gesture handling
 */

import {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
  Suspense,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, shaderMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { geoContains } from 'd3-geo'
import type { GlobeMarker, GlobeProps, ArcData, AnalyticsEvent } from '@/types/globe'

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const R = 2                    // globe radius
const ATM_R = 2.18             // atmosphere shell radius
const MIN_DIST = 2.8
const MAX_DIST = 9

const BRAND = {
  red:      '#dc2626',
  redDim:   '#991b1b',
  redGlow:  '#ef4444',
  blue:     '#000000',
  blueLight:'#111111',
  carbon:   '#000000',
  dot:      '#ffffff',
  dotBright:'#ffffff',
  arc:      '#666666',
  arcGlow:  '#ffffff',
  atm:      '#111111',
}

// ─── ANALYTICS SESSION ────────────────────────────────────────────────────────

const SESSION_ID = Math.random().toString(36).slice(2)
function mkEvent(type: AnalyticsEvent['type'], extra: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
  return { type, timestamp: Date.now(), sessionId: SESSION_ID, ...extra }
}

// ─── GEOJSON CONTINENTS ───────────────────────────────────────────────────────

function latLngToVec3(lat: number, lng: number, r = R): THREE.Vector3 {
  const φ = (lat * Math.PI) / 180
  const λ = (lng * Math.PI) / 180
  return new THREE.Vector3(
    r * Math.cos(φ) * Math.cos(λ),
    r * Math.sin(φ),
    r * Math.cos(φ) * Math.sin(λ),
  )
}

function GeoJSONContinents({ count, color, mode }: { count: number; color: string; mode: 'outline' | 'dots' }) {
  const ref = useRef<THREE.Group>(null)
  const [geoData, setGeoData] = useState<any>(null)
  const [pointsPositions, setPointsPositions] = useState<Float32Array | null>(null)
  const [lineGeometries, setLineGeometries] = useState<THREE.BufferGeometry[]>([])

  useEffect(() => {
    fetch('/world.geo.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.warn('Could not load geojson:', err))
  }, [])

  useEffect(() => {
    if (!geoData) return

    // Precalculate outlines
    const lines: THREE.BufferGeometry[] = []
    geoData.features.forEach((feature: any) => {
      if (feature?.geometry?.type === 'Polygon') {
        feature.geometry.coordinates.forEach((ring: number[][]) => {
          const pts = ring.map(c => latLngToVec3(c[1], c[0]))
          lines.push(new THREE.BufferGeometry().setFromPoints(pts))
        })
      } else if (feature?.geometry?.type === 'MultiPolygon') {
        feature.geometry.coordinates.forEach((poly: number[][][]) => {
          poly.forEach((ring: number[][]) => {
            const pts = ring.map(c => latLngToVec3(c[1], c[0]))
            lines.push(new THREE.BufferGeometry().setFromPoints(pts))
          })
        })
      }
    })
    setLineGeometries(lines)

    // Precalculate dots with setTimeout so it doesn't block UI Thread
    let active = true
    setTimeout(() => {
      if (!active) return
      const PHI = Math.PI * (3 - Math.sqrt(5))
      const positions: number[] = []
      const total = count * 6
      for (let i = 0; i < total && positions.length / 3 < count; i++) {
        const y = 1 - (i / (total - 1)) * 2
        const radius = Math.sqrt(Math.max(0, 1 - y * y))
        const theta = PHI * i
        
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius
        
        const lat = Math.asin(Math.max(-1, Math.min(1, y))) * (180 / Math.PI)
        const lng = Math.atan2(z, x) * (180 / Math.PI)
        
        if (geoContains(geoData, [lng, lat])) {
          const jitter = (Math.random() - 0.5) * 0.008
          positions.push((x + jitter) * R, (y + jitter) * R, (z + jitter) * R)
        }
      }
      setPointsPositions(new Float32Array(positions))
    }, 50)
    return () => { active = false }
  }, [geoData, count])

  const ptMaterial = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.018,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
  }), [color])

  const lineMaterial = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.7,
  }), [color])

  const pointsRef = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    pointsRef.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.003)
  })

  return (
    <group ref={ref}>
      {mode === 'dots' && pointsPositions && (
        <points ref={pointsRef} material={ptMaterial}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pointsPositions.length / 3}
              array={pointsPositions}
              itemSize={3}
            />
          </bufferGeometry>
        </points>
      )}
      {mode === 'outline' && lineGeometries.map((geo, i) => (
        <line key={i} geometry={geo} material={lineMaterial} />
      ))}
    </group>
  )
}

// ─── ATMOSPHERE SHADER ────────────────────────────────────────────────────────

const atmVert = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmFrag = `
  uniform vec3 uColor;
  uniform vec3 uColor2;
  uniform float uTime;
  varying vec3 vNormal;
  void main() {
    float rim = pow(max(0.0, 0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.8);
    float pulse = 1.0 + sin(uTime * 0.5) * 0.06;
    vec3 col = mix(uColor, uColor2, rim * 0.6);
    gl_FragColor = vec4(col, min(rim * pulse, 0.65));
  }
`

function Atmosphere() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uColor:  { value: new THREE.Color(BRAND.atm) },
    uColor2: { value: new THREE.Color(0.2, 0.2, 0.2) },
    uTime:   { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh>
      <sphereGeometry args={[ATM_R, 48, 48]} />
      <shaderMaterial
        ref={ref}
        vertexShader={atmVert}
        fragmentShader={atmFrag}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── INNER GLOW SPHERE ────────────────────────────────────────────────────────

function GlobeCore() {
  return (
    <mesh>
      <sphereGeometry args={[R - 0.01, 48, 48]} />
      <meshPhongMaterial
        color={new THREE.Color(BRAND.blue)}
        emissive={new THREE.Color('#000000')}
        emissiveIntensity={0.4}
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </mesh>
  )
}

// ─── ANIMATED TRADE ARC ───────────────────────────────────────────────────────

function TradeArc({ from, to, active }: { from: GlobeMarker; to: GlobeMarker; active: boolean }) {
  const ref = useRef<THREE.Line>(null)
  const progressRef = useRef(Math.random())  // staggered start

  const { points, tubePoints } = useMemo(() => {
    const a = latLngToVec3(from.lat, from.lng, R + 0.04)
    const b = latLngToVec3(to.lat, to.lng, R + 0.04)
    const mid = a.clone().add(b).multiplyScalar(0.5)
    const dist = a.distanceTo(b)
    mid.normalize().multiplyScalar(R + dist * 0.55)

    const curve = new THREE.QuadraticBezierCurve3(a, mid, b)
    const pts = curve.getPoints(80)
    return { points: pts, tubePoints: curve }
  }, [from, to])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints(points)
    return g
  }, [points])

  // Animated dash offset
  useFrame(({ clock }) => {
    if (!ref.current) return
    progressRef.current = (progressRef.current + 0.003) % 1
    const mat = ref.current.material as THREE.LineDashedMaterial
    mat.dashOffset = -progressRef.current * 20
    mat.opacity = active ? 0.9 : 0.3
  })

  return (
    <line ref={ref} geometry={geometry}>
      <lineDashedMaterial
        color={active ? BRAND.arcGlow : BRAND.arc}
        dashSize={0.12}
        gapSize={0.08}
        transparent
        opacity={active ? 0.9 : 0.3}
        linewidth={1}
      />
    </line>
  )
}

// ─── GLOW MARKER ──────────────────────────────────────────────────────────────

interface MarkerProps {
  marker: GlobeMarker
  active: boolean
  onHover: (m: GlobeMarker | null) => void
  onSelect: (m: GlobeMarker) => void
  onAnalytics: (e: AnalyticsEvent) => void
  groupRotation: THREE.Euler
}

function GlowMarker({ marker, active, onHover, onSelect, onAnalytics, groupRotation }: MarkerProps) {
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const core  = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const pos = useMemo((): [number, number, number] => {
    const v = latLngToVec3(marker.lat, marker.lng, R + 0.03)
    return [v.x, v.y, v.z]
  }, [marker.lat, marker.lng])

  // Billboard normal (point away from globe center)
  const normal = useMemo(() => {
    const v = new THREE.Vector3(...pos).normalize()
    return v
  }, [pos])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (ringA.current) {
      const p1 = ((t * 1.1) % 1)
      ringA.current.scale.setScalar(1 + p1 * 3)
      ;(ringA.current.material as THREE.MeshBasicMaterial).opacity =
        (1 - p1) * (hovered || active ? 1 : 0.55)
    }

    if (ringB.current) {
      const p2 = ((t * 1.1 + 0.4) % 1)
      ringB.current.scale.setScalar(1 + p2 * 3)
      ;(ringB.current.material as THREE.MeshBasicMaterial).opacity =
        (1 - p2) * (hovered || active ? 0.7 : 0.3)
    }

    if (core.current) {
      const s = (hovered || active) ? 1 + Math.sin(t * 4) * 0.2 : 1 + Math.sin(t * 2) * 0.1
      core.current.scale.setScalar(s)
    }
  })

  const color = marker.color ?? BRAND.red
  const status = marker.metadata?.status ?? 'active'
  const statusColor = {
    hub: '#f59e0b',
    active: BRAND.red,
    operational: '#10b981',
    partner: '#6366f1',
  }[status]

  const handleEnter = useCallback(() => {
    setHovered(true)
    onHover(marker)
    onAnalytics(mkEvent('marker_hover', { marker: marker.label }))
    document.body.style.cursor = 'pointer'
  }, [marker, onHover, onAnalytics])

  const handleLeave = useCallback(() => {
    setHovered(false)
    onHover(null)
    document.body.style.cursor = 'auto'
  }, [onHover])

  const handleClick = useCallback(() => {
    onSelect(marker)
    onAnalytics(mkEvent('marker_click', { marker: marker.label }))
  }, [marker, onSelect, onAnalytics])

  return (
    <group
      position={pos}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onClick={handleClick}
    >
      {/* Ring A — fast pulse */}
      <mesh ref={ringA} lookAt={new THREE.Vector3(0, 0, 0).sub(new THREE.Vector3(...pos))}>
        <ringGeometry args={[0.035, 0.052, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.55} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Ring B — offset pulse */}
      <mesh ref={ringB} lookAt={new THREE.Vector3(0, 0, 0).sub(new THREE.Vector3(...pos))}>
        <ringGeometry args={[0.035, 0.052, 32]} />
        <meshBasicMaterial color={statusColor} transparent opacity={0.35} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Core sphere */}
      <mesh ref={core}>
        <sphereGeometry args={[0.028, 10, 10]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={hovered || active ? 2.5 : 1.2}
          roughness={0}
          metalness={0.3}
        />
      </mesh>

      {/* Hover Tooltip */}
      {(hovered || active) && (
        <Html
          distanceFactor={5}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
          zIndexRange={[100, 0]}
        >
          <div style={{
            background: 'rgba(8, 12, 22, 0.96)',
            border: `1px solid ${statusColor}55`,
            borderLeft: `2px solid ${statusColor}`,
            borderRadius: '8px',
            padding: '10px 14px',
            minWidth: '160px',
            boxShadow: `0 0 24px ${statusColor}33, 0 8px 32px rgba(0,0,0,0.6)`,
            backdropFilter: 'blur(12px)',
            fontFamily: "'JetBrains Mono', monospace",
            transform: 'translateX(18px) translateY(-50%)',
          }}>
            <div style={{ color: 'white', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
              {marker.label}
            </div>
            {marker.metadata?.status && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor, flexShrink: 0, boxShadow: `0 0 6px ${statusColor}` }} />
                <span style={{ color: statusColor, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {marker.metadata.status}
                </span>
              </div>
            )}
            {marker.metadata?.volume && (
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '9px', letterSpacing: '0.06em', marginTop: '2px' }}>
                {marker.metadata.volume}
              </div>
            )}
            {marker.metadata?.region && (
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '8px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {marker.metadata.region}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  )
}

// ─── CAMERA CONTROLLER ────────────────────────────────────────────────────────

function CameraRig({
  target,
  autoRotateSpeed,
  paused,
  groupRef,
}: {
  target: GlobeMarker | null
  autoRotateSpeed: number
  paused: boolean
  groupRef: React.RefObject<THREE.Group>
}) {
  const { camera } = useThree()
  const targetRotY = useRef(0)
  const targetRotX = useRef(0)

  // Focus on clicked marker: rotate globe so marker faces camera
  useEffect(() => {
    if (!target || !groupRef.current) return
    const v = latLngToVec3(target.lat, target.lng)
    // We want that vector to face (0,0,1) in world space
    // So we need to rotate the group
    const targetY = -Math.atan2(v.x, v.z)
    const targetX = -Math.asin(v.y / v.length())
    targetRotY.current = targetY
    targetRotX.current = targetX * 0.5
  }, [target, groupRef])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (target) {
      // Smooth snap to focused marker
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, targetRotY.current, delta * 2.5
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, targetRotX.current, delta * 2.5
      )
    } else if (!paused) {
      groupRef.current.rotation.y += delta * autoRotateSpeed * 0.1
    }
  })

  return null
}

// ─── GLOBE SCENE ──────────────────────────────────────────────────────────────

function GlobeScene({
  markers = [],
  autoRotateSpeed = 0.25,
  pointCount,
  pointColor = BRAND.dot,
  onMarkerClick,
  onAnalyticsEvent,
  selectedMarker,
  onSelectMarker,
  fillMode,
}: Omit<GlobeProps, 'className' | 'theme'> & {
  selectedMarker: GlobeMarker | null
  onSelectMarker: (m: GlobeMarker | null) => void
  fillMode: 'outline' | 'dots'
}) {
  const groupRef    = useRef<THREE.Group>(null)
  const controlsRef = useRef<any>(null)
  const [hoveredMarker, setHoveredMarker] = useState<GlobeMarker | null>(null)
  const [paused, setPaused] = useState(false)

  const { gl, size } = useThree()

  const isMobile = size.width < 768

  const adaptiveCount = useMemo(() => {
    if (pointCount) return pointCount
    const dpr = gl.getPixelRatio()
    const base = isMobile ? 9000 : 20000
    return dpr > 2 ? Math.floor(base * 0.65) : base
  }, [pointCount, gl, isMobile])

  // Build arc list from trade routes in metadata
  const arcs = useMemo((): ArcData[] => {
    const result: ArcData[] = []
    const seen = new Set<string>()
    markers.forEach(m => {
      if (!m.metadata?.tradeRoutes) return
      m.metadata.tradeRoutes.forEach(routeLabel => {
        const target = markers.find(x => x.label === routeLabel)
        if (!target) return
        const key = [m.label, routeLabel].sort().join('|')
        if (seen.has(key)) return
        seen.add(key)
        result.push({ from: m, to: target })
      })
    })
    return result
  }, [markers])

  const handleAnalytics = useCallback((e: AnalyticsEvent) => {
    onAnalyticsEvent?.(e)
  }, [onAnalyticsEvent])

  const handleMarkerClick = useCallback((marker: GlobeMarker) => {
    onSelectMarker(selectedMarker?.label === marker.label ? null : marker)
    onMarkerClick?.(marker)
    setPaused(true)
    // Resume auto-rotate after 4s
    setTimeout(() => setPaused(false), 4000)
  }, [onSelectMarker, onMarkerClick, selectedMarker])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!groupRef.current) return
      const STEP = 0.06
      const map: Record<string, () => void> = {
        ArrowLeft:  () => { groupRef.current!.rotation.y -= STEP },
        ArrowRight: () => { groupRef.current!.rotation.y += STEP },
        ArrowUp:    () => { groupRef.current!.rotation.x -= STEP },
        ArrowDown:  () => { groupRef.current!.rotation.x += STEP },
        Escape:     () => onSelectMarker(null),
      }
      map[e.key]?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onSelectMarker])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <directionalLight position={[6, 4, 5]} intensity={1.1} color="#ffffff" castShadow />
      <directionalLight position={[-6, -2, -4]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 0, 6]} intensity={0.3} color="#ffffff" />

      {/* Camera controller */}
      <CameraRig
        target={selectedMarker}
        autoRotateSpeed={autoRotateSpeed}
        paused={paused || !!hoveredMarker}
        groupRef={groupRef as React.RefObject<THREE.Group>}
      />

      {/* Globe group */}
      <group ref={groupRef}>
        {/* Core sphere */}
        <GlobeCore />

        {/* GeoJSON driven rendering toggle */}
        <GeoJSONContinents count={adaptiveCount} color={pointColor} mode={fillMode} />

        {/* Atmosphere */}
        <Atmosphere />

        {/* Trade arcs */}
        {arcs.map(arc => (
          <TradeArc
            key={`${arc.from.label}-${arc.to.label}`}
            from={arc.from}
            to={arc.to}
            active={
              selectedMarker?.label === arc.from.label ||
              selectedMarker?.label === arc.to.label
            }
          />
        ))}

        {/* Markers */}
        {markers.map(marker => (
          <GlowMarker
            key={`${marker.lat}-${marker.lng}`}
            marker={marker}
            active={selectedMarker?.label === marker.label}
            onHover={setHoveredMarker}
            onSelect={handleMarkerClick}
            onAnalytics={handleAnalytics}
            groupRotation={groupRef.current?.rotation ?? new THREE.Euler()}
          />
        ))}
      </group>

      {/* Orbit controls */}
      <OrbitControls
        ref={controlsRef}
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={isMobile ? 0.4 : 0.55}
        zoomSpeed={0.7}
        minDistance={MIN_DIST}
        maxDistance={MAX_DIST}
        autoRotate={false}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_ROTATE,
        }}
      />

      {/* Post FX */}
      <EffectComposer multisampling={4}>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation={false}
          modulationOffset={0.5}
        />
      </EffectComposer>
    </>
  )
}

// ─── INFO PANEL ───────────────────────────────────────────────────────────────

function InfoPanel({ marker, onClose }: { marker: GlobeMarker; onClose: () => void }) {
  const status = marker.metadata?.status ?? 'active'
  const statusColor = {
    hub: '#f59e0b',
    active: BRAND.red,
    operational: '#10b981',
    partner: '#6366f1',
  }[status]

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        left: 24,
        width: 'clamp(220px, 28%, 300px)',
        background: 'rgba(6, 10, 20, 0.95)',
        border: `1px solid ${statusColor}44`,
        borderLeft: `3px solid ${statusColor}`,
        borderRadius: 12,
        padding: '18px 20px',
        backdropFilter: 'blur(20px)',
        boxShadow: `0 0 40px ${statusColor}22, 0 24px 48px rgba(0,0,0,0.7)`,
        fontFamily: "'JetBrains Mono', monospace",
        zIndex: 10,
        animation: 'slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      role="dialog"
      aria-label={`Details for ${marker.label}`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 10, right: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1,
          padding: '2px 5px', borderRadius: 4,
        }}
        aria-label="Close panel"
      >
        ×
      </button>

      {/* Status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: statusColor,
          boxShadow: `0 0 10px ${statusColor}`,
          animation: 'pulse-dot 1.5s ease infinite',
          flexShrink: 0,
        }} />
        <span style={{ color: statusColor, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {status}
        </span>
      </div>

      {/* Label */}
      <div style={{ color: 'white', fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 6 }}>
        {marker.label}
      </div>

      {/* Metadata rows */}
      {marker.metadata?.region && (
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          {marker.metadata.region}
        </div>
      )}

      {marker.metadata?.description && (
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, lineHeight: 1.6, marginBottom: 12, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10 }}>
          {marker.metadata.description}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {marker.metadata?.volume && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Volume</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600 }}>{marker.metadata.volume}</span>
          </div>
        )}
        {marker.metadata?.established && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Est.</span>
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: 600 }}>{marker.metadata.established}</span>
          </div>
        )}
        {marker.metadata?.tradeRoutes && (
          <div style={{ marginTop: 4 }}>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 5 }}>
              Trade Routes
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {marker.metadata.tradeRoutes.map(r => (
                <span key={r} style={{
                  padding: '2px 7px', background: `${statusColor}15`,
                  border: `1px solid ${statusColor}30`, borderRadius: 100,
                  color: 'rgba(255,255,255,0.55)', fontSize: 8, letterSpacing: '0.06em',
                }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Coordinates */}
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.2)', fontSize: 8, letterSpacing: '0.06em' }}>
        {marker.lat.toFixed(4)}°N · {marker.lng.toFixed(4)}°E
      </div>
    </div>
  )
}

// ─── STORY MODE ───────────────────────────────────────────────────────────────

function StoryModeUI({
  markers,
  step,
  onNext,
  onPrev,
  onExit,
}: {
  markers: GlobeMarker[]
  step: number
  onNext: () => void
  onPrev: () => void
  onExit: () => void
}) {
  const m = markers[step]
  return (
    <div style={{
      position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(6,10,20,0.95)', border: '1px solid rgba(220,38,38,0.3)',
      borderRadius: 12, padding: '12px 20px',
      display: 'flex', alignItems: 'center', gap: 16,
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      fontFamily: "'JetBrains Mono', monospace",
      zIndex: 20, minWidth: 280,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ color: 'rgba(220,38,38,0.8)', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>
          Story Mode · {step + 1} / {markers.length}
        </div>
        <div style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{m?.label}</div>
        {m?.metadata?.description && (
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, marginTop: 4, maxWidth: 220 }}>
            {m.metadata.description}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={onPrev} disabled={step === 0} style={navBtnStyle}>‹</button>
        <button onClick={onNext} disabled={step === markers.length - 1} style={navBtnStyle}>›</button>
        <button onClick={onExit} style={{ ...navBtnStyle, background: 'rgba(220,38,38,0.2)', color: '#ef4444' }}>✕</button>
      </div>
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.06)', color: 'white', cursor: 'pointer',
  fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
}

// ─── ACCESSIBILITY FALLBACK LIST ──────────────────────────────────────────────

function FallbackList({ markers }: { markers: GlobeMarker[] }) {
  return (
    <div role="list" aria-label="Sigma operational locations" style={{ display: 'none' }}>
      {markers.map(m => (
        <div key={m.label} role="listitem" aria-label={m.label}>
          {m.label} — Lat: {m.lat}, Lng: {m.lng}
          {m.metadata?.description && ` — ${m.metadata.description}`}
        </div>
      ))}
    </div>
  )
}

// ─── CHIP LIST ────────────────────────────────────────────────────────────────

function LocationChips({
  markers,
  selectedLabel,
  onSelect,
}: {
  markers: GlobeMarker[]
  selectedLabel: string | null
  onSelect: (m: GlobeMarker | null) => void
}) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', gap: 8,
      justifyContent: 'center', padding: '0 8px',
    }} role="list" aria-label="Location filter chips">
      {markers.map(m => {
        const status = m.metadata?.status ?? 'active'
        const statusColor = {
          hub: '#f59e0b',
          active: BRAND.red,
          operational: '#10b981',
          partner: '#6366f1',
        }[status]
        const isActive = selectedLabel === m.label
        return (
          <button
            key={m.label}
            role="listitem"
            aria-pressed={isActive}
            aria-label={`Focus on ${m.label}`}
            onClick={() => onSelect(isActive ? null : m)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 13px',
              background: isActive ? `${statusColor}22` : 'rgba(220,38,38,0.06)',
              border: `1px solid ${isActive ? statusColor : 'rgba(220,38,38,0.18)'}`,
              borderRadius: 100,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10, letterSpacing: '0.06em',
              color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? `0 0 14px ${statusColor}44` : 'none',
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: isActive ? statusColor : BRAND.red,
              boxShadow: isActive ? `0 0 8px ${statusColor}` : 'none',
              flexShrink: 0,
            }} />
            {m.label}
          </button>
        )
      })}
    </div>
  )
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────

export default function SphereH({
  markers = [],
  autoRotateSpeed = 0.25,
  pointCount,
  pointColor = BRAND.dot,
  atmosphereColor = BRAND.atm,
  className = '',
  onMarkerClick,
  onAnalyticsEvent,
  theme = 'dark',
  enableStoryMode = false,
}: GlobeProps) {
  const [mounted, setMounted]   = useState(false)
  const [selected, setSelected] = useState<GlobeMarker | null>(null)
  const [storyMode, setStoryMode] = useState(false)
  const [storyStep, setStoryStep] = useState(0)
  const [fillMode, setFillMode] = useState<'outline' | 'dots'>('outline')

  useEffect(() => { setMounted(true) }, [])

  // Story mode: auto-advance
  useEffect(() => {
    if (!storyMode) return
    setSelected(markers[storyStep])
    const id = setTimeout(() => {
      if (storyStep < markers.length - 1) setStoryStep(s => s + 1)
      else setStoryMode(false)
    }, 3500)
    return () => clearTimeout(id)
  }, [storyMode, storyStep, markers])

  const handleAnalytics = useCallback((e: AnalyticsEvent) => {
    onAnalyticsEvent?.(e)
    // Could send to analytics endpoint here
  }, [onAnalyticsEvent])

  if (!mounted) {
    return (
      <div className={className} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: BRAND.red,
            animation: 'pulse-dot 1s ease infinite',
          }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: '0.12em', fontFamily: 'monospace' }}>
            LOADING GRID
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}
    >
      {/* CSS keyframes injected once */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Globe container */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          background: 'rgba(6,10,20,0.4)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 0 80px rgba(26,39,68,0.5), inset 0 0 40px rgba(6,10,20,0.5)',
          backdropFilter: 'blur(20px)',
        }}
        role="img"
        aria-label="Interactive 3D globe showing Sigma Oilfield global operations across Middle East and South Asia. Use arrow keys to rotate, scroll to zoom, click markers for details."
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 43 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <GlobeScene
              markers={markers}
              autoRotateSpeed={autoRotateSpeed}
              pointCount={pointCount}
              pointColor={pointColor}
              onMarkerClick={onMarkerClick}
              onAnalyticsEvent={handleAnalytics}
              selectedMarker={selected}
              onSelectMarker={setSelected}
              fillMode={fillMode}
            />
          </Suspense>
        </Canvas>

        {/* Info panel */}
        {selected && (
          <InfoPanel marker={selected} onClose={() => setSelected(null)} />
        )}

        {/* Story mode UI */}
        {storyMode && (
          <StoryModeUI
            markers={markers}
            step={storyStep}
            onNext={() => setStoryStep(s => Math.min(s + 1, markers.length - 1))}
            onPrev={() => setStoryStep(s => Math.max(s - 1, 0))}
            onExit={() => { setStoryMode(false); setSelected(null) }}
          />
        )}

        {/* Controls hint */}
        <div style={{
          position: 'absolute', bottom: 14, right: 16,
          display: 'flex', gap: 10, alignItems: 'center',
        }}>
          {enableStoryMode && !storyMode && (
            <button
              onClick={() => { setStoryStep(0); setStoryMode(true) }}
              style={{
                background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.35)',
                borderRadius: 8, padding: '5px 12px', color: 'rgba(220,38,38,0.9)',
                fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer',
              }}
              aria-label="Start guided story tour"
            >
              ▶ Tour
            </button>
          )}
          <button
            onClick={() => setFillMode(fillMode === 'outline' ? 'dots' : 'outline')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8, padding: '5px 12px', color: 'rgba(255,255,255,0.8)',
              fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: "'JetBrains Mono', monospace", cursor: 'pointer',
            }}
            aria-label="Toggle between outline and dot rendering"
          >
            {fillMode === 'outline' ? 'Fill Mode' : 'Outline Mode'}
          </button>
          <span style={{
            color: 'rgba(255,255,255,0.18)', fontSize: 8,
            fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em',
          }}>
            Drag · Scroll · Click
          </span>
        </div>

        {/* Grid overlay lines for aesthetics */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, transparent 55%, rgba(220,38,38,0.03) 100%)
          `,
          borderRadius: 'inherit',
        }} />
      </div>

      {/* Location chips — synced with globe */}
      <LocationChips
        markers={markers}
        selectedLabel={selected?.label ?? null}
        onSelect={setSelected}
      />

      {/* Accessibility fallback */}
      <FallbackList markers={markers} />
    </div>
  )
}
