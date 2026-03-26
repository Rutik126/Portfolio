import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import CustomCursor from './components/CustomCursor'
import SmoothScrollProvider from './providers/SmoothScrollProvider'

const BreakSection = lazy(() => import('./components/BreakSection'))
const TimelineSection = lazy(() => import('./components/TimelineSection'))
const ProjectsSection = lazy(() => import('./components/ProjectsSection'))
const ArticlesSection = lazy(() => import('./components/ArticlesSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))

function SectionFallback() {
  return <div className="h-16 w-full" />
}

function App() {
  return (
    <SmoothScrollProvider>
      <div className="relative overflow-x-clip bg-[#090910] text-[rgba(234,234,240,0.9)]">
        <CustomCursor />
        <Navbar />
        <main className="relative">
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <BreakSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <TimelineSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ArticlesSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <ContactSection />
          </Suspense>
        </main>
      </div>
    </SmoothScrollProvider>
  )
}

export default App
