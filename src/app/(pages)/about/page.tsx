import AboutHero from '@/components/sections/AboutHero'
import AboutSection01 from '@/components/sections/about/AboutSection01'
import AboutSection02 from '@/components/sections/about/AboutSection02'
import AboutSection03 from '@/components/sections/about/AboutSection03'
import AboutSection04 from '@/components/sections/about/AboutSection04'
import AboutSection05 from '@/components/sections/about/AboutSection05'
import AboutSideNav from '@/components/ui/AboutSideNav'

export const metadata = {
  title: 'About | Sigma Oilfield & Industrial Supply DMCC',
  description: 'Precision engineering expertise built on API certification and ISO quality.',
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--sigma-white)' }}>
      <AboutHero />
      <div style={{ position: 'relative' }}>
        <AboutSideNav />
        <AboutSection01 />
        <AboutSection02 />
        <AboutSection03 />
        <AboutSection04 />
        <AboutSection05 />
      </div>
    </div>
  )
}
