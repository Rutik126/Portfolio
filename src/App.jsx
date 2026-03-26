import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import HireMeButton from './components/HireMeButton'
import CustomCursor from './components/CustomCursor'
import SmoothScrollProvider from './providers/SmoothScrollProvider'
import TimelineSection from './components/TimelineSection'
import ProjectsSection from './components/ProjectsSection'
import ArticlesSection from './components/ArticlesSection'
import ContactSection from './components/ContactSection'

function App() {
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
