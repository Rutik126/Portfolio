import { create } from 'zustand'

export const useAnimationStore = create((set) => ({
  scrollY: 0,
  scrollVelocity: 0,
  scrollProgress: 0,
  heroFrame: 0,
  timelineIndex: 0,
  projectIndex: 0,
  setScrollState: (scrollY, scrollVelocity, scrollProgress) =>
    set({ scrollY, scrollVelocity, scrollProgress }),
  setHeroFrame: (heroFrame) => set({ heroFrame }),
  setTimelineIndex: (timelineIndex) => set({ timelineIndex }),
  setProjectIndex: (projectIndex) => set({ projectIndex }),
}))
