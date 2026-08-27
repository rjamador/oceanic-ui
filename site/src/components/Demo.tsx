import type { ReactNode } from 'react'

/** One live component sitting on a stage, with its JSX shown underneath. */
export function Demo({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="demo">
      <div className="demo__stage">{children}</div>
      <code className="demo__code">{code}</code>
    </div>
  )
}
