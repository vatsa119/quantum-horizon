'use client'

import { useState } from 'react'
import type { Product } from '@/types'
import { PRODUCTS, SECTOR_LABELS } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'
import ProductModal from '@/components/ui/ProductModal'
import SectorHeader from '@/components/ui/SectorHeader'

const productsBySector = PRODUCTS.reduce((acc, product) => {
  if (!acc[product.sector]) acc[product.sector] = []
  acc[product.sector].push(product)
  return acc
}, {} as Record<string, Product[]>)

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <>
      <section className="bg-white" style={{ padding: '0 var(--section-padding-x) clamp(80px, 10vw, 140px)' }}>
        <div className="max-w-7xl mx-auto">
          {Object.entries(productsBySector).map(([sectorKey, products]) => {
            const label = SECTOR_LABELS[sectorKey] || sectorKey
            
            return (
              <div key={sectorKey}>
                <SectorHeader label={label} />
                
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  }}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
