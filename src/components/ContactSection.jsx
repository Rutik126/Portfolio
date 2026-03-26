import { memo, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowUpRight, Dribbble, Linkedin, Mail } from 'lucide-react'
import { contacts } from '../content/siteContent'
import { Card } from './ui/card'
import SectionChrome from './SectionChrome'

const socials = [
  { icon: Dribbble, label: 'Dribbble' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Mail, label: 'Email' },
]

const ContactSection = memo(function ContactSection() {
  const blobRef = useRef(null)
  const dotsRef = useRef(null)
  const iconRefs = useRef([])

  useEffect(() => {
    const blob = gsap.to(blobRef.current, {
      x: 48,
      y: -18,
      scale: 1.08,
      duration: 14,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    const dots = gsap.to(dotsRef.current, {
      backgroundPosition: '40px 40px',
      duration: 18,
      repeat: -1,
      ease: 'none',
    })

    return () => {
      blob.kill()
      dots.kill()
    }
  }, [])

  const handleIconMove = (index, event) => {
    const icon = iconRefs.current[index]
    if (!icon) {
      return
    }

    const bounds = icon.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 14
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 14

    gsap.to(icon, {
      x,
      y,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleIconLeave = (index) => {
    const icon = iconRefs.current[index]
    if (!icon) {
      return
    }

    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return (
    <section
      id="contact"
      className="relative z-[60] -mt-[10vh] overflow-hidden rounded-t-[32px] bg-[linear-gradient(135deg,#4f4870_0%,#2f2c48_48%,#0e1118_100%)] px-6 pb-40 pt-12 md:px-8 xl:px-16"
    >
      {/* <SectionChrome
        label="CONTACT"
        transition="linear-gradient(180deg, rgba(9,10,17,0) 0%, rgba(60,58,96,0.24) 42%, rgba(79,72,112,0.92) 100%)"
        tone="dark"
      /> */}
      <div
        ref={blobRef}
        className="absolute right-[-10%] top-[4%] h-[420px] w-[420px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(255,70,83,0.42) 0%, rgba(82,255,177,0.26) 44%, rgba(76,113,255,0.28) 76%, transparent 100%)',
        }}
      />
      <div
        ref={dotsRef}
        className="absolute inset-y-0 right-0 w-[38%] opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]"
      />

      <div className="relative mx-auto grid max-w-[1200px] top-[18vh] gap-12 md:grid-cols-2">
        <div className="max-w-xl">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(234,234,240,0.68)]">
            Contact
          </p> */}
          <h2 className="mt-6 text-[clamp(3.5rem,7vw,6rem)] font-bold leading-[0.95] text-white">
            Get in touch
          </h2>
          <p className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-[rgba(234,234,240,0.88)]">
            Start a conversation
          </p>
        </div>

        <Card className="grid gap-6">
          {contacts.map((item) => (
            <div key={item.label} className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(234,234,240,0.56)]">
                {item.label}
              </span>
              <span className="text-base text-[rgba(234,234,240,0.9)]">{item.value}</span>
            </div>
          ))}

          <div className="mt-2 flex flex-wrap gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(255,214,0,0.28)' }}
                  ref={(element) => {
                    iconRefs.current[index] = element
                  }}
                  data-cursor="magnetic"
                  onMouseMove={(event) => handleIconMove(index, event)}
                  onMouseLeave={() => handleIconLeave(index)}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white backdrop-blur-[20px]"
                  aria-label={social.label}
                >
                  <Icon size={18} />
                </motion.a>
              )
            })}
          </div>

          <motion.a
            href="mailto:hello@portfolio.dev"
            whileHover={{ x: 6 }}
            className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-[rgba(234,234,240,0.88)]"
          >
            Open conversation
            <ArrowUpRight size={16} />
          </motion.a>
        </Card>
      </div>
    </section>
  )
})

export default ContactSection
