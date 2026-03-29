'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import PanelWipe from '@/components/animations/PanelWipe'
import { SIGMA_STATS } from '@/lib/constants'
import { scaleIn, staggerContainer, viewportOnce } from '@/lib/animations'

function animateCounter(
  el: HTMLSpanElement,
  target: number,
  duration: number,
  suffix: string
): void {
  const start = performance.now()

  const update = (now: number): void => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
    const current = Math.round(eased * target)

    el.textContent = current.toLocaleString() + suffix

    if (progress < 1) requestAnimationFrame(update)
    else el.textContent = target.toLocaleString() + suffix
  }

  requestAnimationFrame(update)
}

function StatCard({ stat }: { stat: typeof SIGMA_STATS[0] }) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!numberRef.current) return

    const el = numberRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounter(el, stat.value, stat.duration || 2000, "")
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stat, hasAnimated])

  return (
    <motion.div variants={scaleIn} className="stat-card">
      <div className="stat-number-row">
        <span ref={numberRef} className="stat-number">
          0
        </span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  )
}

export default function StatsBanner() {
  return (
    <PanelWipe wipeColor="var(--sigma-carbon-800)">
      <section className="stats-section bg-[var(--sigma-carbon-900)]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="stats-grid max-w-7xl mx-auto"
        >
          {SIGMA_STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.div>
      </section>
    </PanelWipe>
  )
}
