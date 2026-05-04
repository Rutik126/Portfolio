import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { headerSections, navItems } from '../content/siteContent'
import { useLenisController } from '../providers/SmoothScrollProvider'

gsap.registerPlugin(ScrollTrigger)

const headerThemes = {
  dark: {
    brand:
      'border-white/10 bg-white/[0.06] text-[#EAEAF0] shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur-[20px]',
    nav:
      'border-white/10 bg-white/[0.06] text-[rgba(234,234,240,0.8)] shadow-[0_18px_46px_rgba(0,0,0,0.24)] backdrop-blur-[20px]',
    item: 'text-[rgba(234,234,240,0.78)] hover:text-[rgba(255,244,184,0.96)]',
    activeTint: 'bg-white/[0.06]',
  },
  light: {
    brand:
      'border-black/10 bg-[rgba(255,255,255,0.6)] text-[#1A1A1A] shadow-[0_18px_40px_rgba(18,22,32,0.08)] backdrop-blur-[18px]',
    nav:
      'border-black/10 bg-[rgba(255,255,255,0.6)] text-[rgba(26,26,26,0.76)] shadow-[0_18px_46px_rgba(18,22,32,0.1)] backdrop-blur-[18px]',
    item: 'text-[rgba(26,26,26,0.72)] hover:text-[#1A1A1A]',
    activeTint: 'bg-black/[0.04]',
  },
  accent: {
    brand: 'border-black/10 bg-transparent text-[#000000] shadow-none backdrop-blur-0',
    nav: 'border-black/10 bg-transparent text-[rgba(0,0,0,0.76)] shadow-none backdrop-blur-0',
    item: 'text-[rgba(0,0,0,0.72)] hover:text-[#000000]',
    activeTint: 'bg-black/[0.05]',
  },
}

function Navbar() {
  const lenisController = useLenisController()
  const [theme, setTheme] = useState(headerSections[0]?.theme ?? 'dark')
  const [activeHref, setActiveHref] = useState('#hero')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const themeTriggers = headerSections
        .map((section, index, sections) => {
          const element = document.getElementById(section.id)
          if (!element) {
            return null
          }

          return ScrollTrigger.create({
            trigger: element,
            start: 'top top+=88',
            end: 'bottom top+=88',
            onEnter: () => setTheme(section.theme),
            onEnterBack: () => setTheme(section.theme),
            onLeave: () => {
              const nextSection = sections[index + 1]
              if (nextSection) {
                setTheme(nextSection.theme)
              }
            },
            onLeaveBack: () => {
              const previousSection = sections[index - 1]
              setTheme(previousSection?.theme ?? 'dark')
            },
          })
        })
        .filter(Boolean)

      const updateActiveHref = () => {
        const markerY = window.innerHeight * 0.42
        let nextActiveHref = navItems[0]?.href ?? '#hero'

        navItems.forEach((item) => {
          const target = document.querySelector(item.href)

          if (!target) {
            return
          }

          const rect = target.getBoundingClientRect()

          if (rect.top <= markerY && rect.bottom > markerY) {
            nextActiveHref = item.href
          }
        })

        setActiveHref(nextActiveHref)
      }

      const activeTrigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: updateActiveHref,
        onRefresh: updateActiveHref,
      })

      updateActiveHref()

      ScrollTrigger.refresh()

      return () => {
        themeTriggers.forEach((trigger) => trigger.kill())
        activeTrigger.kill()
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const handleNavigate = (event, href) => {
    event.preventDefault()
    setIsMobileMenuOpen(false)
    setActiveHref(href)
    const target = document.querySelector(href)
    const lenis = lenisController?.getLenis()

    if (target && lenis) {
      lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentTheme = headerThemes[theme]

  return (
    <header className="site-header pointer-events-none fixed left-0 top-0 z-[100] w-full px-6 py-6 md:px-8 xl:px-16">
      <nav className="site-header-nav pointer-events-auto mx-auto flex w-full max-w-[1480px] items-center justify-between gap-8 pr-[160px] md:pr-[200px]">
        <a
          href="#hero"
          onClick={(event) => handleNavigate(event, '#hero')}
          className={`inline-flex rounded-full border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.34em] transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-500 ${currentTheme.brand}`}
        >
          Portfolio
        </a>

        <div
          className={`site-header-links flex items-center gap-1 rounded-full border px-2 py-2 transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-500 max-md:max-w-[calc(100vw-120px)] max-md:overflow-x-auto ${currentTheme.nav}`}
        >
          {navItems.map((item) => {
            const isActive = activeHref === item.href

            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigate(event, item.href)}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.24 }}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${currentTheme.item} ${isActive ? 'text-[#FFD600]' : ''}`}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-opacity duration-300 ${currentTheme.activeTint} ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />
                <span className="relative z-[1]">{item.label}</span>
                <motion.span
                  className="absolute bottom-1.5 left-4 right-4 h-px origin-left bg-[#FFD600]"
                  animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                  initial={false}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.a>
            )
          })}
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className={`site-header-toggle pointer-events-auto hidden items-center justify-center rounded-full border p-3 transition-[background-color,border-color,color,box-shadow,backdrop-filter] duration-500 ${currentTheme.brand}`}
        >
          <span className="site-header-toggle-lines" aria-hidden="true">
            <span className={isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''} />
            <span className={isMobileMenuOpen ? 'opacity-0' : ''} />
            <span className={isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="site-header-overlay pointer-events-auto fixed inset-0 flex min-h-screen w-full flex-col bg-[rgba(10,10,14,0.96)] px-6 py-24"
          >
            <div className="mx-auto flex w-full max-w-[1480px] justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white"
              >
                Close
              </button>
            </div>

            <div className="mx-auto flex w-full max-w-[1480px] flex-1 items-center justify-center">
              <div className="site-header-overlay-list flex flex-col items-center">
                {navItems.map((item) => {
                  const isActive = activeHref === item.href

                  return (
                    <a
                      key={`mobile-${item.href}`}
                      href={item.href}
                      onClick={(event) => handleNavigate(event, item.href)}
                      className={`rounded-[20px] px-6 py-4 text-center text-white transition-colors duration-300 ${isActive ? 'text-[#FFD600]' : 'text-white'}`}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
