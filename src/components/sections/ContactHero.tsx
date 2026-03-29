'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export default function ContactHero() {
  return (
    <section
      className="page-section page-top"
      style={{
        background: 'var(--sigma-neutral-50)',
        minHeight: '45vh',
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
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          {/* SYSTEM.UMA Status Indicator */}
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--sigma-red-500)',
              boxShadow: '0 0 12px var(--sigma-red-500)',
            }}
            className="pulse-dot"
          />
          <span
            style={{
              fontFamily: 'var(--font-technical)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--sigma-neutral-500)',
            }}
          >
            SYSTEM.UMA Online
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 900,
            color: 'var(--sigma-carbon-900)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}
        >
          Direct supply lines.
          <br />
          Open communication.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: 1.75,
            color: 'var(--sigma-neutral-600)',
            maxWidth: '560px',
          }}
        >
          Request quotes, initiate procurement orders, or consult with our
          specialists. We run a lean operation focused entirely on rapid
          response to rig demands.
        </motion.p>
      </motion.div>
    </section>
  )
}
