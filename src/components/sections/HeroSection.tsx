'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { TICKER_ITEMS, CERTIFICATIONS } from '@/lib/constants'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const tickerContainerRef = useRef<HTMLDivElement>(null)
  const tickerTrackRef = useRef<HTMLDivElement>(null)
  const sublabelRef = useRef<HTMLDivElement>(null)
  const descriptorRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const wordRefs = {
    sigma: useRef<HTMLSpanElement>(null),
    oilfield: useRef<HTMLSpanElement>(null),
    sub: useRef<HTMLSpanElement>(null),
    fzco: useRef<HTMLSpanElement>(null),
  }

  const [isScrollIndicatorVisible, setScrollIndicatorVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false)
      } else {
        setScrollIndicatorVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // GSAP context scoped to section
    const ctx = gsap.context(() => {
      // Step 0 — Initial massive 400% ticker scale upon introduction
      if (tickerContainerRef.current) {
        gsap.set(tickerContainerRef.current, { scale: 4, transformOrigin: 'top left' })
      }

      const tl = gsap.timeline({ delay: 0.3 })

      // Step 1 — ticker freeze
      tl.call(() => {
        tickerTrackRef.current?.style.setProperty('animation-play-state', 'paused')
      }, [], 1.8)

      // Step 2 — background image fades in with scale
      if (bgRef.current) {
        tl.fromTo(bgRef.current,
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
          1.6
        )
      }

      // Step 3 — sublabel appears
      if (sublabelRef.current) {
        tl.fromTo(sublabelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          2.1
        )
      }

      // Step 4 — "SIGMA" slams in
      if (wordRefs.sigma.current) {
        tl.fromTo(wordRefs.sigma.current,
          { opacity: 0, scale: 0.72, z: -300, rotationX: 15 },
          { opacity: 1, scale: 1, z: 0, rotationX: 0, duration: 0.45, ease: 'power3.out' },
          2.35
        )
      }

      // Step 5 — "OILFIELD"
      if (wordRefs.oilfield.current) {
        tl.fromTo(wordRefs.oilfield.current,
          { opacity: 0, scale: 0.72, z: -300, rotationX: 15 },
          { opacity: 1, scale: 1, z: 0, rotationX: 0, duration: 0.45, ease: 'power3.out' },
          2.52
        )
      }

      // Step 6 — "& INDUSTRIAL SUPPLY" sweeps up
      if (wordRefs.sub.current) {
        tl.fromTo(wordRefs.sub.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          2.68
        )
      }

      // Step 7 — "FZCO" slides in from right
      if (wordRefs.fzco.current) {
        tl.fromTo(wordRefs.fzco.current,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          2.85
        )
      }

      // Step 7.5 — Ticker scales down from 400% to normal after company name
      if (tickerContainerRef.current) {
        tl.to(tickerContainerRef.current,
          { scale: 1, duration: 1.2, ease: 'power3.inOut' },
          3.0
        )
      }

      // Step 8 — descriptor line fades in
      if (descriptorRef.current) {
        tl.fromTo(descriptorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          3.1
        )
      }

      // Step 9 — CTA row springs in
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
          3.3
        )
      }

      // Step 10 — scroll indicator appears
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.4 },
          3.7
        )
      }

      // ScrollTrigger Pin
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: true,
      })

    }, sectionRef) // Scoped to sectionRef

    return () => ctx.revert() // Cleanup timeline and scrolltrigger
  }, [])

  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS]
  const descriptorText = CERTIFICATIONS.map(c => c.label).join('  ·  ')

  return (
    <div className="hero-pin-wrapper">
      <section ref={sectionRef} aria-label="Sigma Oilfield Hero" className="hero-section">
        {/* Background Layer */}
      <div ref={bgRef} className="hero-bg section-dark section-grain">
        {/* TODO: Replace with actual rig photography — next/image with priority */}
      </div>

      {/* Ticker Strip */}
      <div ref={tickerContainerRef} className="hero-ticker bg-[var(--sigma-carbon-black)] border-b border-white/10 text-white">
        <div ref={tickerTrackRef} className="ticker-track">
          {tickerContent.map((item, i) => (
            <div key={i} className="flex flex-row items-center">
              <span className="ticker-item text-white/90">{item}</span>
              <span className="ticker-separator text-[var(--sigma-red-500)]">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content flex flex-col items-start w-full max-w-7xl mx-auto z-20">
        
        {/* Sublabel */}
        <div ref={sublabelRef} className="hero-sublabel">
          Dubai  ·  India  ·  Global Operations
        </div>

        {/* Headline block */}
        <div className="flex flex-col items-start">
          <span ref={wordRefs.sigma} className="hero-word-sigma uppercase">
            Sigma
          </span>
          <span ref={wordRefs.oilfield} className="hero-word-oilfield uppercase">
            Oilfield
          </span>
          
          <div className="flex flex-row items-baseline gap-4 mt-2">
            <span ref={wordRefs.sub} className="hero-word-sub uppercase">
              & Industrial Supply
            </span>
            <span ref={wordRefs.fzco} className="hero-word-fzco uppercase">
              FZCO
            </span>
          </div>
        </div>

        {/* Descriptor */}
        <div ref={descriptorRef} className="hero-descriptor">
          {descriptorText}
        </div>

        {/* CTA row */}
        <div ref={ctaRef} className="hero-cta-row">
          <Link href="/contact" className="cta-primary">
            Get a Quote
          </Link>
          <Link href="/products" className="hero-link-secondary">
            Discover Products &rarr;
          </Link>
        </div>

      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef} 
        className="hero-scroll-indicator" 
        style={{ display: isScrollIndicatorVisible ? 'block' : 'none' }}
      >
        <ChevronDown size={20} />
      </div>
    </section>
    </div>
  )
}
