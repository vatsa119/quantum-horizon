'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'about-01', label: 'Expertise' },
  { id: 'about-02', label: 'Mission' },
  { id: 'about-03', label: 'Excellence' },
  { id: 'about-04', label: 'Quality' },
  { id: 'about-05', label: 'Vision' },
]

export default function AboutSideNav() {
  const [activeId, setActiveId] = useState('about-01')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { threshold: 0.4, rootMargin: '-80px 0px 0px 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="About page sections"
      style={{
        position: 'fixed',
        right: 'clamp(16px, 3vw, 40px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        alignItems: 'flex-end',
      }}
      className="about-side-nav-container"
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Navigate to ${label}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
            }}
          >
            {/* Label — only visible when active or on hover via CSS */}
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '11px',
                fontWeight: 500,
                color: isActive ? 'var(--sigma-red-400)' : 'rgba(100,100,100,0.6)',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(4px)',
                transition: 'opacity 0.2s ease, transform 0.2s ease, color 0.2s ease',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </span>
            {/* Dot */}
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isActive ? 'var(--sigma-red-500)' : 'transparent',
                border: isActive
                  ? '1.5px solid var(--sigma-red-500)'
                  : '1.5px solid rgba(150,150,150,0.4)',
                transform: isActive ? 'scale(1.25)' : 'scale(1)',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
