import { useLenisController } from '../providers/SmoothScrollProvider'

function HireMeButton() {
  const lenisController = useLenisController()

  const handleClick = (event) => {
    event.preventDefault()
    const target = document.querySelector('#contact')
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

  return (
    <div className="hero-hire-button pointer-events-none absolute right-5 bottom-[100px] z-[110] md:right-14 md:bottom-[60px]">
      <a
        href="#contact"
        onClick={handleClick}
        data-cursor="interactive"
        aria-label="Hire Me"
        className="group pointer-events-auto relative block h-[96px] w-[96px] md:h-[112px] md:w-[112px]"
      >
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
          <svg viewBox="0 0 120 120" className="h-full w-full">
            <defs>
              <path
                id="hire-me-circle"
                d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
              />
            </defs>
            <text
              fill="#111111"
              fontSize="11"
              fontWeight="600"
              letterSpacing="3.2"
              style={{ textTransform: 'uppercase' }}
            >
              <textPath href="#hire-me-circle" startOffset="0%">
                HIRE ME • HIRE ME • HIRE ME •
              </textPath>
            </text>
          </svg>
        </div>

        <span className="absolute inset-[24px] flex items-center justify-center rounded-full bg-[#FF4D2D] text-[18px] text-white transition-[transform,background-color] duration-300 group-hover:scale-110 group-hover:bg-[#E34224] md:inset-[32px]">
          ↗
        </span>
      </a>
    </div>
  )
}

export default HireMeButton
