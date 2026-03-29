'use client'

import { useEffect, useState } from 'react'

export const useCursorPosition = (targetRef?: React.RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const target = targetRef?.current || document.documentElement

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setPosition({ x, y })
      
      target.style.setProperty('--mouse-x', `${x}px`)
      target.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [targetRef])

  return position
}
