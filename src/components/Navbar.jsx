import { motion } from 'framer-motion'
import { navItems } from '../content/siteContent'
import { useLenisController } from '../providers/SmoothScrollProvider'

function Navbar() {
  const lenisController = useLenisController()

  const handleNavigate = (event, href) => {
    event.preventDefault()
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

  return (
    <header className="pointer-events-none fixed left-0 top-0 z-[90] w-full px-6 py-6 md:px-8 xl:px-16">
      <nav className="pointer-events-auto mx-auto flex w-full max-w-[1200px] items-center justify-between">
        <a
          href="#hero"
          onClick={(event) => handleNavigate(event, '#hero')}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(234,234,240,0.86)]"
        >
          Portfolio
        </a>

        <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[rgba(234,234,240,0.8)] backdrop-blur-[20px]">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavigate(event, item.href)}
              className="group relative"
              whileHover={{ color: '#FFD600' }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-[#FFD600]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.24 }}
              />
            </motion.a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
