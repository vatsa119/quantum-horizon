'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { slideRight, slideLeft, staggerContainer, fadeUp, viewportOnce } from '@/lib/animations'
import { Check } from 'lucide-react'

const CHECKLIST = [
  'Lubricants', 'RIG Tools',
  'Chemicals', 'Drilling Additives',
  'Spare Parts', 'Valve Seals',
  'PPE Gear', 'Safety Systems',
]

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const duration = 1800
          const start = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}</span>
}

export default function AboutSection03() {
  return (
    <section
      id="about-03"
      className="page-section"
      style={{
        background: 'var(--sigma-white)',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: 'clamp(80px, 10vw, 120px) var(--section-padding-x)',
        gap: 'clamp(40px, 6vw, 80px)',
      }}
    >
      {/* Left — Checklist */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <p className="section-label" style={{ marginBottom: '20px' }}>
          03 — Elevating Industry Excellence
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 700,
            color: 'var(--sigma-carbon-900)',
            lineHeight: 1.2,
            marginBottom: '32px',
            letterSpacing: '-0.01em',
          }}
        >
          A standard of excellence built on certification.
        </h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 24px',
          }}
        >
          {CHECKLIST.map((item) => (
            <motion.div
              key={item}
              variants={fadeUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                borderBottom: '0.5px solid var(--sigma-neutral-100)',
              }}
            >
              <Check
                size={14}
                style={{ color: 'var(--sigma-red-500)', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--sigma-carbon-900)',
                }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right — Stats card */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <div
          style={{
            background: 'var(--sigma-carbon-800)',
            borderRadius: '20px',
            padding: 'clamp(32px, 5vw, 52px)',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="section-dark"
        >
          {/* 95% stat */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
              marginBottom: '20px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(64px, 8vw, 88px)',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              <AnimatedCounter target={95} />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 52px)',
                fontWeight: 700,
                color: 'var(--sigma-red-500)',
                lineHeight: 1,
              }}
            >
              %
            </span>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '16px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Performance Index
          </p>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            ISO 9001:2015 certified quality management across all procurement operations.
          </p>

          <span
            className="cert-badge"
            style={{ position: 'relative', zIndex: 1 }}
          >
            ISO 9001:2015 Certified
          </span>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about-03 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
