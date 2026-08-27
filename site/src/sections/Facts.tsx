const FACTS = [
  ['0', 'runtime dependencies'],
  ['1', 'stylesheet, precompiled'],
  ['26', 'components'],
  ['AA', 'WCAG contrast'],
  ['MIT', 'open source'],
]

export function Facts() {
  return (
    <section
      className="mx-auto max-w-[var(--page-max)] px-4 pb-6 sm:px-10"
      aria-label="At a glance"
    >
      <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-3 border-y border-[var(--line)] px-4 py-[18px] sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-4">
        {FACTS.map(([value, label]) => (
          <li
            key={label}
            className="flex items-baseline gap-2 last:col-span-2 last:justify-center sm:last:col-auto"
          >
            <b className="[font-family:var(--font-display)] text-[1.35rem] font-bold leading-none text-[var(--ink)]">
              {value}
            </b>
            <span className="[font-family:var(--font-mono)] text-xs text-[var(--muted)]">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
