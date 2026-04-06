import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import CustomCursor from '../components/CustomCursor'
import { projects } from '../content/siteContent'

const revealProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
}

const imageRevealProps = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-[14px]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/46">
        {label}
      </p>
      <p className="mt-3 text-sm leading-7 text-white/88 md:text-[15px]">{value}</p>
    </div>
  )
}

function ProjectCaseStudyPage({ slug }) {
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="relative min-h-screen overflow-x-clip bg-[#090c13] text-[rgba(234,234,240,0.92)]">
        <CustomCursor />
        <main className="mx-auto flex min-h-screen max-w-[960px] flex-col items-start justify-center px-6 py-20 md:px-8 xl:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#FFD600]/78">
            Project Not Found
          </p>
          <h1 className="mt-6 text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-white/96">
            The requested case study does not exist.
          </h1>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/84 transition-all duration-300 hover:border-[#FFD600]/40 hover:text-[#FFD600]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>
        </main>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#090c13] text-[rgba(234,234,240,0.92)]">
      <CustomCursor />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_10%,rgba(255,214,0,0.08),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(95,86,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%)]" />

      <header className="relative z-20 px-6 py-6 md:px-8 xl:px-16">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur-[18px]">
          <a
            href="/#projects"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white/86 transition-colors duration-300 hover:text-[#FFD600]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </a>

          <a
            href="/Rutik-Kumbhar-Resume.pdf"
            download="Rutik-Resume.pdf"
            data-cursor="interactive"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white/88 transition-all duration-300 hover:border-[#FFD600]/40 hover:text-[#FFD600]"
          >
            Download Resume
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1320px] px-6 pb-24 pt-6 md:px-8 xl:px-16">
        <motion.section
          {...revealProps}
          className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end"
        >
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#FFD600]/82">
              {project.tag}
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.2rem)] font-bold leading-[0.9] tracking-[-0.065em] text-white/96">
              {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              {project.shortDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <InfoItem label="Client" value={project.client} />
            <InfoItem label="Role" value={project.role} />
            <InfoItem label="Duration" value={project.duration} />
            <InfoItem label="Industry" value={project.industry} />
            <InfoItem label="Platform" value={project.platform} />
          </div>
        </motion.section>

        <motion.section {...imageRevealProps} className="mt-12">
          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.22)] md:p-4">
            <img
              src={project.heroImage}
              alt={`${project.title} hero showcase`}
              className="h-auto w-full rounded-[22px] object-cover"
            />
          </div>
        </motion.section>

        <motion.section
          {...revealProps}
          className="mt-14 grid gap-6 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:grid-cols-2 md:p-8"
        >
          {project.overview.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-8 text-white/72 md:text-base">
              {paragraph}
            </p>
          ))}
        </motion.section>

        <div className="mt-16 space-y-16">
          {project.sections.map((section, index) => (
            <motion.section
              key={section.title}
              {...revealProps}
              className="grid gap-8 xl:grid-cols-12 xl:items-start"
            >
              <div className="xl:col-span-4 xl:pr-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/42">
                  Section {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white/95">
                  {section.title}
                </h2>
                <p className="mt-5 text-sm leading-8 text-white/70 md:text-base">
                  {section.body}
                </p>
              </div>

              <div className="grid gap-5 xl:col-span-8 xl:grid-cols-2">
                {section.images.map((image, imageIndex) => {
                  const isWide = section.images.length === 1

                  return (
                    <motion.div
                      key={`${section.title}-${image}`}
                      {...imageRevealProps}
                      transition={{
                        ...imageRevealProps.transition,
                        delay: imageIndex * 0.05,
                      }}
                      className={isWide ? 'xl:col-span-2' : ''}
                    >
                      <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
                        <img
                          src={image}
                          alt={`${project.title} ${section.title} showcase ${imageIndex + 1}`}
                          className="h-full w-full rounded-[18px] object-cover"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.section
          {...revealProps}
          className="mt-20 flex flex-col items-start justify-between gap-6 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:flex-row md:items-center md:p-8"
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/42">
              Next Step
            </p>
            <h2 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-white/94">
              Explore more work from the portfolio.
            </h2>
          </div>

          <a
            href="/#projects"
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-medium text-white/84 transition-all duration-300 hover:translate-x-1 hover:border-[#FFD600]/40 hover:text-[#FFD600]"
          >
            View more projects
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.section>
      </main>
    </div>
  )
}

export default ProjectCaseStudyPage
