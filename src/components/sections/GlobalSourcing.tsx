'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import PanelWipe from '@/components/animations/PanelWipe'
import { useCursorPosition } from '@/hooks/useCursorPosition'
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'

export default function GlobalSourcing() {
  const sectionRef = useRef<HTMLElement>(null)
  useCursorPosition(sectionRef) 

  return (
    <PanelWipe wipeColor="var(--sigma-carbon-900)">
      <section
        ref={sectionRef}
        className="sourcing-section section-dark section-grain relative overflow-hidden"
      >
        <div className="spotlight-container" />

        <div className="sourcing-inner">
          <span className="operational-badge">
            OPERATIONAL REACH
          </span>

          <motion.h2
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sourcing-headline"
          >
            <motion.div variants={fadeUp}>Global Sourcing</motion.div>
            <motion.div variants={fadeUp}>
              <span className="text-gradient">Network.</span>
            </motion.div>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="sourcing-body"
          >
            From certified OEMs across North America, Europe, and Asia to direct delivery
            at Jebel Ali — Sigma's procurement infrastructure spans 6 continents and 42 active sectors.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="stat-pills mt-4"
          >
            <motion.div variants={scaleIn} className="stat-pill">42+ Sectors</motion.div>
            <motion.div variants={scaleIn} className="stat-pill">6 Continents</motion.div>
            <motion.div variants={scaleIn} className="stat-pill">21,000m² Facility</motion.div>
          </motion.div>

          <div className="mt-8">
            <span className="cert-badge">
              API CERTIFIED PROCUREMENT
            </span>
          </div>
        </div>
      </section>
    </PanelWipe>
  )
}
