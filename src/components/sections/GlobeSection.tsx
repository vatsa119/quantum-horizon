import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

// Dynamically import the ThreeJS component and disable SSR to prevent window/WebGL errors on the server
const InteractiveGlobe = dynamic(
  () => import('../three/InteractiveGlobe'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <span className="font-mono text-xs text-sigma-red-500 uppercase tracking-widest animate-pulse border border-sigma-red-500/30 px-4 py-2 rounded">
          INITIALIZING GLOBAL GRID
        </span>
      </div>
    )
  }
)

export default function GlobeSection() {
  return (
    <section className="relative w-full py-[var(--section-padding-y)] px-[var(--section-padding-x)] bg-sigma-carbon-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Dark Gradient and Grain */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#1a2744_0%,#0a0f18_100%)]" />
      <div className="absolute inset-0 z-0 bg-[url('/textures/grain.png')] mix-blend-overlay opacity-[0.03] pointer-events-none" />

      {/* Header text container matching the design system */}
      <motion.div 
        className="w-full max-w-[1200px] mb-12 relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p variants={fadeUp} className="section-label mb-4">
          GLOBAL REACH
        </motion.p>
        <motion.h2 
          variants={fadeUp} 
          className="text-display-md text-white max-w-2xl"
        >
          Precision Engineering, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sigma-red-500 to-sigma-coral">
            Worldwide Delivery.
          </span>
        </motion.h2>
      </motion.div>

      {/* Glassmorphic Globe Container */}
      <motion.div 
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-[1200px] h-[600px] md:h-[700px] lg:h-[800px] rounded-[32px] overflow-hidden"
        style={{
          background: 'rgba(10, 15, 24, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <InteractiveGlobe />
      </motion.div>
    </section>
  )
}
