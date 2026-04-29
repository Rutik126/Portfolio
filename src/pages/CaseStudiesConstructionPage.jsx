import { ArrowLeft, Cone, Wrench } from 'lucide-react'
import CustomCursor from '../components/CustomCursor'

function ConstructionIllustration() {
  return (
    <div className="relative mx-auto aspect-[1.2/1] w-full max-w-[520px]">
      <div className="absolute inset-x-[6%] bottom-[10%] h-[16px] rounded-full bg-black/10 blur-xl" />

      <div className="absolute left-[8%] top-[18%] h-[210px] w-[210px] rounded-full bg-[#FFD600]/20 blur-3xl" />
      <div className="absolute right-[6%] top-[10%] h-[180px] w-[180px] rounded-full bg-[#ff8c42]/18 blur-3xl" />

      <div className="absolute left-[12%] top-[22%] h-[180px] w-[160px] rounded-[32px] border border-black/10 bg-white/75 shadow-[0_24px_60px_rgba(15,15,15,0.08)] backdrop-blur-[14px]" />
      <div className="absolute left-[19%] top-[30%] h-[12px] w-[88px] rounded-full bg-[#111111]" />
      <div className="absolute left-[19%] top-[38%] h-[10px] w-[116px] rounded-full bg-black/12" />
      <div className="absolute left-[19%] top-[46%] h-[10px] w-[72px] rounded-full bg-black/12" />
      <div className="absolute left-[19%] top-[58%] h-[48px] w-[48px] rounded-2xl bg-[#FFD600] shadow-[0_14px_30px_rgba(255,214,0,0.35)]" />

      <div className="absolute right-[12%] top-[28%] h-[200px] w-[190px] rounded-[36px] border border-black/10 bg-[#111111] shadow-[0_28px_70px_rgba(0,0,0,0.18)]" />
      <div className="absolute right-[19%] top-[36%] h-[14px] w-[96px] rounded-full bg-white/90" />
      <div className="absolute right-[19%] top-[45%] h-[10px] w-[120px] rounded-full bg-white/20" />
      <div className="absolute right-[19%] top-[53%] h-[10px] w-[82px] rounded-full bg-white/20" />
      <div className="absolute right-[19%] top-[65%] h-[42px] w-[130px] rounded-[18px] border border-white/10 bg-white/8" />

      <div className="absolute left-[44%] top-[8%] rotate-[-8deg] rounded-[24px] border border-[#111111]/10 bg-[#fff6d6] px-4 py-3 shadow-[0_18px_42px_rgba(15,15,15,0.08)]">
        <div className="flex items-center gap-2 text-[#111111]">
          <Cone className="h-5 w-5 text-[#ff8c42]" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em]">
            In Progress
          </span>
        </div>
      </div>

      <div className="absolute left-[50%] top-[66%] flex h-[68px] w-[68px] -translate-x-1/2 items-center justify-center rounded-[24px] border border-black/10 bg-white shadow-[0_18px_42px_rgba(15,15,15,0.08)]">
        <Wrench className="h-8 w-8 text-[#111111]" />
      </div>
    </div>
  )
}

function CaseStudiesConstructionPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#f5f5f5] text-[#111111]">
      <CustomCursor />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(255,214,0,0.16),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(255,140,66,0.14),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.5),rgba(245,245,245,0.96))]" />

      <header className="relative z-20 px-6 py-6 md:px-8 xl:px-16">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border border-black/10 bg-white/70 px-4 py-3 shadow-[0_18px_46px_rgba(15,15,15,0.08)] backdrop-blur-[18px]">
          <a
            href="/"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#111111] transition-colors duration-300 hover:text-[#ff8c42]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-104px)] max-w-[1240px] items-center px-6 pb-20 pt-6 md:px-8 xl:px-16">
        <section className="grid w-full items-center gap-14 md:grid-cols-[minmax(0,1fr)_minmax(320px,520px)]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#ff8c42]">
              In Progress
            </p>
            <h1 className="mt-5 text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[0.9] tracking-[-0.06em] text-[#111111]">
              Case studies are in progress.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-black/66 md:text-lg">
              The full case study page is not published yet. I am still preparing the final story, process breakdown, and polished visuals.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/#projects"
                data-cursor="interactive"
                className="inline-flex items-center rounded-full bg-[#111111] px-[22px] py-[12px] text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#FFD600] hover:text-black md:text-[16px]"
              >
                View other work
              </a>
              <a
                href="/Rutik_Kumbhar_Resume _(designer).pdf"
                download="Rutik-Resume.pdf"
                data-cursor="interactive"
                className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-[22px] py-[12px] text-[15px] font-medium text-[#111111] transition-all duration-300 hover:border-black/20 hover:bg-white md:text-[16px]"
              >
                Download Resume
              </a>
            </div>

            {/* <div className="mt-9 flex flex-wrap gap-3">
              <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black/72">
                Story Structure
              </span>
              <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black/72">
                Process Visuals
              </span>
              <span className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-black/72">
                Final Polish
              </span>
            </div> */}
          </div>

          <ConstructionIllustration />
        </section>
      </main>
    </div>
  )
}

export default CaseStudiesConstructionPage
