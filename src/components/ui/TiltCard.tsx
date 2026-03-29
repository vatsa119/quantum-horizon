'use client'

import Tilt from 'react-parallax-tilt'
import type { ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="16px"
      transitionSpeed={400}
      scale={1.02}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </Tilt>
  )
}
