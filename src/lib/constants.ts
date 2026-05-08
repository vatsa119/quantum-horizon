import type { Client, Stat, NavLink, Product } from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home',     href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Clients',  href: '/clients' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]

export const SIGMA_CLIENTS: Client[] = [
  {
    id: 'ongc',
    name: 'ONGC',
    fullName: 'Oil and Natural Gas Corporation',
    logo: '/logos/ongc.png',
    description: "India's flagship national oil company and the largest crude oil and natural gas company by production volume. ONGC accounts for roughly 70% of India's domestic hydrocarbon production across over 6 sedimentary basins.",
    sector: 'Oil & Gas Exploration',
    country: 'India',
  },
  {
    id: 'oil-india',
    name: 'Oil India',
    fullName: 'Oil India Limited',
    logo: '/logos/oil-india.png',
    description: 'A premier public sector upstream petroleum company engaged in exploration, development, production, and transportation of crude oil and natural gas, with operations spanning Assam and offshore blocks.',
    sector: 'Upstream Petroleum',
    country: 'India',
  },
  {
    id: 'gnrl',
    name: 'GNRL',
    fullName: 'Gujarat Natural Resources Limited',
    logo: '/logos/gnrl.png',
    description: 'An independent oil and gas exploration company with a focus on hydrocarbon reserve development across the sedimentary basins of western India, operating under Production Sharing Contracts with the Government of India.',
    sector: 'Natural Gas Distribution',
    country: 'India',
  },
  {
    id: 'sgd',
    name: 'SGD',
    fullName: 'SGD',
    logo: '/logos/sgd.png',
    description: 'A trusted industrial supply and procurement partner operating across the Gulf region, with a focus on API-certified oilfield equipment and specialised industrial components for upstream operations.',
    sector: 'Industrial Supply',
    country: 'UAE',
  },
]

export const SIGMA_STATS: Stat[] = [
  { value: 95,    suffix: '%',  label: 'On-time delivery rate', duration: 2000 },
  { value: 42,    suffix: '+',  label: 'Sectors served',        duration: 1500 },
  { value: 24,    suffix: '/7', label: 'Response availability',  duration: 1000 },
]

export const TICKER_ITEMS: string[] = [
  'ONGC',
  'Oil India Limited',
  'Gujarat Natural Resources',
  'SGD',
  'API Certified',
  'ISO 9001:2015',
  'FZCO Member',
  '42 Sectors',
  '95% Delivery Rate',
  'Jebel Ali · Dubai',
]

export const CERTIFICATIONS = [
  { code: 'API',          label: 'API Certified Standards' },
  { code: 'ISO 9001',     label: 'ISO 9001:2015 Quality Management' },
  { code: 'FZCO',         label: 'FZCO Member' },
]
