import { memo, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { heroContent } from '../content/siteContent'
import HireMeButton from './HireMeButton'

gsap.registerPlugin(ScrollTrigger)

const portraitImage = '/Img/4.png'
const capabilityCardStyles = [
  'bg-[#F1E2D0] text-[#111111] -rotate-[6deg] translate-y-2',
  'bg-[#111111] text-white rotate-[4deg] -translate-y-1',
  'bg-[#E7ECF4] text-[#111111] -rotate-[3deg] translate-y-1',
  'bg-[#F4EEE4] text-[#111111] rotate-[5deg] -translate-y-2',
]

const HeroSection = memo(function HeroSection() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const headingRef = useRef(null)
  const portraitRef = useRef(null)
  const capabilityRef = useRef(null)
  const locationRef = useRef(null)
  const actionsRef = useRef(null)
  const highlightedName = 'Rutik Kumbhar'
  const [introBeforeName, introAfterName] = heroContent.introLine.split(highlightedName)

  useLayoutEffect(() => {
    const image = new Image()
    image.src = portraitImage

    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
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
          .to(capabilityRef.current, { yPercent: -10, opacity: 0.94, ease: 'none' }, 0)
          .to(introRef.current, { yPercent: -14, opacity: 0.58, ease: 'none' }, 0)
          .to(locationRef.current, { yPercent: -8, opacity: 0.66, ease: 'none' }, 0)
          .to(actionsRef.current, { yPercent: -8, opacity: 0.92, ease: 'none' }, 0)
      }, sectionRef)

      return () => ctx.revert()
    })

    mm.add('(max-width: 767px)', () => {
      const ctx = gsap.context(() => {
        gsap.set([introRef.current, headingRef.current, capabilityRef.current, actionsRef.current], {
          clearProps: 'transform',
        })

        gsap.fromTo(
          [portraitRef.current, headingRef.current, introRef.current, actionsRef.current, capabilityRef.current],
          {
            autoAlpha: 0,
            y: 24,
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          },
        )
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative min-h-[155vh] overflow-clip bg-[#F5F5F5] text-[#0F0F0F]"
    >
      <div className="hero-sticky sticky top-0 h-screen overflow-hidden">
        <HireMeButton />
        <p
          ref={introRef}
          className="hero-intro absolute left-[5%] top-[58%] z-30 max-w-[420px] -translate-y-1/2 text-left text-[clamp(16px,1.2vw,20px)] font-medium tracking-[-0.01em] text-[#666666]"
        >
          {introBeforeName}
          <span className="font-bold text-[#0F0F0F]">{highlightedName}</span>
          {introAfterName}
        </p>

        <div
          ref={headingRef}
          className="hero-heading absolute inset-x-0 top-[36%] z-10 -translate-y-1/2 px-6 md:top-[28%] md:px-8 xl:px-16"
        >
          <div className="mx-auto max-w-[1480px]">
            <div className="hero-heading-line relative z-30 text-center text-[clamp(42px,10vw,72px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-[#0F0F0F] md:text-[clamp(72px,9vw,160px)]">
              {heroContent.primaryTitle}
            </div>
            <div
              className="hero-heading-line relative z-10 -mt-2 text-center text-[clamp(42px,10vw,72px)] font-extrabold leading-[0.9] tracking-[-0.06em] text-transparent md:-mt-1 md:text-[clamp(72px,9vw,160px)]"
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
          className="hero-portrait pointer-events-none absolute top-[18%] left-1/2 z-20 h-[62%] w-auto -translate-x-1/2 md:h-[85%]"
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

        <div
          ref={capabilityRef}
          className="hero-capability absolute inset-x-0 bottom-[4%] z-30 px-4 sm:bottom-[4%] md:bottom-[3%]"
        >
          <div className="hero-capability-list group mx-auto flex w-fit max-w-full items-end justify-center -space-x-[44px] transition-all duration-500 hover:space-x-2 md:-space-x-[52px] md:hover:space-x-4">
            {heroContent.capabilityCards.map((card, index) => {
              const isDarkCard = index === 1

              return (
                <article
                  key={card.label}
                  className={`hero-capability-card pointer-events-auto relative flex min-h-[94px] w-[108px] flex-col justify-between overflow-hidden rounded-[24px] border border-black/10 px-3 py-3 shadow-[0_18px_34px_rgba(15,15,15,0.08)] transition-all duration-500 hover:z-40 hover:-translate-y-2 hover:rotate-0 md:min-h-[108px] md:w-[128px] md:px-4 md:py-4 md:group-hover:translate-y-0 md:group-hover:rotate-0 ${capabilityCardStyles[index]}`}
                  style={{ zIndex: heroContent.capabilityCards.length - index }}
                >
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-[0.28em] md:text-[10px] md:tracking-[0.32em] ${isDarkCard ? 'text-white/60' : 'text-black/45'}`}
                  >
                    {card.cue}
                  </span>
                  <div className={`mt-3 h-px w-full ${isDarkCard ? 'bg-white/12' : 'bg-black/10'}`} />
                  <p className="mt-3 max-w-[9ch] text-[clamp(0.84rem,2vw,1.12rem)] font-semibold leading-[1.04] tracking-[-0.05em]">
                    {card.label}
                  </p>
                  <span
                    className={`absolute right-3 top-3 text-[2rem] font-black leading-none tracking-[-0.08em] md:right-4 md:top-4 md:text-[2.5rem] ${isDarkCard ? 'text-white/12' : 'text-black/[0.08]'}`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </article>
              )
            })}
          </div>
        </div>

        {/* <p
          ref={locationRef}
          className="absolute bottom-[96px] left-1/2 z-30 -translate-x-1/2 text-[16px] font-medium text-[#555555] md:bottom-[40px] md:left-[60px] md:translate-x-0"
        >
          {heroContent.location}
        </p> */}

        <div
          ref={actionsRef}
          className="hero-actions absolute left-[5%] top-[60%] z-30 flex max-w-[430px] -translate-y-1/2 pr-4 sm:top-[72%]"
        >
          <div className="flex flex-wrap items-center justify-start gap-3">
            <a
              href="/case-studies.html"
              target="_blank"
              rel="noreferrer"
              data-cursor="interactive"
              className="inline-flex items-center rounded-full bg-[#111111] px-[22px] py-[12px] text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#FFD600] hover:text-black md:text-[16px]"
            >
              View Case Studies
            </a>
            <a
              href="/Rutik-Kumbhar-Resume.pdf"
              download="Rutik-Resume.pdf"
              data-cursor="interactive"
              className="inline-flex items-center rounded-full border border-black/10 bg-white/65 px-[22px] py-[12px] text-[15px] font-medium text-[#111111] transition-all duration-300 hover:border-black/20 hover:bg-white md:text-[16px]"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
})

export default HeroSection
