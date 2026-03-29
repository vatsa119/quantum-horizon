'use client'

import { motion } from 'framer-motion'
import { slideRight, slideLeft, viewportOnce } from '@/lib/animations'

export default function AboutSection04() {
  return (
    <section
      id="about-04"
      className="page-section"
      style={{
        background: 'var(--sigma-neutral-100)',
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '45% 55%',
        alignItems: 'stretch',
      }}
    >
      {/* Left — Dark card */}
      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          background: 'var(--sigma-carbon-800)',
          padding: 'clamp(64px, 8vw, 96px) clamp(32px, 5vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
        className="section-dark"
      >
        <p
          className="section-label"
          style={{ color: 'var(--sigma-red-400)', position: 'relative', zIndex: 1 }}
        >
          04 — Excellence Anchored in Quality
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.5vw, 40px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Quality is not a checkpoint.
          <br />
          It is the foundation.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '420px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Every component we supply carries full documentation: API certification,
          material test reports, dimensional inspection records. We do not ship
          equipment that we would not commission ourselves.
        </p>
      </motion.div>

      {/* Right — Image placeholder — MUST have explicit height */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          background: 'var(--sigma-carbon-900)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="section-dark"
      >
        {/* Placeholder visual */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-technical)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.18)',
              textTransform: 'uppercase',
            }}
          >
            Equipment Inspection
          </span>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'rgba(220,38,38,0.3)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-technical)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.1)',
            }}
          >
            Photography Coming Soon
          </span>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about-04 {
            grid-template-columns: 1fr !important;
          }
          #about-04 > div {
            min-height: 60vh !important;
          }
        }
      `}</style>
    </section>
  )
}
