'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export default function AboutHero() {
  return (
    <section
      className="page-section page-top"
      style={{
        background: 'var(--sigma-neutral-50)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(64px, 8vh, 96px) var(--section-padding-x)',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '800px' }}
      >
        {/* Section label */}
        <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: '24px' }}>
          Sigma Oilfield
        </motion.p>

        {/* Headline — two lines, Playfair italic */}
        <motion.h1 variants={fadeUp} style={{ marginBottom: '28px' }}>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--sigma-carbon-900)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Unveiling
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 700,
              fontStyle: 'italic',
              color: 'var(--sigma-carbon-900)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            Our Expertise
            <span style={{ color: 'var(--sigma-red-500)' }}>.</span>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: 1.75,
            color: 'var(--sigma-neutral-600)',
            maxWidth: '580px',
          }}
        >
          Two decades of industrial supply experience, distilled into a single
          precision-focused operation serving the world&apos;s most demanding oilfields.
        </motion.p>
      </motion.div>
    </section>
  )
}
