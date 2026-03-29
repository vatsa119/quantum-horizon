'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PanelWipe from '@/components/animations/PanelWipe'
import { fadeUp, viewportOnce } from '@/lib/animations'
import { SIGMA_CLIENTS } from '@/lib/constants'

export default function ClientsPreview() {
  const marqueeContent = [...SIGMA_CLIENTS, ...SIGMA_CLIENTS, ...SIGMA_CLIENTS]

  return (
    <PanelWipe wipeColor="var(--sigma-neutral-100)">
      <section className="bg-[var(--sigma-neutral-50)] py-24 lg:py-32 flex flex-col gap-12 overflow-hidden">
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="px-6 max-w-7xl mx-auto w-full"
        >
          <div className="flex flex-col gap-4">
            <p className="section-label">
              <span className="section-label__line" />
              IN GOOD COMPANY
            </p>
            <h2 className="text-[var(--sigma-carbon-900)]" style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Trusted by the industry's<br />
              leading operators.
            </h2>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className="marquee-wrapper bg-[var(--sigma-carbon-900)] py-7"
        >
          <div className="marquee-track" style={{ animationDuration: '20s' }}>
            {marqueeContent.map((client, i) => (
              <div
                key={i}
                className="marquee-item flex-shrink-0"
                style={{
                  fontFamily: 'Satoshi, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.25)',
                  transition: 'color 300ms ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
              >
                {client.fullName || client.name}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="px-6 max-w-7xl mx-auto w-full flex justify-end">
          <Link
            href="/clients"
            style={{
              fontFamily: 'General Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'var(--sigma-red-500)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            View all clients <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </PanelWipe>
  )
}
