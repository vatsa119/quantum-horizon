import dynamic from 'next/dynamic'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Sigma Oilfield & Industrial Supply FZCO',
  description: 'Six product sectors. API-certified equipment from certified global manufacturers.',
}

import ProductsCinemaWrapper from './ProductsCinemaWrapper'

export default function ProductsPage() {
  return <ProductsCinemaWrapper />
}
