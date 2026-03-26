import { memo, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { heroContent } from '../content/siteContent'
import HireMeButton from './HireMeButton'

gsap.registerPlugin(ScrollTrigger)

const portraitImage = '/Img/2.png'

const HeroSection = memo(function HeroSection() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const headingRef = useRef(null)
  const portraitRef = useRef(null)
  const locationRef = useRef(null)
  const resumeRef = useRef(null)

  useLayoutEffect(() => {
    const image = new Image()
    image.src = portraitImage

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.05,
        },
      })
        .to(headingRef.current, { yPercent: -6, ease: 'none' }, 0)
        .to(portraitRef.current, { yPercent: -8, scale: 1.03, ease: 'none' }, 0)
        .to(introRef.current, { yPercent: -14, opacity: 0.58, ease: 'none' }, 0)
        .to(locationRef.current, { yPercent: -8, opacity: 0.66, ease: 'none' }, 0)
        .to(resumeRef.current, { yPercent: -8, opacity: 0.92, ease: 'none' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[155vh] overflow-clip bg-[#F5F5F5] text-[#0F0F0F]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
      <HireMeButton />
        <p
          ref={introRef}
          className="absolute left-1/4 top-[450px] z-30 w-[min(600px,calc(100%-48px))] -translate-x-1/2 text-center text-[24px] font-medium tracking-[-0.01em] text-[#666666] md:w-[700px]"
        >
          {heroContent.introLine}
        </p>

        <div
          ref={headingRef}
          className="absolute inset-x-0 top-[34%] z-10 -translate-y-1/2 px-6 md:top-[28%] md:px-8 xl:px-16"
        >
          <div className="mx-auto max-w-[1480px]">
            <div className="relative z-30 text-center text-[clamp(42px,10vw,72px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-[#0F0F0F] md:text-[clamp(72px,9vw,160px)]">
              {heroContent.primaryTitle}
            </div>
            <div
              className="relative z-10 -mt-2 text-center text-[clamp(42px,10vw,72px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-transparent md:-mt-1 md:text-[clamp(72px,9vw,160px)]"
              style={{
                WebkitTextStroke: '1.6px #CFCFCF',
                opacity: 0.6,
              }}
            >
              {heroContent.secondaryTitle}
            </div>
          </div>
        </div>

        <div
          ref={portraitRef}
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-[62%] w-auto -translate-x-1/2 md:h-[85%]"
        >
          <img
            src={portraitImage}
            alt="Portrait of Rutik"
            loading="eager"
            className="h-full w-auto object-contain"
            style={{
              mixBlendMode: 'normal',
              WebkitMaskImage:
                'linear-gradient(to top, transparent 0%, black 30%, black 100%)',
              maskImage: 'linear-gradient(to top, transparent 0%, black 30%, black 100%)',
            }}
          />
        </div>

        {/* <p
          ref={locationRef}
          className="absolute bottom-[96px] left-1/2 z-30 -translate-x-1/2 text-[16px] font-medium text-[#555555] md:bottom-[40px] md:left-[60px] md:translate-x-0"
        >
          {heroContent.location}
        </p> */}

        <a
          ref={resumeRef}
          href="/Rutik-Kumbhar-Resume.pdf"
          download="Rutik-Resume.pdf"
          data-cursor="interactive"
          className="absolute bottom-[180px] left-1/3 z-30 inline-flex -translate-x-1/2 items-center rounded-full bg-[#111111] px-[24px] py-[12px] text-[18px] font-medium text-white transition-colors duration-300 hover:bg-[#FFD600] hover:text-black md:left-[360px] md:translate-x-0"
        >
          Download Resume
        </a>
      </div>
    </section>
  )
})

export default HeroSection
