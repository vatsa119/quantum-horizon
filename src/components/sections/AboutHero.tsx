'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeUp, staggerContainer } from '@/lib/animations'

/**
 * PLAN:
 * 1. Full-width hero section for the 'About' page using next/image for optimization.
 * 2. Background image: /assets/About_Us1.jpg with fill and priority.
 * 3. Gradient Overlay: CSS variables used instead of hex codes.
 * 4. Typography: Correct font classes for editorial and display styles.
 * 5. Responsiveness: Object-position shifts on mobile.
 */

export default function AboutHero() {
  return (
    <section 
      className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-neutral-950"
      id="about-hero"
    >
      {/* Background Image — Optimized with Next/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/About_Us1.jpg"
          alt="Sigma Oilfield engineers working at an industrial site"
          fill
          priority
          className="object-cover object-center md:object-[70%_center]"
          sizes="100vw"
        />
      </div>
      
      {/* Subtle Dark Linear Gradient Overlay (Left-to-Right) */}
      <div 
        className="absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(to right, var(--sigma-carbon-black) 0%, rgba(10, 15, 24, 0.4) 60%, transparent 100%)'
        }}
      />

      {/* Content Container */}
      <div className="relative z-20 w-full px-[var(--section-padding-x)] md:pl-[100px] lg:pl-[140px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-[800px]"
        >
          {/* Section label */}
          <motion.div variants={fadeUp} className="mb-8">
             <p className="section-label">Sigma Oilfield</p>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUp} className="flex flex-col leading-tight">
            <span className="text-editorial text-white block italic mb-2">
              Unveiling
            </span>
            <span className="text-display-lg text-white block">
              Our Expertise<span className="text-[var(--sigma-red-500)]">.</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={fadeUp}
            className="mt-8 text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed font-body"
          >
            Precision engineering expertise built on two decades of industrial supply 
            experience, serving the world's most demanding oilfields with API-certified reliability.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
