'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SIGMA_CLIENTS } from '@/lib/constants'
import type { Client } from '@/types'

export default function ClientSelector() {
  const [selected, setSelected] = useState<Client>(SIGMA_CLIENTS[0])

  return (
    <section
      className="page-section"
      style={{
        background: 'var(--sigma-white)',
        padding: 'clamp(64px, 8vw, 96px) var(--section-padding-x)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'start',
        }}
        className="client-selector-outer"
      >
        {/* Left — client list */}
        <div style={{ position: 'relative' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--sigma-neutral-400)',
              marginBottom: '16px',
            }}
          >
            Select client
          </p>

          {/* Vertical track line */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: '40px',
              bottom: 0,
              width: '1px',
              background: 'var(--sigma-neutral-200)',
            }}
          />

          {SIGMA_CLIENTS.map((client) => {
            const isActive = selected.id === client.id
            return (
              <button
                key={client.id}
                onClick={() => setSelected(client)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'rgba(220,38,38,0.04)' : 'transparent',
                  border: 'none',
                  borderLeft: isActive
                    ? '2px solid var(--sigma-red-500)'
                    : '2px solid transparent',
                  padding: '14px 0 14px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'block',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: isActive
                      ? 'var(--sigma-red-500)'
                      : 'var(--sigma-neutral-600)',
                    transition: 'color 0.2s ease',
                    display: 'block',
                  }}
                >
                  {client.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--sigma-neutral-400)',
                    marginTop: '2px',
                    display: 'block',
                  }}
                >
                  {client.country}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right — Partner Insights panel */}
        <div
          style={{
            border: '0.5px solid var(--sigma-neutral-200)',
            borderRadius: '16px',
            padding: 'clamp(28px, 4vw, 44px)',
            background: 'var(--sigma-neutral-50)',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--sigma-neutral-400)',
              marginBottom: '20px',
            }}
          >
            Partner Insights
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Client name */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  fontWeight: 900,
                  color: 'var(--sigma-carbon-900)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '4px',
                }}
              >
                {selected.name}
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--sigma-neutral-500)',
                  marginBottom: '20px',
                }}
              >
                {selected.fullName}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  lineHeight: 1.75,
                  color: 'var(--sigma-neutral-600)',
                  maxWidth: '520px',
                  marginBottom: '28px',
                }}
              >
                {selected.description}
              </p>

              {/* Meta rows */}
              <div
                style={{
                  borderTop: '0.5px solid var(--sigma-neutral-200)',
                  borderBottom: '0.5px solid var(--sigma-neutral-200)',
                  padding: '16px 0',
                  marginBottom: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {[
                  { label: 'Sector', value: selected.sector },
                  { label: 'Country', value: selected.country },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{ display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--sigma-neutral-400)',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--sigma-carbon-900)',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="cta-primary" style={{ fontSize: '13px', padding: '10px 22px' }}>
                Request Supply Quote
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .client-selector-outer {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
