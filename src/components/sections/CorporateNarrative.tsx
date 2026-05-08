'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Settings, LayoutGrid, CheckCircle } from 'lucide-react'
import PanelWipe from '@/components/animations/PanelWipe'
import { slideRight, slideLeft, staggerContainer, fadeUp, viewportOnce } from '@/lib/animations'

export default function CorporateNarrative() {
  return (
    <PanelWipe wipeColor="var(--sigma-neutral-50)">
      <section className="corporate-section overflow-hidden">
        {/* Left Card */}
        <motion.div
          className="corporate-card corporate-card--light"
          variants={slideRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="section-label">
            <span className="section-label__line" />
            CORPORATE PROFILE
          </p>

          <h2 className="corporate-heading text-[var(--sigma-carbon-900)]">
            Built on Precision.<br />
            Trusted Globally.
          </h2>

          <p className="corporate-body text-[var(--sigma-neutral-600)]">
            Sigma Oilfield & Industrial Supply FZCO operates at the intersection of technical
            expertise and global supply chain mastery.
          </p>

          <div>
            <Link href="/about" className="ghost-btn">
              DISCOVER OUR STORY <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div
          className="corporate-card corporate-card--dark"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="relative z-10 flex flex-col gap-8">
            <p className="section-label" style={{ color: 'var(--sigma-red-400)' }}>
              <span className="section-label__line" style={{ background: 'var(--sigma-red-400)' }} />
              GLOBAL SERVICES
            </p>

            <h2 className="corporate-heading text-white">
              Strategic Supply.<br />
              Industrial Precision.
            </h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-6"
            >
              {/* Feature 1 */}
              <motion.div variants={fadeUp} className="feature-row">
                <div className="feature-icon">
                  <Settings size={20} color="white" />
                </div>
                <div>
                  <h3 className="feature-title">Precision Engineering</h3>
                  <p className="feature-desc">
                    OEM and aftermarket equipment sourced directly from certified global manufacturers.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div variants={fadeUp} className="feature-row">
                <div className="feature-icon">
                  <LayoutGrid size={20} color="white" />
                </div>
                <div>
                  <h3 className="feature-title">Inventory Integrity</h3>
                  <p className="feature-desc">
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Badges */}
            <div className="badge-row mt-4">
              <span className="cert-badge">
                <CheckCircle size={12} />
                API Certified
              </span>
              <span className="cert-badge">
                <CheckCircle size={12} />
                ISO 9001:2015
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </PanelWipe>
  )
}
