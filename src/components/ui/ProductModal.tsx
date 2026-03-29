'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product } from '@/types'
import { X, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type ProductModalProps = {
  product: Product | null
  onClose: () => void
}

function ModalAvailabilityBadge({ status }: { status: Product['stockStatus'] }) {
  if (status === 'in-stock') return <span style={{ color: 'var(--sigma-success)' }}>In Stock</span>
  if (status === 'limited') return <span style={{ color: '#f59e0b' }}>Limited</span>
  return <span style={{ color: 'var(--sigma-neutral-500)' }}>On Request</span>
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (product) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10,15,24,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1100,
            }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: '90vh',
              background: 'white',
              borderRadius: '24px 24px 0 0',
              zIndex: 1101,
              overflowY: 'auto',
            }}
          >
            <div className="modal-handle" />

            <div className="modal-header">
              <h2 style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: '24px', letterSpacing: '-0.02em', color: 'var(--sigma-carbon-900)' }}>
                {product.name}
              </h2>
              <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
                <X size={20} color="var(--sigma-carbon-900)" />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                {/* Left column */}
                <div className="product-card-image" style={{ borderRadius: '12px' }}>
                  <div className="product-card-placeholder">
                    {product.name}
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="product-card-sector px-3 py-1 bg-[rgba(220,38,38,0.1)] rounded-full">
                      {product.sector.replace('-', ' ')}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--sigma-neutral-500)' }}>
                      {product.model}
                    </span>
                    <span style={{ fontFamily: 'General Sans, sans-serif', fontSize: '12px', fontWeight: 600, padding: '4px 8px', borderRadius: '4px', background: 'var(--sigma-neutral-100)' }}>
                      <ModalAvailabilityBadge status={product.stockStatus} />
                    </span>
                  </div>

                  <p style={{ fontFamily: 'General Sans, sans-serif', fontSize: '16px', fontWeight: 400, color: 'var(--sigma-neutral-600)', lineHeight: 1.6 }}>
                    {product.description}
                  </p>

                  <div className="spec-table">
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <div className="spec-row" key={key}>
                        <div className="spec-key">{key}</div>
                        <div className="spec-value">{value}</div>
                      </div>
                    ))}
                  </div>

                  {product.certifications && product.certifications.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {product.certifications.map(cert => (
                        <span key={cert} className="cert-badge" style={{ color: 'var(--sigma-success)', background: 'rgba(52, 211, 153, 0.1)', borderColor: 'rgba(52, 211, 153, 0.2)' }}>
                          <CheckCircle size={12} color="var(--sigma-success)" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--sigma-red-500)] text-white hover:bg-[var(--sigma-red-600)] transition-colors px-6 py-3 rounded-full"
                style={{ fontFamily: 'General Sans, sans-serif', fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}
                onClick={() => onClose()}
              >
                REQUEST QUOTE <ArrowRight size={16} />
              </Link>
              
              <button
                onClick={onClose}
                className="ghost-btn"
                style={{ borderColor: 'var(--sigma-neutral-300)', color: 'var(--sigma-carbon-900)' }}
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
