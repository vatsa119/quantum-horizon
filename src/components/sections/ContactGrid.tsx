'use client'

import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { Phone, Smartphone, Mail, MapPin } from 'lucide-react'

// Using Lucide icons directly instead of dynamic
const CONTACT_CARDS = [
  {
    type: 'phone',
    icon: <Phone size={24} />,
    label: 'Dubai Office',
    value: '+971 4 266 5748',
    dark: true,
  },
  {
    type: 'mobile',
    icon: <Smartphone size={24} />,
    label: 'Direct Procurement',
    value: '+971 50 258 0299',
    dark: false,
  },
  {
    type: 'email',
    icon: <Mail size={24} />,
    label: 'Managing Director',
    value: 'uma@sigmadxb.com',
    dark: false,
  },
  {
    type: 'email',
    icon: <Mail size={24} />,
    label: 'Sales Department',
    value: 'sales@sigmadxb.com',
    dark: false,
  },
  {
    type: 'address',
    icon: <MapPin size={24} />,
    label: 'FZCO HQ',
    value: 'JLT Platinum Tower\nDubai, UAE',
    dark: false,
  },
]

export default function ContactGrid() {
  return (
    <section
      className="page-section"
      style={{
        background: 'var(--sigma-white)',
        padding: 'clamp(64px, 8vw, 96px) var(--section-padding-x)',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
        }}
      >
        {CONTACT_CARDS.map((card, i) => (
          <motion.a
            key={i}
            variants={fadeUp}
            href={
              card.type === 'email'
                ? `mailto:${card.value}`
                : card.type === 'phone' || card.type === 'mobile'
                ? `tel:${card.value.replace(/\s/g, '')}`
                : '#'
            }
            target={card.type === 'address' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            style={{
              background: card.dark ? 'var(--sigma-carbon-900)' : 'var(--sigma-neutral-50)',
              border: card.dark ? 'none' : '0.5px solid var(--sigma-neutral-200)',
              borderRadius: '16px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div
              style={{
                color: card.dark ? 'var(--sigma-red-500)' : 'var(--sigma-carbon-800)',
              }}
            >
              {card.icon}
            </div>

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: card.dark ? 'rgba(255,255,255,0.4)' : 'var(--sigma-neutral-500)',
                  marginBottom: '12px',
                }}
              >
                {card.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: card.dark ? 'white' : 'var(--sigma-carbon-900)',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                }}
              >
                {card.value}
              </p>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{
          marginTop: '64px',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          borderTop: '0.5px solid var(--sigma-neutral-200)',
          paddingTop: '32px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: 'var(--sigma-neutral-500)',
            marginRight: '12px',
          }}
        >
          Operation Certifications
        </span>
        <span className="cert-badge" style={{ color: 'var(--sigma-neutral-600)', borderColor: 'var(--sigma-neutral-300)' }}>
          API Registered
        </span>
        <span className="cert-badge" style={{ color: 'var(--sigma-neutral-600)', borderColor: 'var(--sigma-neutral-300)' }}>
          ISO 9001:2015
        </span>
        <span className="cert-badge" style={{ color: 'var(--sigma-neutral-600)', borderColor: 'var(--sigma-neutral-300)' }}>
          FZCO Corporate
        </span>
        <span className="cert-badge" style={{ color: 'var(--sigma-neutral-600)', borderColor: 'var(--sigma-neutral-300)' }}>
          India MSME
        </span>
      </motion.div>
    </section>
  )
}
