import { REPO } from '../lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--shell,#f9fcff)]">
      <div className="mx-auto flex max-w-[var(--page-max)] flex-wrap items-center justify-center gap-3 px-4 py-7 text-center [font-family:var(--font-mono)] text-xs text-[var(--muted)] sm:justify-between sm:px-10 sm:text-left">
        <span className="flex items-center gap-2 font-bold text-[var(--ink)]">
          <img src="/logo.png" alt="" width={20} height={20} />
          oceanic&#8288;-&#8288;ui
        </span>
        <span>MIT &middot; v0.0.3 &middot; this page is built with the library</span>
        <a href={REPO} className="text-[var(--ink)] hover:text-[var(--sky-600,#1367c7)]">
          github.com/rjamador/oceanic-ui
        </a>
      </div>
    </footer>
  )
}
