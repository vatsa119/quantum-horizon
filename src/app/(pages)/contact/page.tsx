import ContactHero from '@/components/sections/ContactHero'
import ContactGrid from '@/components/sections/ContactGrid'

export const metadata = {
  title: 'Contact | Sigma Oilfield & Industrial Supply DMCC',
  description: 'Reach our procurement specialists in Dubai and India.',
}

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--sigma-white)' }}>
      <ContactHero />
      <ContactGrid />
    </div>
  )
}
