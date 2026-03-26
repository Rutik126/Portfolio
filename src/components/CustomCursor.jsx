import { useEffect, useRef } from 'react'

function CustomCursor() {
  const haloRef = useRef(null)
  const trailRef = useRef(null)
  const orbRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const primaryPosition = useRef({ x: 0, y: 0 })
  const secondaryPosition = useRef({ x: 0, y: 0 })
  const primaryScale = useRef(1)
  const secondaryScale = useRef(1)
  const glowScale = useRef(1)
  const isInteractive = useRef(false)
  const isVisible = useRef(false)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (window.innerWidth < 1024) {
      return undefined
    }

    const onMove = (event) => {
      const nextPoint = { x: event.clientX, y: event.clientY }
      target.current = nextPoint

      if (!hasInitialized.current) {
        hasInitialized.current = true
        primaryPosition.current = nextPoint
        secondaryPosition.current = nextPoint
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
      if (event.target.closest('a, button, input, textarea, [data-cursor="magnetic"]')) {
        isInteractive.current = true
      }
    }

    const onPointerOut = (event) => {
      const currentInteractive = event.target.closest(
        'a, button, input, textarea, [data-cursor="magnetic"]',
      )
      const nextInteractive =
        event.relatedTarget instanceof Element
          ? event.relatedTarget.closest('a, button, input, textarea, [data-cursor="magnetic"]')
          : null

      if (currentInteractive && currentInteractive !== nextInteractive) {
        isInteractive.current = false
      }
    }

    let rafId = 0
    const animate = () => {
      primaryPosition.current.x += (target.current.x - primaryPosition.current.x) * 0.12
      primaryPosition.current.y += (target.current.y - primaryPosition.current.y) * 0.12
      secondaryPosition.current.x += (target.current.x - secondaryPosition.current.x) * 0.05
      secondaryPosition.current.y += (target.current.y - secondaryPosition.current.y) * 0.05

      const targetPrimaryScale = isInteractive.current ? 2.4 : 1
      const targetSecondaryScale = isInteractive.current ? 1.6 : 1
      const targetGlowScale = isInteractive.current ? 1.85 : 1

      primaryScale.current += (targetPrimaryScale - primaryScale.current) * 0.14
      secondaryScale.current += (targetSecondaryScale - secondaryScale.current) * 0.08
      glowScale.current += (targetGlowScale - glowScale.current) * 0.1

      const primaryTransform = `translate3d(${primaryPosition.current.x}px, ${primaryPosition.current.y}px, 0) translate3d(-50%, -50%, 0)`
      const secondaryTransform = `translate3d(${secondaryPosition.current.x}px, ${secondaryPosition.current.y}px, 0) translate3d(-50%, -50%, 0)`
      const opacity = isVisible.current ? 1 : 0

      if (haloRef.current) {
        haloRef.current.style.opacity = `${opacity * 0.9}`
        haloRef.current.style.transform = `${primaryTransform} scale(${glowScale.current})`
      }

      if (trailRef.current) {
        trailRef.current.style.opacity = `${opacity * 0.3}`
        trailRef.current.style.transform = `${secondaryTransform} scale(${secondaryScale.current})`
      }

      if (orbRef.current) {
        orbRef.current.style.opacity = `${opacity}`
        orbRef.current.style.transform = `${primaryTransform} scale(${primaryScale.current})`
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
        ref={haloRef}
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden h-12 w-12 rounded-full opacity-0 mix-blend-screen lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(255,214,0,0.22) 0%, rgba(103,95,236,0.2) 48%, rgba(92,112,255,0.04) 72%, rgba(92,112,255,0) 100%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-5 w-5 rounded-full lg:block"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,244,184,0.55) 0%, rgba(119,131,255,0.34) 55%, rgba(84,109,255,0.08) 100%)',
          boxShadow: '0 0 18px rgba(118, 125, 255, 0.22)',
        }}
      />
      <div
        ref={orbRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] hidden h-5 w-5 rounded-full lg:block"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(255,236,160,1) 0%, rgba(119,131,255,0.94) 48%, rgba(84,109,255,0.18) 100%)',
          boxShadow: '0 0 24px rgba(118, 125, 255, 0.4)',
        }}
      />
    </>
  )
}

export default CustomCursor
