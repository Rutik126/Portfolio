import { useEffect, useRef } from 'react'

function CustomCursor() {
  const glowRef = useRef(null)
  const trailRef = useRef(null)
  const orbRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const trailTarget = useRef({ x: 0, y: 0 })
  const historyRef = useRef([])
  const primaryPosition = useRef({ x: 0, y: 0 })
  const secondaryPosition = useRef({ x: 0, y: 0 })
  const primarySize = useRef(20)
  const secondarySize = useRef(12)
  const glowSize = useRef(56)
  const isInteractive = useRef(false)
  const isVisible = useRef(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return undefined
    }

    const interactiveSelector =
      'a, button, input, textarea, [data-cursor="magnetic"], [data-cursor="interactive"]'

    const onMove = (event) => {
      const nextPoint = { x: event.clientX, y: event.clientY }
      const now = performance.now()

      target.current = nextPoint
      historyRef.current.push({ ...nextPoint, time: now })
      historyRef.current = historyRef.current.filter((entry) => now - entry.time <= 140)

      if (!hasInitialized.current) {
        hasInitialized.current = true
        primaryPosition.current = nextPoint
        secondaryPosition.current = nextPoint
        trailTarget.current = nextPoint
      }

      isVisible.current = true
    }

    const onEnter = () => {
      isVisible.current = true
    }

    const onLeave = () => {
      isVisible.current = false
    }

    const onPointerOver = (event) => {
      if (event.target.closest(interactiveSelector)) {
        isInteractive.current = true
      }
    }

    const onPointerOut = (event) => {
      const currentInteractive = event.target.closest(interactiveSelector)
      const nextInteractive =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest(interactiveSelector)
          : null

      if (currentInteractive && currentInteractive !== nextInteractive) {
        isInteractive.current = false
      }
    }

    let rafId = 0
    const animate = () => {
      const now = performance.now()
      const delayedPoint =
        [...historyRef.current].reverse().find((entry) => now - entry.time >= 50) ?? target.current

      trailTarget.current = delayedPoint

      primaryPosition.current.x += (target.current.x - primaryPosition.current.x) * 0.12
      primaryPosition.current.y += (target.current.y - primaryPosition.current.y) * 0.12
      secondaryPosition.current.x += (trailTarget.current.x - secondaryPosition.current.x) * 0.12
      secondaryPosition.current.y += (trailTarget.current.y - secondaryPosition.current.y) * 0.12

      const nextPrimarySize = isInteractive.current ? 64 : 28
      const nextSecondarySize = isInteractive.current ? 28 : 18
      const nextGlowSize = isInteractive.current ? 120 : 90

      primarySize.current += (nextPrimarySize - primarySize.current) * 0.16
      secondarySize.current += (nextSecondarySize - secondarySize.current) * 0.12
      glowSize.current += (nextGlowSize - glowSize.current) * 0.1

      const opacity = isVisible.current ? 1 : 0

      if (glowRef.current) {
        glowRef.current.style.opacity = `${opacity * 0.42}`
        glowRef.current.style.width = `${glowSize.current}px`
        glowRef.current.style.height = `${glowSize.current}px`
        glowRef.current.style.transform = `translate3d(${primaryPosition.current.x - glowSize.current / 2}px, ${primaryPosition.current.y - glowSize.current / 2}px, 0)`
      }

      if (trailRef.current) {
        trailRef.current.style.opacity = `${opacity * 0.34}`
        trailRef.current.style.width = `${secondarySize.current}px`
        trailRef.current.style.height = `${secondarySize.current}px`
        trailRef.current.style.transform = `translate3d(${secondaryPosition.current.x - secondarySize.current / 2}px, ${secondaryPosition.current.y - secondarySize.current / 2}px, 0)`
      }

      if (orbRef.current) {
        orbRef.current.style.opacity = `${opacity}`
        orbRef.current.style.width = `${primarySize.current}px`
        orbRef.current.style.height = `${primarySize.current}px`
        orbRef.current.style.transform = `translate3d(${primaryPosition.current.x - primarySize.current / 2}px, ${primaryPosition.current.y - primarySize.current / 2}px, 0)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover', onPointerOver)
    window.addEventListener('mouseout', onPointerOut)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover', onPointerOver)
      window.removeEventListener('mouseout', onPointerOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden rounded-full opacity-0 lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(255,214,0,0.45) 0%, rgba(255,214,0,0.18) 44%, rgba(255,214,0,0) 100%)',
          filter: 'blur(22px)',
        }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden rounded-full opacity-0 lg:block"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,247,204,0.82) 0%, rgba(255,214,0,0.38) 60%, rgba(255,214,0,0.08) 100%)',
        }}
      />
      <div
        ref={orbRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] hidden rounded-full opacity-0 lg:block"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, rgba(255,247,204,0.82) 0%, rgba(255,214,0,0.94) 54%, rgba(255,196,0,0.9) 100%)',
          boxShadow: '0 0 40px rgba(255, 214, 0, 0.18)',
        }}
      />
    </>
  )
}

export default CustomCursor
