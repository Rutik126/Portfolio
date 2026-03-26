import { memo, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { milestones } from '../content/siteContent'
import { useAnimationStore } from '../store/animationStore'

gsap.registerPlugin(ScrollTrigger)

function createParticleTargets(text, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, width, height)
  context.fillStyle = '#ffffff'
  context.font = '700 72px Inter, sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, width / 2, height / 2)
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

  return points.slice(0, 260)
}

const TimelineSection = memo(function TimelineSection() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const dateTextRef = useRef(null)
  const stepRefs = useRef([])
  const activeIndex = useAnimationStore((state) => state.timelineIndex)
  const setTimelineIndex = useAnimationStore((state) => state.setTimelineIndex)

  useEffect(() => {
    const animations = stepRefs.current.map((step, index) =>
      gsap.fromTo(
        step.querySelector('[data-copy]'),
        { y: 80, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            end: 'top 20%',
            scrub: true,
            onEnter: () => setTimelineIndex(index),
            onEnterBack: () => setTimelineIndex(index),
          },
        },
      ),
    )

    return () => animations.forEach((animation) => {
      animation.scrollTrigger?.kill()
      animation.kill()
    })
  }, [setTimelineIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    const targets = createParticleTargets(milestones[activeIndex].date, width, height)
    const previousTargets = JSON.parse(canvas.dataset.points || '[]')
    const particles = targets.map((point, index) => {
      const source = previousTargets[index % previousTargets.length] || point
      return {
        x: source.x + (Math.random() - 0.5) * 90,
        y: source.y - Math.random() * 80,
        tx: point.x,
        ty: point.y,
        sx: source.x + (Math.random() - 0.5) * 90,
        sy: source.y - Math.random() * 80,
      }
    })

    canvas.dataset.points = JSON.stringify(targets)
    const animationState = { progress: 0 }

    const render = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = 'rgba(234,234,240,0.88)'
      context.filter = `blur(${(1 - animationState.progress) * 5}px)`

      particles.forEach((particle) => {
        const progress = animationState.progress
        particle.x = particle.sx + (particle.tx - particle.sx) * progress
        particle.y = particle.sy + (particle.ty - particle.sy) * progress
        context.globalAlpha = 0.15 + progress * 0.85
        context.beginPath()
        context.arc(particle.x, particle.y, 1.6, 0, Math.PI * 2)
        context.fill()
      })
      context.filter = 'blur(0px)'
    }

    canvas.style.opacity = '1'
    const tween = gsap.fromTo(
      animationState,
      { progress: 0 },
      {
        progress: 1,
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: render,
        onComplete: () => {
          canvas.style.opacity = '0.96'
        },
      },
    )

    gsap.fromTo(
      dateTextRef.current,
      { opacity: 0.08, y: 16 },
      { opacity: 0.18, y: 0, duration: 0.8, ease: 'power3.out' },
    )

    return () => tween.kill()
  }, [activeIndex])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative z-30 -mt-[24vh] rounded-t-[24px] bg-[#080910] px-6 py-24 md:px-8 xl:px-16"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[30%_70%]">
        <div className="relative">
          <div className="sticky top-0 flex min-h-screen items-center">
            <div className="relative h-[200px] w-full max-w-[440px]">
              <h2
                ref={dateTextRef}
                className="absolute inset-0 flex items-center text-[72px] font-semibold tracking-[-0.04em]"
                style={{
                  color: 'rgba(234,234,240,0.08)',
                  WebkitTextStroke: '1px rgba(234,234,240,0.14)',
                }}
              >
                {milestones[activeIndex].date}
              </h2>
              <canvas
                ref={canvasRef}
                width="440"
                height="200"
                className="absolute inset-0 h-full w-full"
              />
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
              className="timeline-step flex min-h-screen items-center"
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
