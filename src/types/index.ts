// Sigma Oilfield — Shared TypeScript Types

export type StockStatus = 'in-stock' | 'limited' | 'on-request'

export type ProductSector = 
  | 'mud-pumps-handling'
  | 'tubulars-accessories'
  | 'downhole-tools'
  | 'valves-bop'
  | 'drilling-jars'
  | 'fishing-tools'

export type Product = {
  id: string
  name: string
  model?: string
  sector: ProductSector
  description: string
  specifications?: Record<string, string>
  images: string[]
  stockStatus: StockStatus
  certifications?: string[]
}

export type Client = {
  id: string
  name: string
  fullName: string
  logo: string
  description: string
  sector: string
  country: string
}

export type Stat = {
  value: number
  suffix: string
  label: string
  duration?: number
}

export type NavLink = {
  label: string
  href: string
}

export type ContactCard = {
  type: 'phone' | 'mobile' | 'email' | 'address'
  label: string
  value: string
  icon: string
  dark?: boolean
}
