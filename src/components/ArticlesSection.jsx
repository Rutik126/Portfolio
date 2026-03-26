import { memo, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { articles } from '../content/siteContent'
import { Card } from './ui/card'
import SectionChrome from './SectionChrome'

gsap.registerPlugin(ScrollTrigger)

const ArticlesSection = memo(function ArticlesSection() {
  const cardRefs = useRef([])
  const shadowRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const triggers = cardRefs.current.map((card, index) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      }),
    )

    return () => triggers.forEach((trigger) => {
      trigger.kill()
    })
  }, [])

  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      const state =
        index === activeIndex
          ? { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0 }
          : index < activeIndex
            ? { scale: 0.97, opacity: 0.58, filter: 'blur(6px)', y: -16 }
            : { scale: 0.985, opacity: 0.8, filter: 'blur(0px)', y: 12 }

      gsap.to(card, {
        ...state,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.to(shadowRefs.current[index], {
        opacity: index === activeIndex ? 0.4 : 0.18,
        scale: index === activeIndex ? 1 : 0.94,
        duration: 0.8,
        ease: 'power3.out',
      })
    })
  }, [activeIndex])

  return (
    <section
      id="articles"
      className="relative z-50 -mt-[20vh] rounded-t-[32px] bg-[#090a11] px-6 pb-28 pt-32 md:px-8 xl:px-16"
    >
      <SectionChrome
        label="ARTICLES"
        transition="linear-gradient(180deg, rgba(214,226,241,0) 0%, rgba(108,119,132,0.2) 42%, rgba(9,10,17,0.96) 100%)"
        tone="dark"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,214,0,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-2xl">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(255,214,0,0.8)]">
            Articles
          </p> */}
          <h2 className="mt-6 text-[clamp(2.6rem,5vw,4rem)] font-bold leading-tight text-[rgba(234,234,240,0.9)]">
            A layered reading experience where each idea arrives with weight.
          </h2>
        </div>

        <div className="space-y-10">
          {articles.map((article, index) => (
            <div key={article.title} className="sticky top-28">
              <div
                ref={(element) => {
                  shadowRefs.current[index] = element
                }}
                className="pointer-events-none absolute inset-x-6 top-8 h-[82%] rounded-[24px] bg-black/30 blur-2xl"
              />
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                <Card
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  className="relative grid min-h-[340px] grid-cols-1 gap-10 overflow-hidden border-white/8 bg-white/[0.04] md:grid-cols-[1.1fr_0.9fr]"
                >
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(161,161,181,0.7)]">
                        Essay {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-4 text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight text-[rgba(234,234,240,0.9)]">
                        {article.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-base leading-8 text-[rgba(234,234,240,0.76)]">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="min-h-[240px] rounded-[20px]"
                    style={{ backgroundImage: article.image }}
                  />
                </Card>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default ArticlesSection
