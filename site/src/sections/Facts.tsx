import { COMPONENTS } from '../lib/constants'

const FACTS = [
  [String(COMPONENTS.length), 'components'],
  ['1', 'stylesheet, precompiled'],
  ['~19 kB', 'gzipped, tree-shaken'],
  ['AA', 'WCAG contrast'],
  ['MIT', 'open source'],
]

export function Facts() {
  return (
    <section
      className="mx-auto max-w-[var(--page-max)] px-4 pb-6 sm:px-10"
      aria-label="At a glance"
    >
      <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-3 border-y border-[var(--line)] px-4 py-[18px] sm:gap-x-10 sm:gap-y-4">
        {FACTS.map(([value, label]) => (
          <li key={label} className="flex items-baseline gap-2">
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
