import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { articles } from '../content/siteContent'
import { Card } from './ui/card'

gsap.registerPlugin(ScrollTrigger)

const INITIAL_VISIBLE_ARTICLES = 3
const LOAD_MORE_BATCH = 4

const ArticlesSection = memo(function ArticlesSection() {
  const cardRefs = useRef([])
  const shadowRefs = useRef([])
  const pendingAnchorRef = useRef(null)
  const revealStartIndexRef = useRef(INITIAL_VISIBLE_ARTICLES)
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(INITIAL_VISIBLE_ARTICLES, articles.length),
  )

  const visibleArticles = articles.slice(0, visibleCount)
  const hasMoreArticles = visibleCount < articles.length

  useEffect(() => {
    if (activeIndex >= visibleArticles.length) {
      setActiveIndex(Math.max(visibleArticles.length - 1, 0))
    }
  }, [activeIndex, visibleArticles.length])

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, visibleArticles.length)
    shadowRefs.current = shadowRefs.current.slice(0, visibleArticles.length)

    const triggers = cardRefs.current.map((card, index) =>
      ScrollTrigger.create({
        trigger: card,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      }),
    )

    requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => triggers.forEach((trigger) => {
      trigger.kill()
    })
  }, [visibleArticles.length])

  useLayoutEffect(() => {
    if (!pendingAnchorRef.current) {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => {
      const anchorCard = cardRefs.current[pendingAnchorRef.current.index]
      const nextTop = anchorCard?.getBoundingClientRect().top

      if (typeof nextTop === 'number') {
        const scrollOffset = nextTop - pendingAnchorRef.current.top

        if (Math.abs(scrollOffset) > 1) {
          window.scrollBy({ top: scrollOffset, left: 0, behavior: 'auto' })
        }
      }

      pendingAnchorRef.current = null
      ScrollTrigger.refresh()
    })

    return () => window.cancelAnimationFrame(frameId)
  }, [visibleCount])

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

  const handleLoadMore = () => {
    const anchorIndex = Math.min(activeIndex, visibleCount - 1)
    const anchorTop = cardRefs.current[anchorIndex]?.getBoundingClientRect().top

    pendingAnchorRef.current =
      typeof anchorTop === 'number'
        ? { index: anchorIndex, top: anchorTop }
        : null

    revealStartIndexRef.current = visibleCount
    setVisibleCount((currentCount) => Math.min(currentCount + LOAD_MORE_BATCH, articles.length))
  }

  return (
    <section
      id="articles"
      className="relative z-[70] -mt-[10vh] rounded-t-[32px] bg-[#090a11] px-6 pb-36 pt-32 md:px-8 xl:px-16"
    >
      {/* <SectionChrome
        label="ARTICLES"
        transition="linear-gradient(180deg, rgba(214,226,241,0) 0%, rgba(108,119,132,0.2) 42%, rgba(9,10,17,0.96) 100%)"
        tone="dark"
      /> */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,214,0,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-16 max-w-2xl">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(255,214,0,0.8)]">
            Articles
          </p> */}
          <h2 className="mt-6 text-[clamp(2.6rem,5vw,4rem)] font-bold leading-tight text-[rgba(234,234,240,0.9)]">
            A layered reading experience where each idea arrives with weight.
          </h2>
        </div>

        <div className="space-y-10">
          {visibleArticles.map((article, index) => (
            <motion.div
              key={article.title}
              className="sticky top-28"
              initial={
                index >= revealStartIndexRef.current
                  ? { opacity: 0, y: 40, scale: 0.98 }
                  : false
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
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
            </motion.div>
          ))}
        </div>

        {hasMoreArticles ? (
          <div className="relative z-20 mt-12 flex justify-center pb-4">
            <motion.button
              type="button"
              onClick={handleLoadMore}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="group inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] text-[rgba(234,234,240,0.86)] shadow-[0_18px_46px_rgba(0,0,0,0.2)] backdrop-blur-[18px] transition-colors duration-300 hover:border-[rgba(255,214,0,0.4)] hover:text-[#FFD600]"
              aria-label="Load more articles"
            >
              <ChevronDown className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.button>
          </div>
        ) : null}
      </div>
    </section>
  )
})

export default ArticlesSection
