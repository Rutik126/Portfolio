import { memo, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { milestones } from '../content/siteContent'
import SectionChrome from './SectionChrome'
import { useAnimationStore } from '../store/animationStore'

gsap.registerPlugin(ScrollTrigger)

function createParticleTargets(text, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#ffffff'
  context.font = '600 82px Satoshi, Inter, sans-serif'
  context.textAlign = 'left'
  context.textBaseline = 'middle'
  context.fillText(text, 8, height / 2)

  const { data } = context.getImageData(0, 0, width, height)
  const points = []

  for (let y = 0; y < height; y += 4) {
    for (let x = 0; x < width; x += 4) {
      const alpha = data[(y * width + x) * 4 + 3]

      if (alpha > 100) {
        points.push({ x, y })
      }
    }
  }

  return points.slice(0, 320)
}

function fractional(value) {
  return value - Math.floor(value)
}

function getDeterministicOffset(index) {
  const x = (fractional(Math.sin((index + 1) * 12.9898) * 43758.5453) - 0.5) * 20
  const y = (fractional(Math.cos((index + 1) * 78.233) * 24634.6345) - 0.5) * 20

  return { x, y }
}

function resizeCanvas(canvas, stage) {
  const width = Math.max(stage.clientWidth, 1)
  const height = Math.max(stage.clientHeight, 1)
  const dpr = window.devicePixelRatio || 1
  const context = canvas.getContext('2d')

  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  context.setTransform(dpr, 0, 0, dpr, 0, 0)

  return { context, width, height }
}

const TimelineSection = memo(function TimelineSection() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const dateTextRef = useRef(null)
  const stepRefs = useRef([])
  const activeIndex = useAnimationStore((state) => state.timelineIndex)
  const setTimelineIndex = useAnimationStore((state) => state.setTimelineIndex)
  const previousIndexRef = useRef(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const animations = stepRefs.current.flatMap((step, index) => {
        if (!step) {
          return []
        }

        const copy = step.querySelector('[data-copy]')

        const reveal = gsap.fromTo(
          copy,
          { y: 48, opacity: 0.24, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: step,
              start: 'top 68%',
              end: 'top 42%',
              scrub: true,
            },
          },
        )

        const activation = ScrollTrigger.create({
          trigger: step,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => setTimelineIndex(index),
          onEnterBack: () => setTimelineIndex(index),
        })

        return [reveal, activation]
      })

      return () =>
        animations.forEach((animation) => {
          animation.scrollTrigger?.kill?.()
          animation.kill?.()
        })
    }, sectionRef)

    return () => ctx.revert()
  }, [setTimelineIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    const textNode = dateTextRef.current

    if (!canvas || !stage || !textNode) {
      return undefined
    }

    const previousDate = milestones[previousIndexRef.current].date
    const nextDate = milestones[activeIndex].date
    const { context, width, height } = resizeCanvas(canvas, stage)

    const clearCanvas = () => {
      context.clearRect(0, 0, width, height)
    }

    if (previousDate === nextDate) {
      textNode.textContent = nextDate
      textNode.style.opacity = '1'
      textNode.style.filter = 'blur(0px)'
      textNode.style.transform = 'scale(1)'
      canvas.style.opacity = '0'
      clearCanvas()
      return undefined
    }

    const oldTargets = createParticleTargets(previousDate, width, height)
    const newTargets = createParticleTargets(nextDate, width, height)
    const safeOldTargets = oldTargets.length ? oldTargets : [{ x: 8, y: height / 2 }]
    const safeNewTargets = newTargets.length ? newTargets : [{ x: 8, y: height / 2 }]
    const particleCount = Math.max(safeOldTargets.length, safeNewTargets.length)

    const particles = Array.from({ length: particleCount }, (_, index) => {
      const from = safeOldTargets[index % safeOldTargets.length]
      const to = safeNewTargets[index % safeNewTargets.length]
      const offset = getDeterministicOffset(index)

      return {
        fromX: from.x,
        fromY: from.y,
        toX: to.x,
        toY: to.y,
        offsetX: offset.x,
        offsetY: offset.y + 10,
      }
    })

    const transitionState = { progress: 0 }

    const render = () => {
      clearCanvas()

      particles.forEach((particle) => {
        const progress = transitionState.progress
        const x =
          gsap.utils.interpolate(particle.fromX, particle.toX, progress) +
          particle.offsetX * (1 - progress)
        const y =
          gsap.utils.interpolate(particle.fromY, particle.toY, progress) +
          particle.offsetY * (1 - progress)
        const alpha = 0.12 + (1 - Math.abs(progress - 0.5) * 2) * 0.68

        context.fillStyle = `rgba(234, 234, 240, ${alpha})`
        context.beginPath()
        context.arc(x, y, 1.4 + (1 - progress) * 0.3, 0, Math.PI * 2)
        context.fill()
      })
    }

    textNode.textContent = previousDate
    canvas.style.opacity = '1'
    render()

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        canvas.style.opacity = '0'
        clearCanvas()
      },
    })

    timeline.to(textNode, { filter: 'blur(6px)', opacity: 0, duration: 0.32 }, 0)
    timeline.fromTo(
      transitionState,
      { progress: 0 },
      {
        progress: 1,
        duration: 0.8,
        onUpdate: render,
      },
      0.2,
    )
    timeline.add(() => {
      textNode.textContent = nextDate
    }, 0.2)
    timeline.fromTo(
      textNode,
      { scale: 0.9, opacity: 0, filter: 'blur(6px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
      0.2,
    )

    previousIndexRef.current = activeIndex

    const handleResize = () => {
      resizeCanvas(canvas, stage)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      timeline.kill()
    }
  }, [activeIndex])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative z-30 -mt-[32vh] rounded-t-[32px] bg-[#080910] px-6 pb-28 pt-2 md:px-8 xl:px-16"
    >
      {/* <SectionChrome
        label="EXPERIENCE"
        transition="linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(171,171,171,0.18) 38%, rgba(8,9,16,0.96) 100%)"
        tone="dark"
      /> */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[32%_68%]">
        <div className="relative">
          <div className="sticky top-0 left-[10vh] flex min-h-screen items-center">
            <div ref={stageRef} className="relative h-[180px] w-full max-w-[440px]">
              <h2
                ref={dateTextRef}
                className="absolute inset-0 flex items-center text-[92px] tracking-[0.08em] text-[rgba(234,234,240,0.92)] font-normal"
                style={{  fontFamily: "'Micro 5', monospace", textShadow: '0 0 18px rgba(94, 90, 90, 0.08)'}}
                // style={{ transformOrigin: '0% 50%' }}
              >
                {milestones[0].date}
              </h2>
              <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" />
            </div>
          </div>
        </div>

        <div className="relative">
          {milestones.map((item, index) => (
            <div
              key={item.date}
              ref={(element) => {
                stepRefs.current[index] = element
              }}
              className="timeline-step flex min-h-[88vh] items-center border-t border-white/6 py-20 first:border-t-0"
            >
              <article data-copy className="max-w-3xl">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(255,214,0,0.8)]">
                  {item.title}
                </p>
                <p className="text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.45] text-[rgba(234,234,240,0.9)]">
                  {item.body}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default TimelineSection
