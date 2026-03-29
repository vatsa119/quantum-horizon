'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PixelTransition, { type PixelTransitionHandle } from '@/components/ui/PixelTransition'
import ProductGrid from '@/components/sections/ProductGrid'

// ─── SECTOR DATA ────────────────────────────────────────────────────────────

const SECTORS = [
  {
    number: '01',
    left: 'Mud Pumps &',
    right: 'Handling Tools',
    image: '/P1.png',
    sub: 'Mud pumps · Liners · Elevators',
  },
  {
    number: '02',
    left: 'Tubulars &',
    right: 'Accessories',
    image: '/P2.png',
    sub: 'Drill pipes · Casing · Collars',
  },
  {
    number: '03',
    left: 'Drilling &',
    right: 'Downhole Tools',
    image: '/P3.png',
    sub: 'Rotary equipment · Downhole motors',
  },
  {
    number: '04',
    left: 'Valves &',
    right: 'BOP Components',
    image: '/P4.png',
    sub: 'Safety valves · Kelly valves · Check valves',
  },
  {
    number: '05',
    left: 'Drilling Jars &',
    right: 'Shock Absorbers',
    image: '/P5.png',
    sub: 'Jars · Shock Absorbers · Hand tools',
  },
  {
    number: '06',
    left: 'Fishing',
    right: 'Tools',
    image: '/P6.png',
    sub: 'Overshots · Spears · Super jars',
  },
] as const

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const INTRO_VH = 100     // vh for PRODUCTS title section
const SECTOR_VH = 100    // vh per sector
const TOTAL_VH = INTRO_VH + SECTOR_VH * SECTORS.length  // 700vh total

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function ProductsCinema() {
  // Scroll progress: 0 = top of container, 1 = bottom
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSector, setActiveSector] = useState(-1)  // -1 = intro
  const [, setPrevSector] = useState(-1)
  const [sectorProgress, setSectorProgress] = useState(0)  // 0-1 within current sector
  const [sequenceDone, setSequenceDone] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const pixelRef = useRef<PixelTransitionHandle>(null)
  const lastSectorRef = useRef(-1)

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const maxScroll = container.offsetHeight - window.innerHeight
          const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1)
          setScrollProgress(progress)

          // Map progress to sector
          const totalSectors = SECTORS.length
          const introFraction = INTRO_VH / TOTAL_VH
          const sectorFraction = SECTOR_VH / TOTAL_VH

          if (progress < introFraction) {
            // Intro: PRODUCTS title
            setActiveSector(-1)
            setSectorProgress(progress / introFraction)
            setSequenceDone(false)
          } else {
            const afterIntro = progress - introFraction
            const sectorFloat = afterIntro / sectorFraction
            const sectorIndex = Math.min(Math.floor(sectorFloat), totalSectors - 1)
            const sp = sectorFloat - sectorIndex

            // Trigger pixel transition when sector changes
            if (sectorIndex !== lastSectorRef.current) {
              const incoming = sectorIndex
              pixelRef.current?.trigger(() => {
                setPrevSector(lastSectorRef.current)
                setActiveSector(incoming)
              })
              lastSectorRef.current = sectorIndex
            }

            setSectorProgress(sp)

            // Check if sequence is done
            if (progress >= 0.98) setSequenceDone(true)
            else setSequenceDone(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial call to set correct state
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Derived values ──────────────────────────────────────────────────────────

  // Text collision: left comes from -120vw to -2vw, right from +120vw to +2vw
  // At sectorProgress=0: fully separated. At sectorProgress=0.7: collided.
  const Math_pow = Math.pow
  const collisionProgress = Math.min(sectorProgress / 0.7, 1)
  const eased = 1 - Math_pow(1 - collisionProgress, 3)  // ease-out cubic

  const leftX = -120 + eased * 118   // -120vw → -2vw
  const rightX = 120 - eased * 118   //  120vw → 2vw

  // Sector number: blurred→sharp as sector enters
  const blurAmount = (1 - Math.min(sectorProgress / 0.4, 1)) * 20
  const numberScale = 0.85 + Math.min(sectorProgress / 0.4, 1) * 0.15

  // Image parallax: subtle scale from 1.08 → 1.0
  const imageScale = 1.08 - Math.min(sectorProgress / 0.6, 1) * 0.08

  // PRODUCTS intro: title slams in at introProgress > 0.2
  const introProgress = activeSector === -1 ? sectorProgress : 1

  // Current image
  const currentImage = activeSector >= 0 ? SECTORS[activeSector].image : null
  const currentSector = activeSector >= 0 ? SECTORS[activeSector] : null

  return (
    <>
      {/* ── Scroll container — sets total scroll height ── */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_VH}vh`, position: 'relative' }}
      >
        {/* ── Fixed viewport — everything inside here is pinned ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            zIndex: 1,
            background: '#0a0f18',
            overflow: 'hidden',
          }}
        >

          {/* ── Background image layer ── */}
          {currentImage && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                transform: `scale(${imageScale})`,
                transition: 'transform 0.1s linear',
              }}
            >
              <Image
                src={currentImage}
                alt={currentSector?.left ?? ''}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Dark overlay — lightens as sector progresses */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `rgba(10,15,24,${0.55 - sectorProgress * 0.15})`,
                }}
              />
            </div>
          )}

          {/* ── Dark base (shows when no image) ── */}
          {!currentImage && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#0a0f18' }} />
          )}

          {/* ── Dot grid always visible ── */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }}
          />

          {/* ── INTRO: "PRODUCTS" slam ── */}
          {activeSector === -1 && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {/* "PRODUCTS" — slams in from z-space */}
              <div
                style={{
                  transform: `perspective(1000px) scale(${0.6 + introProgress * 0.4}) translateZ(${(1 - introProgress) * -200}px)`,
                  opacity: introProgress > 0.15 ? Math.min((introProgress - 0.15) / 0.3, 1) : 0,
                  transition: 'none',
                }}
              >
                <h1
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 'clamp(80px, 16vw, 180px)',
                    fontWeight: 900,
                    letterSpacing: '-0.04em',
                    color: 'white',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  PROD
                  <span style={{ color: 'var(--sigma-red-500)' }}>U</span>
                  CTS
                </h1>
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  marginTop: '24px',
                  opacity: introProgress > 0.5 ? Math.min((introProgress - 0.5) / 0.3, 1) : 0,
                }}
              >
                Scroll to explore six sectors
              </p>

              {/* Scroll indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: introProgress > 0.6 ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  Scroll
                </span>
                {/* Animated line */}
                <div
                  style={{
                    width: '1px',
                    height: '40px',
                    background: 'linear-gradient(to bottom, rgba(220,38,38,0.8), transparent)',
                    animation: 'scroll-line 1.5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          )}

          {/* ── SECTOR DISPLAY ── */}
          {activeSector >= 0 && currentSector && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              {/* Sector number — center, blurs in */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) scale(${numberScale})`,
                  filter: `blur(${blurAmount}px)`,
                  transition: 'none',
                  zIndex: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 'clamp(120px, 25vw, 260px)',
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.06)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    display: 'block',
                    userSelect: 'none',
                  }}
                >
                  {currentSector.number}
                </span>
              </div>

              {/* LEFT running text — comes from left */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  transform: `translateY(-50%) translateX(${leftX}vw)`,
                  transition: 'none',
                  zIndex: 15,
                  paddingLeft: 'clamp(24px, 5vw, 80px)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 'clamp(28px, 5.5vw, 68px)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSector.left}
                </span>
              </div>

              {/* RIGHT running text — comes from right */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: `translateY(-50%) translateX(${rightX}vw)`,
                  transition: 'none',
                  zIndex: 15,
                  paddingRight: 'clamp(24px, 5vw, 80px)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: 'clamp(28px, 5.5vw, 68px)',
                    fontWeight: 900,
                    color: 'white',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSector.right}
                </span>
              </div>

              {/* Sub text — appears after collision (sectorProgress > 0.72) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(48px, 8vh, 80px)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: sectorProgress > 0.72 ? Math.min((sectorProgress - 0.72) / 0.15, 1) : 0,
                  transition: 'none',
                  textAlign: 'center',
                  zIndex: 15,
                }}
              >
                <p
                  style={{
                    fontFamily: "'General Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSector.sub}
                </p>
              </div>

              {/* Sector progress dots — bottom center */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'clamp(48px, 8vh, 80px)',
                  right: 'clamp(24px, 4vw, 64px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  alignItems: 'flex-end',
                  zIndex: 15,
                }}
              >
                {SECTORS.map((s, i) => (
                  <div
                    key={s.number}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {i === activeSector && (
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px',
                          color: 'rgba(255,255,255,0.4)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {s.number}
                      </span>
                    )}
                    <div
                      style={{
                        width: i === activeSector ? '24px' : '6px',
                        height: '2px',
                        background: i === activeSector
                          ? 'var(--sigma-red-500)'
                          : i < activeSector
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(255,255,255,0.12)',
                        borderRadius: '1px',
                        transition: 'width 0.3s ease, background 0.3s ease',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Top-left: sector label */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(80px, 10vh, 120px)',
                  left: 'clamp(24px, 4vw, 64px)',
                  zIndex: 15,
                  opacity: sectorProgress > 0.1 ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'var(--sigma-red-500)',
                    textTransform: 'uppercase',
                  }}
                >
                  Sigma Asset Registry · Sector {currentSector.number}
                </span>
              </div>
            </div>
          )}

          {/* ── Pixel transition canvas ── */}
          <PixelTransition ref={pixelRef} />

          {/* ── Scroll progress bar — thin red line at top ── */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '2px',
              width: `${scrollProgress * 100}%`,
              background: 'var(--sigma-red-500)',
              zIndex: 50,
              transition: 'width 0.05s linear',
            }}
          />

        </div>
        {/* end fixed viewport */}
      </div>
      {/* end scroll container */}

      {/* ── CSS keyframes ── */}

      {/* ── Product Grid — appears after sequence ── */}
      <div
        style={{
          opacity: sequenceDone ? 1 : 0,
          transform: sequenceDone ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          background: 'var(--sigma-neutral-50)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Catalog Hero Banner with P7.jpg */}
        <div
          style={{
            position: 'relative',
            height: 'clamp(320px, 45vh, 600px)',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'clamp(48px, 6vw, 80px) var(--section-padding-x)',
            zIndex: 10,
          }}
        >
          {/* P7.jpg Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/P7.jpg"
              alt="Product Catalog Overview"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Gradient overlay to ensure text readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,24,0.9) 0%, rgba(10,15,24,0.2) 60%, rgba(10,15,24,0.1) 100%)' }} />
          </div>

          {/* Banner content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: 'var(--sigma-red-400)',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              <span style={{ width: '16px', height: '1.5px', background: 'var(--sigma-red-500)' }} />
              Sigma Asset Registry
            </span>
            <h2
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              Full Product Catalog
            </h2>
            <p
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: 'clamp(14px, 2vw, 17px)',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.02em',
                lineHeight: 1.6,
                maxWidth: '600px',
              }}
            >
              Explore our comprehensive asset registry of API-certified equipment, sourced from global manufacturers and tested to the highest industry standards.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 10, background: 'var(--sigma-neutral-50)' }}>
          <ProductGrid />
        </div>
      </div>
    </>
  )
}
