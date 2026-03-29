'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

type PanelWipeProps = {
  children: React.ReactNode
  className?: string
  wipeColor?: string  // default: var(--sigma-carbon-black)
}

export default function PanelWipe({ children, className = '', wipeColor }: PanelWipeProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wipeRef.current,
        { scaleY: 1, transformOrigin: 'top center' },
        {
          scaleY: 0,
          transformOrigin: 'top center',
          ease: 'power2.inOut',
          duration: 0.001, // driven by scrub, not duration
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.2,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className={`panel-wipe-wrapper ${className}`} style={{ position: 'relative' }}>
      {/* The wipe overlay — sits on top, animates away */}
      <div
        ref={wipeRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: wipeColor || 'var(--sigma-carbon-black)',
          zIndex: 10,
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  )
}
