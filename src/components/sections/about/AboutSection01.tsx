'use client'

import { motion } from 'framer-motion'
import { slideRight, slideLeft, viewportOnce } from '@/lib/animations'

export default function AboutSection01() {
  return (
    <section
      id="about-01"
      className="page-section"
      style={{
        background: 'var(--sigma-neutral-50)',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        alignItems: 'center',
      }}
    >
      {/* Left — Text */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ padding: 'clamp(64px, 8vw, 96px) clamp(32px, 5vw, 72px)' }}
      >
        <p className="section-label" style={{ marginBottom: '20px' }}>
          01 — Unveiling Our Expertise
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--sigma-carbon-900)',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          Connecting global supply chains with industrial precision.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            fontWeight: 400,
            lineHeight: 1.8,
            color: 'var(--sigma-neutral-600)',
            maxWidth: '480px',
          }}
        >
          Sigma Oilfield &amp; Industrial Supply FZCO was established to solve a
          precise problem: the gap between certified international manufacturers and
          the operational demands of oilfields across South Asia and the Middle East.
          We source what others cannot, and deliver it with documentation.
        </p>
      </motion.div>

      {/* Right — Facility placeholder */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          padding: 'clamp(64px, 8vw, 96px) clamp(32px, 5vw, 72px) clamp(64px, 8vw, 96px) 0',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            background: 'var(--sigma-carbon-800)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="section-dark"
        >
          <span
            style={{
              fontFamily: 'var(--font-technical)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Sigma Facility — Photography Coming Soon
          </span>
        </div>
      </motion.div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width: 768px) {
          #about-01 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
