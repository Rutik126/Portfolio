import { memo, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { projects } from '../content/siteContent'
import { Card } from './ui/card'
import SectionChrome from './SectionChrome'
import { useAnimationStore } from '../store/animationStore'

gsap.registerPlugin(ScrollTrigger)

const cloudDots = Array.from({ length: 28 }, (_, index) => ({
  position: [
    Math.sin(index * 1.4) * 6,
    Math.cos(index * 0.8) * 2.8,
    -index * 0.42,
  ],
  scale: 0.55 + (index % 5) * 0.14,
  opacity: 0.15 + (index % 4) * 0.08,
}))

function CloudField() {
  const groupRef = useRef(null)

  useFrame(({ camera, clock }) => {
    const progress = useAnimationStore.getState().scrollProgress
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.03
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.2
    }

    camera.position.z = 8 - progress * 1.2
    camera.position.x = Math.sin(clock.elapsedTime * 0.1) * 0.08
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <color attach="background" args={['#d6e2f1']} />
      <fog attach="fog" args={['#d6e2f1', 2, 12]} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 5, 2]} intensity={1.15} color="#ffffff" />
      <group ref={groupRef}>
        {cloudDots.map((cloud, index) => (
          <mesh key={index} position={cloud.position} scale={cloud.scale}>
            <sphereGeometry args={[1.3, 24, 24]} />
            <meshStandardMaterial
              color={new THREE.Color(`hsl(${210 + index * 2}, 65%, 92%)`)}
              transparent
              opacity={cloud.opacity}
              roughness={0.2}
              metalness={0.02}
            />
          </mesh>
        ))}
      </group>
    </>
  )
}

const ProjectsSection = memo(function ProjectsSection() {
  const stepRefs = useRef([])
  const cardRefs = useRef([])
  const surfaceRefs = useRef([])
  const titleRefs = useRef([])
  const sweepRefs = useRef([])
  const setProjectIndex = useAnimationStore((state) => state.setProjectIndex)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      setIsMobile(false)

      const animations = stepRefs.current.map((step, index) => {
        const card = cardRefs.current[index]
        const title = titleRefs.current[index]
        return gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: true,
            onEnter: () => setProjectIndex(index),
            onEnterBack: () => setProjectIndex(index),
          },
        })
          .fromTo(
            card,
            {
              yPercent: 10,
              scale: 0.72,
              opacity: 0.18,
              rotateX: 8,
              rotateY: index % 2 === 0 ? -6 : 6,
              z: -120,
            },
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              rotateX: 0,
              rotateY: 0,
              z: 0,
              ease: 'none',
            },
            0,
          )
          .to(
            card,
            {
              yPercent: -10,
              scale: 0.78,
              opacity: 0.24,
              rotateX: -4,
              z: -160,
              ease: 'none',
            },
            0.64,
          )
          .fromTo(
            title,
            { scale: 0.94, opacity: 0.08, filter: 'blur(16px)' },
            { scale: 1.08, opacity: 0.16, filter: 'blur(8px)', ease: 'none' },
            0,
          )
          .to(title, { scale: 1.24, opacity: 0.28, filter: 'blur(2px)', ease: 'none' }, 0.64)
      })

      return () => animations.forEach((animation) => {
        animation.scrollTrigger?.kill()
        animation.kill()
      })
    })

    mm.add('(max-width: 767px)', () => {
      setIsMobile(true)

      const animations = stepRefs.current.map((step, index) => {
        const card = cardRefs.current[index]

        gsap.set(card, {
          clearProps: 'x,y,z,rotateX,rotateY',
        })

        return gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'left 88%',
              end: 'center center',
              containerAnimation: undefined,
              toggleActions: 'play none none reverse',
              onEnter: () => setProjectIndex(index),
              onEnterBack: () => setProjectIndex(index),
            },
          },
        )
      })

      return () => animations.forEach((animation) => {
        animation.scrollTrigger?.kill()
        animation.kill()
      })
    })

    return () => mm.revert()
  }, [setProjectIndex])

  const handleProjectMove = (index, event) => {
    if (isMobile) {
      return
    }

    const card = surfaceRefs.current[index]
    if (!card) {
      return
    }

    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    gsap.to(card, {
      rotateY: x * 7,
      rotateX: -y * 7,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleProjectEnter = (index) => {
    if (isMobile) {
      return
    }

    if (sweepRefs.current[index]) {
      gsap.fromTo(
        sweepRefs.current[index],
        { xPercent: -140 },
        { xPercent: 160, duration: 0.8, ease: 'power3.out', overwrite: true },
      )
    }
  }

  const handleProjectLeave = (index) => {
    if (isMobile) {
      return
    }

    if (surfaceRefs.current[index]) {
      gsap.to(surfaceRefs.current[index], {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'power3.out',
      })
    }
  }

  return (
    <section
      id="projects"
      className="projects-section relative z-40 -mt-[20vh] overflow-hidden rounded-t-[32px] bg-[linear-gradient(180deg,#d6e2f1_0%,#e6edf5_28%,#c7d5e2_58%,#090d15_100%)] px-6 pb-20 pt-24 md:px-8 xl:px-16"
    >
      {/* <SectionChrome
        label="PROJECTS"
        transition="linear-gradient(180deg, rgba(8,9,16,0) 0%, rgba(163,177,191,0.18) 42%, rgba(214,226,241,0.94) 100%)"
        tone="light"
      />
      {!isMobile ? (
        <div className="pointer-events-none absolute inset-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
            <CloudField />
          </Canvas>
        </div>
      ) : null} */}

      <div className="projects-list relative mx-auto max-w-[1200px]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(element) => {
              stepRefs.current[index] = element
            }}
            className="project-step relative flex min-h-[72vh] items-center justify-center pb-16"
            style={{ perspective: '1600px' }}
          >
            <div
              ref={(element) => {
                titleRefs.current[index] = element
              }}
              className="project-watermark pointer-events-none absolute inset-x-0 text-center text-[clamp(3.4rem,9vw,9rem)] font-bold uppercase tracking-[0.16em] text-[rgba(32,48,77,0.12)]"
            >
              {project.title}
            </div>

            <div
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className="project-card-shell relative w-full max-w-[960px] [transform-style:preserve-3d] will-change-transform"
              onMouseMove={(event) => handleProjectMove(index, event)}
              onMouseEnter={() => handleProjectEnter(index)}
              onMouseLeave={() => handleProjectLeave(index)}
            >
              <div
                ref={(element) => {
                  surfaceRefs.current[index] = element
                }}
                className="project-card-surface [transform-style:preserve-3d]"
              >
                <a href={`/project/${project.slug}`} className="group block" data-cursor="interactive">
                  <Card
                    padding="compact"
                    className="project-card overflow-hidden border-white/30 bg-white/[0.54] text-[#162033] shadow-[0_24px_72px_rgba(10,14,28,0.14)] md:p-7"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#324361]">
                      {project.tag}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        ['Client', project.client],
                        ['Role', project.role],
                        ['Duration', project.duration],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#324361]/58">
                            {label}
                          </p>
                          <p className="mt-1.5 text-sm leading-6 text-[#25324b]/86">{value}</p>
                        </div>
                      ))}
                    </div>

                    <h2 className="mt-4 text-[clamp(2.3rem,5vw,4.1rem)] font-bold leading-[0.95]">
                      {project.title}
                    </h2>
                    <p className="project-card-body mt-4 max-w-3xl text-[15px] leading-7 text-[#33425d]">
                      {project.body}
                    </p>
                    <div className="project-card-image relative mt-6 h-[320px] overflow-hidden rounded-[22px] border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] md:h-[350px]">
                      <img
                        src={project.heroImage}
                        alt={`${project.title} preview`}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.05]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.4),rgba(0,0,0,0.08)_42%,transparent)]" />
                      <div
                        ref={(element) => {
                          sweepRefs.current[index] = element
                        }}
                        className="pointer-events-none absolute inset-y-0 left-[-20%] w-[28%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]"
                      />
                    </div>

                    <div className="mt-4 flex justify-end">
                      <span className="inline-flex items-center gap-3 text-sm font-medium text-[#1e2a3f] transition-transform duration-300 group-hover:translate-x-1">
                        View Project
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1e2a3f]/12 bg-white/45 transition-transform duration-300 group-hover:translate-x-1">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </Card>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

export default ProjectsSection
