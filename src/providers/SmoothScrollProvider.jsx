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
  const wrapperRef = useRef(null)
  const contentRef = useRef(null)
  const lenisRef = useRef(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current

    if (!wrapper || !content) {
      return undefined
    }

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(Number(value), { duration: 0, immediate: true })
        }

        return lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
      pinType: wrapper.style.transform ? 'transform' : 'fixed',
    })

    ScrollTrigger.defaults({ scroller: wrapper })

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    const onLenisScroll = ({ scroll, velocity, progress }) => {
      useAnimationStore.getState().setScrollState(scroll, velocity, progress)
      ScrollTrigger.update()
    }

    const refresh = () => {
      lenis.resize()
    }

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
      ScrollTrigger.defaults({})
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
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
      <div ref={wrapperRef} className="lenis-shell h-screen">
        <div ref={contentRef} data-lenis-content>
          {children}
        </div>
      </div>
    </LenisContext.Provider>
  )
}

export default SmoothScrollProvider
