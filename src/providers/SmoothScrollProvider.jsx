import { createContext, useContext, useLayoutEffect, useMemo, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useAnimationStore } from '../store/animationStore'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export function useLenisController() {
  return useContext(LenisContext)
}

function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    const onLenisScroll = ({ scroll, velocity, progress }) => {
      useAnimationStore.getState().setScrollState(scroll, velocity, progress)
      ScrollTrigger.update()
    }

    const refresh = () => lenis.resize()

    lenis.on('scroll', onLenisScroll)
    ScrollTrigger.addEventListener('refresh', refresh)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      ScrollTrigger.removeEventListener('refresh', refresh)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const contextValue = useMemo(
    () => ({
      getLenis: () => lenisRef.current,
    }),
    [],
  )

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  )
}

export default SmoothScrollProvider
