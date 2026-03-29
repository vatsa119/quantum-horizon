'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function SmartStickyCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const footerRef = useRef<Element | null>(null)

  useEffect(() => {
    footerRef.current = document.querySelector('footer')
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.8
      const pastHero = window.scrollY > heroThreshold
      const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity
      const nearFooter = footerTop < window.innerHeight + 200
      setVisible(pastHero && !nearFooter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname === '/contact') return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 998,
          }}
        >
          <Link href="/contact" className="cta-primary">
            Get a Quote
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
