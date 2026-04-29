import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HireMeButton from './components/HireMeButton'
import CustomCursor from './components/CustomCursor'
import SmoothScrollProvider from './providers/SmoothScrollProvider'
import TimelineSection from './components/TimelineSection'
import ProjectsSection from './components/ProjectsSection'
import ArticlesSection from './components/ArticlesSection'
import ContactSection from './components/ContactSection'
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudiesConstructionPage from './pages/CaseStudiesConstructionPage'
import ProjectCaseStudyPage from './pages/ProjectCaseStudyPage'

function getRoute(pathname) {
  if (pathname === '/case-studies-construction') {
    return { type: 'case-studies-construction' }
  }

  if (pathname === '/case-studies') {
    return { type: 'case-studies' }
  }

  if (pathname.startsWith('/project/')) {
    return {
      type: 'project',
      slug: pathname.replace('/project/', '').replace(/\/+$/, ''),
    }
  }

  return { type: 'home' }
}

function App() {
  const [route, setRoute] = useState(() => getRoute(window.location.pathname))

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getRoute(window.location.pathname))
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    window.addEventListener('popstate', syncRoute)

    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  if (route.type === 'case-studies') {
    return <CaseStudiesPage />
  }

  if (route.type === 'case-studies-construction') {
    return <CaseStudiesConstructionPage />
  }

  if (route.type === 'project') {
    return <ProjectCaseStudyPage slug={route.slug} />
  }

  return (
    <SmoothScrollProvider>
      <div className="relative overflow-x-clip bg-[#090910] text-[rgba(234,234,240,0.9)]">
        <CustomCursor />
        <Navbar />
        <main className="relative isolate">
          <HeroSection />
          <TimelineSection />
          <ProjectsSection />
          <ArticlesSection />
          <ContactSection />
        </main>
      </div>
    </SmoothScrollProvider>
  )
}

export default App
