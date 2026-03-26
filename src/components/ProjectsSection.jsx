import { memo, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { projects } from '../content/siteContent'
import { Card } from './ui/card'
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

  useEffect(() => {
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
            yPercent: 18,
            scale: 0.35,
            opacity: 0,
            rotateX: 16,
            rotateY: index % 2 === 0 ? -12 : 12,
            z: -220,
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
            yPercent: -16,
            scale: 0.24,
            opacity: 0,
            rotateX: -10,
            z: -280,
            ease: 'none',
          },
          0.62,
        )
        .fromTo(
          title,
          { scale: 1, opacity: 0.12, filter: 'blur(12px)' },
          { scale: 1.4, opacity: 0.36, filter: 'blur(3px)', ease: 'none' },
          0,
        )
        .to(title, { scale: 2.8, opacity: 0.75, filter: 'blur(0px)', ease: 'none' }, 0.62)
    })

    return () => animations.forEach((animation) => {
      animation.scrollTrigger?.kill()
      animation.kill()
    })
  }, [setProjectIndex])

  const handleProjectMove = (index, event) => {
    const card = surfaceRefs.current[index]
    if (!card) {
      return
    }

    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.6,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  const handleProjectEnter = (index) => {
    if (sweepRefs.current[index]) {
      gsap.fromTo(
        sweepRefs.current[index],
        { xPercent: -140 },
        { xPercent: 160, duration: 0.9, ease: 'power3.out', overwrite: true },
      )
    }
  }

  const handleProjectLeave = (index) => {
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
      className="relative z-40 -mt-[24vh] overflow-hidden rounded-t-[24px] bg-[linear-gradient(180deg,#d6e2f1_0%,#dfe8f3_32%,#bdcde0_58%,#090d15_100%)] px-6 py-24 md:px-8 xl:px-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 42 }}>
          <CloudField />
        </Canvas>
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(element) => {
              stepRefs.current[index] = element
            }}
            className="relative flex min-h-screen items-center justify-center"
            style={{ perspective: '1600px' }}
          >
            <div
              ref={(element) => {
                titleRefs.current[index] = element
              }}
              className="pointer-events-none absolute inset-x-0 text-center text-[clamp(4rem,11vw,11rem)] font-bold uppercase tracking-[0.18em] text-[rgba(32,48,77,0.12)]"
            >
              {project.title}
            </div>

            <div
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className="relative w-full max-w-4xl [transform-style:preserve-3d] will-change-transform"
              onMouseMove={(event) => handleProjectMove(index, event)}
              onMouseEnter={() => handleProjectEnter(index)}
              onMouseLeave={() => handleProjectLeave(index)}
            >
              <div
                ref={(element) => {
                  surfaceRefs.current[index] = element
                }}
                className="[transform-style:preserve-3d]"
              >
                <Card className="overflow-hidden border-white/30 bg-white/[0.48] text-[#162033] shadow-[0_30px_90px_rgba(10,14,28,0.18)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#324361]">
                    {project.tag}
                  </p>
                  <h2 className="mt-6 text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.95]">
                    {project.title}
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-[#33425d]">
                    {project.body}
                  </p>
                  <div className="relative mt-12 h-[360px] overflow-hidden rounded-[24px] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
                    <div
                      ref={(element) => {
                        sweepRefs.current[index] = element
                      }}
                      className="pointer-events-none absolute inset-y-0 left-[-20%] w-[28%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)]"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
})

export default ProjectsSection
