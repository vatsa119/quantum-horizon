'use client'

import { useRef, useImperativeHandle, forwardRef, useCallback } from 'react'

export type PixelTransitionHandle = {
  trigger: (onComplete: () => void) => void
}

const PIXEL_SIZE = 24  // size of each pixel block in px
const DURATION = 600   // total transition duration ms

const PixelTransition = forwardRef<PixelTransitionHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const trigger = useCallback((onComplete: () => void) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W
    canvas.height = H
    canvas.style.opacity = '1'
    canvas.style.pointerEvents = 'all'

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cols = Math.ceil(W / PIXEL_SIZE)
    const rows = Math.ceil(H / PIXEL_SIZE)

    // Build a list of all pixel positions, shuffled randomly
    const pixels: { x: number; y: number; delay: number }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pixels.push({
          x: c * PIXEL_SIZE,
          y: r * PIXEL_SIZE,
          delay: Math.random() * 0.5, // stagger 0-50% of duration
        })
      }
    }

    // Phase 1: fill in pixels (0 → DURATION/2)
    // Phase 2: clear pixels (DURATION/2 → DURATION)
    const startTime = performance.now()

    const draw = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION, 1)

      ctx.clearRect(0, 0, W, H)

      pixels.forEach(({ x, y, delay }) => {
        // Each pixel appears at its delay point and disappears in phase 2
        const localProgress = Math.max(0, (progress - delay) / (1 - delay))

        if (localProgress <= 0) return

        const alpha = localProgress < 0.5
          ? localProgress * 2           // 0 → 1 in first half
          : (1 - localProgress) * 2     // 1 → 0 in second half

        // Color: dark carbon with slight red tint at peak
        const r = Math.round(10 + 30 * (alpha > 0.8 ? (alpha - 0.8) * 5 : 0))
        const g = 15
        const b = 24
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(alpha, 1)})`
        ctx.fillRect(x, y, PIXEL_SIZE - 1, PIXEL_SIZE - 1)
      })

      if (progress < 0.5) {
        // Still in phase 1
        rafRef.current = requestAnimationFrame(draw)
      } else if (progress < 1) {
        // Phase 2 — call onComplete at midpoint so new image is ready
        if (elapsed >= DURATION / 2) onComplete()
        rafRef.current = requestAnimationFrame(draw)
      } else {
        // Done
        canvas.style.opacity = '0'
        canvas.style.pointerEvents = 'none'
        ctx.clearRect(0, 0, W, H)
      }
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(draw)
  }, [])

  useImperativeHandle(ref, () => ({ trigger }))

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.1s',
      }}
    />
  )
})

PixelTransition.displayName = 'PixelTransition'
export default PixelTransition
