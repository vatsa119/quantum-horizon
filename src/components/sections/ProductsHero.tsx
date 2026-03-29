'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { fadeUp, staggerFast, scaleIn } from '@/lib/animations'

export default function ProductsHero() {
  return (
    <section
      className="bg-[var(--sigma-neutral-50)]"
      style={{
        paddingTop: 'calc(80px + clamp(48px, 8vh, 96px))',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        paddingLeft: 'var(--section-padding-x)',
        paddingRight: 'var(--section-padding-x)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-8">
        <p className="section-label">
          <span className="section-label__line" />
          SIGMA ASSET REGISTRY
        </p>

        <motion.h1
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(56px, 8vw, 100px)',
            color: 'var(--sigma-carbon-900)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          <motion.div variants={fadeUp}>Asset</motion.div>
          <motion.div variants={fadeUp} style={{ color: 'var(--sigma-red-500)' }}>
            Precision.
          </motion.div>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: 'General Sans, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            color: 'var(--sigma-neutral-600)',
            maxWidth: '520px',
            lineHeight: 1.6,
          }}
        >
          Sourced from certified global manufacturers across 6 operational sectors. Every component backed by API certification and ISO quality management.
        </motion.p>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-4"
        >
          <span className="cert-badge" style={{ color: 'var(--sigma-success)', background: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.2)' }}>
            <CheckCircle size={14} color="var(--sigma-success)" />
            API CERTIFIED REGISTRY ACTIVE
          </span>
        </motion.div>
      </div>
    </section>
  )
}
