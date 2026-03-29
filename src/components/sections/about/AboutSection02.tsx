'use client'

import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'

export default function AboutSection02() {
  return (
    <section
      id="about-02"
      className="page-section section-dark section-grain"
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vw, 120px) var(--section-padding-x)',
        textAlign: 'center',
      }}
    >
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="section-label"
        style={{ marginBottom: '32px', justifyContent: 'center', color: 'var(--sigma-red-400)' }}
      >
        02 — Guiding Mission
      </motion.p>

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: 'clamp(22px, 3.5vw, 42px)',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'white',
          lineHeight: 1.35,
          maxWidth: '820px',
          margin: '0 auto',
          quotes: 'none',
        }}
      >
        &ldquo;To be the most trusted technical supply partner for operators who
        cannot afford imprecision.&rdquo;
      </motion.blockquote>
    </section>
  )
}
