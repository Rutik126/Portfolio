import { memo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { heroCards } from '../content/siteContent'
import { Card } from './ui/card'
import { useAnimationStore } from '../store/animationStore'

gsap.registerPlugin(ScrollTrigger)

const frames = ['/Img/5.png', '/Img/6.png', '/Img/7.png', '/Img/8.png']

const floatingMotion = {
  y: [0, -10, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

const HeroSection = memo(function HeroSection() {
  const sectionRef = useRef(null)
  const sceneRef = useRef(null)
  const imageRef = useRef(null)
  const glowRef = useRef(null)
  const subjectRef = useRef(null)
  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)
  const setHeroFrame = useAnimationStore((state) => state.setHeroFrame)

  useEffect(() => {
    frames.forEach((src) => {
      const image = new Image()
      image.src = src
    })

    const frameState = {
      current: 0,
      target: 0,
      displayed: -1,
      rafId: 0,
    }

    const updateFrame = () => {
      frameState.current += (frameState.target - frameState.current) * 0.14
      const nextIndex = Math.round(frameState.current)

      if (nextIndex !== frameState.displayed && imageRef.current) {
        frameState.displayed = nextIndex
        imageRef.current.src = frames[nextIndex]
        setHeroFrame(nextIndex)
      }

      frameState.rafId = requestAnimationFrame(updateFrame)
    }

    if (imageRef.current) {
      imageRef.current.src = frames[0]
    }

    frameState.rafId = requestAnimationFrame(updateFrame)

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          frameState.target = self.progress * (frames.length - 1)
        },
      },
    })

    timeline
      .to(sceneRef.current, { yPercent: -76, ease: 'none' }, 0)
      .to(subjectRef.current, { yPercent: -14, scale: 1.06, ease: 'none' }, 0)
      .to(glowRef.current, { scale: 1.16, opacity: 0.88, ease: 'none' }, 0)
      .to(leftCardRef.current, { yPercent: -18, xPercent: -4, ease: 'none' }, 0)
      .to(rightCardRef.current, { yPercent: -10, xPercent: 4, ease: 'none' }, 0)

    return () => {
      cancelAnimationFrame(frameState.rafId)
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, [setHeroFrame])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[220vh] overflow-clip bg-[linear-gradient(135deg,#675FEC_0%,#413E5C_100%)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(17,20,40,0.36),transparent_30%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.35)_0.6px,transparent_0.6px)] [background-size:14px_14px]" />
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          ref={sceneRef}
          className="relative mx-auto flex h-full w-full max-w-[1400px] items-center justify-center px-6 md:px-8 xl:px-16"
        >
          <motion.div
            ref={leftCardRef}
            animate={floatingMotion}
            whileHover={{ y: -12, boxShadow: '0 24px 70px rgba(10,12,28,0.28)' }}
            className="absolute left-6 top-1/2 z-20 hidden w-[320px] -translate-y-1/2 lg:block"
          >
            <Card className="relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_80px_rgba(10,12,28,0.22)] [transform:rotateX(3deg)]">
              <div className="pointer-events-none absolute inset-0 rounded-[16px] border border-white/10" />
              <div className="pointer-events-none absolute inset-0 rounded-[16px] bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))]" />
              <div className="pointer-events-none absolute -inset-px rounded-[16px] bg-[linear-gradient(135deg,rgba(255,214,0,0.2),transparent_25%,rgba(255,255,255,0.06)_55%,rgba(103,95,236,0.22)_100%)] opacity-80" />
              <div className="absolute inset-[1px] rounded-[15px] bg-[linear-gradient(180deg,rgba(18,18,34,0.24),rgba(12,12,20,0.1))]" />
              <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(234,234,240,0.62)]">
                DESIGN + ENGINEERING
              </p>
              <h1 className="relative text-[clamp(3rem,5vw,4rem)] font-semibold leading-[0.96] text-white">
                {heroCards.intro.title}
              </h1>
              <p className="relative mt-6 text-[15px] leading-[1.6] text-[rgba(234,234,240,0.8)]">
                {heroCards.intro.body}
              </p>
            </Card>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
            <div className="absolute bottom-[15%] h-20 w-[320px] rounded-[50%] bg-black/30 blur-2xl" />
            <div
              ref={glowRef}
              className="absolute bottom-[18%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,214,0,0.14),rgba(103,95,236,0.28)_42%,transparent_72%)] blur-3xl"
            />
          </div>

          <div ref={subjectRef} className="relative z-10 flex h-full w-full items-end justify-center">
            <img
              ref={imageRef}
              alt="Full body portrait"
              loading="eager"
              className="w-[min(34vw,420px)] min-w-[280px] object-contain will-change-transform"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }}
            />
          </div>

          <motion.div
            ref={rightCardRef}
            animate={{
              y: [0, 10, 0],
              transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            whileHover={{ y: -10 }}
            className="absolute bottom-[12%] right-6 z-20 w-full max-w-[320px] lg:top-1/2 lg:w-[320px] lg:-translate-y-1/2"
          >
            <Card className="relative overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_80px_rgba(10,12,28,0.22)]">
              <div className="pointer-events-none absolute -inset-px rounded-[16px] bg-[linear-gradient(135deg,rgba(103,95,236,0.24),transparent_35%,rgba(255,214,0,0.12)_100%)]" />
              <div className="absolute inset-[1px] rounded-[15px] bg-[linear-gradient(180deg,rgba(18,18,34,0.18),rgba(12,12,20,0.08))]" />
              <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(234,234,240,0.62)]">
                {heroCards.skills.eyebrow}
              </p>
              <div className="relative grid gap-4">
                {heroCards.skills.items.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 8 }}
                    data-cursor="magnetic"
                    className="group flex items-center gap-4 rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-4 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(103,95,236,0.16)]"
                  >
                    <span className="text-xs font-semibold tracking-[0.3em] text-[#FFD600]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-medium text-[rgba(234,234,240,0.86)]">
                      {item}
                    </span>
                    <span className="ml-auto h-px w-10 origin-left bg-[linear-gradient(90deg,rgba(255,214,0,0.65),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default HeroSection
