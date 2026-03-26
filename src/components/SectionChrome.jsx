const toneClasses = {
  dark:
    'border-white/10 bg-white/[0.05] text-[rgba(234,234,240,0.64)] shadow-[0_14px_32px_rgba(0,0,0,0.12)]',
  light:
    'border-black/10 bg-white/[0.62] text-[rgba(26,26,26,0.72)] shadow-[0_18px_40px_rgba(26,26,26,0.08)]',
  accent:
    'border-black/10 bg-white/10 text-[rgba(0,0,0,0.72)] shadow-[0_18px_40px_rgba(0,0,0,0.08)]',
}

function SectionChrome({ label, transition, tone = 'dark' }) {
  return (
    <>
      {transition ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[26vh] -translate-y-[56%] blur-3xl"
          style={{ background: transition }}
        />
      ) : null}

      {label ? (
        <div
          className={`pointer-events-none absolute left-6 top-28 z-20 inline-flex rounded-full border px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.32em] backdrop-blur-[18px] md:left-8 xl:left-16 ${toneClasses[tone]}`}
        >
          {label}
        </div>
      ) : null}
    </>
  )
}

export default SectionChrome
