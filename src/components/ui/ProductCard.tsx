'use client'

import TiltCard from './TiltCard'
import type { Product } from '@/types'

type ProductCardProps = {
  product: Product
  onView: (product: Product) => void
}

function AvailabilityBadge({ status }: { status: Product['stockStatus'] }) {
  if (status === 'in-stock') {
    return (
      <span style={{ fontFamily: 'General Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: 'var(--sigma-success)', background: 'rgba(52, 211, 153, 0.1)', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        In Stock
      </span>
    )
  }
  if (status === 'limited') {
    return (
      <span style={{ fontFamily: 'General Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        Limited
      </span>
    )
  }
  return (
    <span style={{ fontFamily: 'General Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: 'var(--sigma-neutral-500)', background: 'var(--sigma-neutral-100)', padding: '4px 8px', borderRadius: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
      On Request
    </span>
  )
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  return (
    <div onClick={() => onView(product)} style={{ outline: 'none', border: 'none', background: 'transparent' }} role="button" aria-label={`View details for ${product.name}`}>
      <TiltCard className="product-card">
        <div className="product-card-image">
          {/* Using text placeholder instead of actual image tag until assets exist */}
          <div className="product-card-placeholder">
            {product.name}
          </div>
        </div>
        
        <div className="product-card-body">
          <div className="flex items-center justify-between">
            <span className="product-card-sector">
              {product.sector.replace('-', ' ')}
            </span>
          </div>
          
          <h3 className="product-card-name">
            {product.name}
          </h3>
          
          <div className="product-card-footer">
            <span className="product-card-model">{product.model}</span>
            <AvailabilityBadge status={product.stockStatus} />
          </div>
        </div>

        <div className="product-card-reveal">
          VIEW DETAILS
        </div>
      </TiltCard>
    </div>
  )
}
