import type { ReactNode } from 'react'

/** One live component sitting on a stage, with its JSX shown underneath. */
export function Demo({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5 rounded-md border border-[var(--line-soft)] bg-[var(--panel-surface)] p-5">
      <div className="flex min-h-11 flex-1 flex-wrap items-center gap-3 [&>*]:max-w-full">
        {children}
      </div>
      <code className="break-words border-t border-dashed border-[var(--line)] pt-2.5 text-[11.5px] text-[var(--muted)]">
        {code}
      </code>
    </div>
  )
}
