'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'

export default function AboutSection05() {
  const sectionRef = useRef<HTMLElement>(null)

  // Cursor spotlight
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      section.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
      section.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
    }
    section.addEventListener('mousemove', handleMove)
    return () => section.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      id="about-05"
      ref={sectionRef}
      className="page-section section-dark section-grain"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(96px, 12vw, 160px) var(--section-padding-x)',
      }}
    >
      {/* Cursor spotlight */}
      <div className="spotlight-container" />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Built by industry. Guided by precision.
      </motion.p>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="section-label"
        style={{
          justifyContent: 'center',
          color: 'var(--sigma-red-400)',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        05 — Vision for the Future
      </motion.p>

      <motion.blockquote
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        style={{
          fontFamily: 'var(--font-editorial)',
          fontSize: 'clamp(28px, 4.5vw, 60px)',
          fontWeight: 700,
          fontStyle: 'italic',
          color: 'white',
          lineHeight: 1.25,
          maxWidth: '900px',
          quotes: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      >
        &ldquo;To operate in every major oilfield basin — with the same reliability
        we bring to every single order.&rdquo;
      </motion.blockquote>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          width: '48px',
          height: '2px',
          background: 'var(--sigma-red-500)',
          margin: '40px auto 0',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </section>
  )
}
