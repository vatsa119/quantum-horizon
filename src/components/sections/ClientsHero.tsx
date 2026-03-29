'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'

export default function ClientsHero() {
  return (
    <section
      className="page-section page-top"
      style={{
        background: 'var(--sigma-neutral-50)',
        minHeight: '55vh',
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
        <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: '24px' }}>
          Network 04
        </motion.p>

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
            }}
          >
            The
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
            }}
          >
            Clientele
            <span style={{ color: 'var(--sigma-red-500)' }}>.</span>
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '18px',
            lineHeight: 1.75,
            color: 'var(--sigma-neutral-600)',
            maxWidth: '560px',
            marginBottom: '32px',
          }}
        >
          From India&apos;s largest national operators to Dubai&apos;s premier
          procurement networks — Sigma supplies where precision cannot be compromised.
        </motion.p>

        {/* Stat row */}
        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {[
            { value: '4', label: 'Key Partners' },
            { value: '3', label: 'Countries' },
            { value: 'API', label: 'Certified Supply' },
          ].map(({ value, label }, i) => (
            <span key={i}>
              {i > 0 && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '1px',
                    height: '20px',
                    background: 'var(--sigma-neutral-300)',
                    marginRight: '32px',
                    verticalAlign: 'middle',
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--sigma-carbon-900)',
                }}
              >
                {value}{' '}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--sigma-neutral-500)',
                }}
              >
                {label}
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
