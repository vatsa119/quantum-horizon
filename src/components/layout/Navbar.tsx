'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

type NavbarProps = Record<string, never>

const scrolledStyles = {
  background: 'rgba(10, 15, 24, 0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '0.5px solid rgba(255, 255, 255, 0.1)',
}

export default function Navbar(_props: NavbarProps) {
  const [isScrolledState, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const heroPages = ['/', '/products']
  const hasHero = heroPages.includes(pathname)
  const isScrolled = hasHero ? isScrolledState : true

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 pointer-events-auto ${isScrolled ? 'navbar--scrolled' : 'navbar--top'}`}
        style={isScrolled ? scrolledStyles : { background: 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: '20px', letterSpacing: '-0.02em', color: 'white', lineHeight: 1 }}>
              SIGMA
            </span>
            <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sigma-neutral-400)', lineHeight: 1, marginTop: '2px' }}>
              OILFIELD
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'General Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: isActive ? 'var(--sigma-red-500)' : 'rgba(255, 255, 255, 0.7)',
                    transition: 'color 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:block">
            <Link href="/contact" className="cta-primary">
              GET A QUOTE
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[var(--sigma-carbon-900)] pt-24 px-6 flex flex-col pointer-events-auto"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: 'Satoshi, sans-serif',
                      fontWeight: 700,
                      fontSize: '32px',
                      color: pathname === link.href ? 'var(--sigma-red-500)' : 'white'
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
