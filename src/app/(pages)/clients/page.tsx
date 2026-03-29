import ClientsHero from '@/components/sections/ClientsHero'
import ClientSelector from '@/components/sections/ClientSelector'

export const metadata = {
  title: 'Clients | Sigma Oilfield & Industrial Supply DMCC',
  description: 'Trusted by leading oil and gas operators across India and the Middle East.',
}

export default function ClientsPage() {
  return (
    <div style={{ background: 'var(--sigma-white)' }}>
      <ClientsHero />
      <ClientSelector />
    </div>
  )
}
