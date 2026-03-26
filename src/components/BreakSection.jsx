import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'

const angles = [-32, -18, -8]
const phrases = [
  'SYSTEM THINKING',
  'UX DRIVEN DEVELOPMENT',
  'DESIGN WITH PURPOSE',
  'INTERFACE AS EXPERIENCE',
]

const BreakSection = memo(function BreakSection() {
  const bandsRef = useRef([])

  useEffect(() => {
    const animations = bandsRef.current.map((band, index) => {
      const track = band.querySelector('[data-track]')
      return gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 16 + index * 3,
          ease: 'none',
          repeat: -1,
        },
      )
    })

    return () => animations.forEach((animation) => animation.kill())
  }, [])

  return (
    <section className="relative z-20 -mt-[24vh] h-[130vh] overflow-hidden rounded-t-[24px] bg-[#0a0a10]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_center,rgba(255,214,0,0.12),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(0,0,0,0.45)_0.7px,transparent_0.7px)] [background-size:16px_16px]" />
        {angles.map((angle, index) => (
          <div
            key={angle}
            ref={(element) => {
              bandsRef.current[index] = element
            }}
            className="absolute left-1/2 top-1/2 flex h-[120px] w-[180vw] -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden border-y border-black/20 text-[#121212] shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
            style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#FFD600_0%,#FFB800_100%)]" />
            <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(0,0,0,0.45)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div
              data-track
              className="relative flex min-w-max gap-12 whitespace-nowrap py-8 text-sm font-semibold uppercase tracking-[0.32em]"
            >
              {Array.from({ length: 6 }).map((_, repeatIndex) => (
                <span key={repeatIndex}>
                  {phrases.map((phrase) => (
                    <span key={`${phrase}-${repeatIndex}`} className="mr-12">
                      {phrase}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

export default BreakSection
