import { ArrowLeft, ArrowUpRight, LayoutGrid, Sparkles, Workflow } from 'lucide-react'
import CustomCursor from '../components/CustomCursor'
import { caseStudies } from '../content/siteContent'

const overviewStats = [
  {
    icon: LayoutGrid,
    label: 'Case Studies',
    value: '03',
    detail: 'A curated mix of product, service, and systems work.',
  },
  {
    icon: Workflow,
    label: 'Core Focus',
    value: 'Research to UI',
    detail: 'Discovery, flows, prototyping, systems, and delivery.',
  },
  {
    icon: Sparkles,
    label: 'Design Lens',
    value: 'Clarity First',
    detail: 'Interfaces shaped to feel structured, calm, and decisive.',
  },
]

const toneClasses = {
  dark: {
    surface:
      'border-white/10 text-[rgba(245,245,248,0.94)] shadow-[0_30px_90px_rgba(0,0,0,0.28)]',
    meta: 'text-white/58',
    body: 'text-white/78',
    chip: 'border-white/10 bg-white/[0.08] text-white/86',
    divider: 'bg-white/10',
    number: 'text-white/[0.08]',
    outcome: 'text-[#fff0b8]',
  },
  light: {
    surface:
      'border-black/10 text-[#101010] shadow-[0_26px_80px_rgba(16,18,22,0.1)]',
    meta: 'text-black/48',
    body: 'text-black/66',
    chip: 'border-black/10 bg-black/[0.05] text-black/72',
    divider: 'bg-black/10',
    number: 'text-black/[0.08]',
    outcome: 'text-[#111111]',
  },
}

function CaseStudiesPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#090c13] text-[rgba(234,234,240,0.92)]">
      <CustomCursor />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,214,0,0.08),transparent_24%),radial-gradient(circle_at_84%_16%,rgba(95,86,255,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%)]" />

      <header className="relative z-20 px-6 py-6 md:px-8 xl:px-16">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 shadow-[0_18px_46px_rgba(0,0,0,0.22)] backdrop-blur-[18px]">
          <a
            href="/"
            data-cursor="interactive"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[rgba(245,245,248,0.86)] transition-colors duration-300 hover:text-[#FFD600]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </a>

          <a
            href="/Rutik-Kumbhar-Resume.pdf"
            download="Rutik-Resume.pdf"
            data-cursor="interactive"
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[rgba(245,245,248,0.88)] transition-all duration-300 hover:border-[#FFD600]/40 hover:text-[#FFD600]"
          >
            Download Resume
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1480px] px-6 pb-24 pt-8 md:px-8 xl:px-16">
        <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[rgba(255,214,0,0.82)]">
              Selected Case Studies
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.8rem)] font-bold leading-[0.9] tracking-[-0.04em] text-[rgba(245,245,248,0.96)]">
              Product stories shaped through research, interaction logic, and system thinking.
            </h1>
            {/* <p className="mt-6 max-w-3xl text-base leading-8 text-[rgba(234,234,240,0.72)] md:text-lg">
              A focused collection of UX and UI case studies.
            </p> */}

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(245,245,248,0.72)]">
                UX Research
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(245,245,248,0.72)]">
                Interaction Design
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(245,245,248,0.72)]">
                Design Systems
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {overviewStats.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_46px_rgba(0,0,0,0.16)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-[#FFD600]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(245,245,248,0.54)]">
                      {item.label}
                    </p>
                  </div>
                  <p className="mt-6 text-[1.35rem] font-semibold leading-tight text-[rgba(245,245,248,0.94)]">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[rgba(234,234,240,0.68)]">
                    {item.detail}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-6 xl:grid-cols-12">
          {caseStudies.map((study) => {
            const tone = toneClasses[study.tone]

            return (
              <article
                key={study.id}
                className={`group relative overflow-hidden rounded-[32px] border ${tone.surface} ${study.layout} transition-transform duration-300 hover:-translate-y-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
                <div className="absolute -right-10 top-[-36px] h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex h-full min-h-[290px] flex-col p-6 md:min-h-[320px] md:p-7 xl:min-h-0">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] ${tone.chip}`}
                    >
                      {study.category}
                    </span>
                    <span
                      className={`text-[11px] font-medium uppercase tracking-[0.26em] ${tone.meta}`}
                    >
                      {study.year}
                    </span>
                  </div>

                  <div className={`mt-6 h-px w-full ${tone.divider}`} />

                  <div className="mt-auto">
                    <p
                      className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${tone.meta}`}
                    >
                      {study.scope}
                    </p>
                    <h2 className="mt-4 max-w-[16ch] text-[clamp(1.9rem,4vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.05em]">
                      {study.title}
                    </h2>
                    <p className={`mt-4 max-w-xl text-sm leading-7 md:text-base ${tone.body}`}>
                      {study.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex items-end justify-between gap-6">
                    <div>
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${tone.meta}`}
                      >
                        Outcome
                      </p>
                      <p className={`mt-2 text-lg font-semibold md:text-[1.3rem] ${tone.outcome}`}>
                        {study.outcome}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] transition-transform duration-300 group-hover:-translate-y-1 ${tone.chip}`}
                    >
                      Story Frame
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <span
                    className={`pointer-events-none absolute right-6 top-6 text-[clamp(4rem,8vw,6rem)] font-black leading-none tracking-[-0.1em] ${tone.number}`}
                  >
                    {study.id}
                  </span>
                </div>
              </article>
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default CaseStudiesPage
