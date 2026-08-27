import type { ReactNode } from 'react'

/**
 * A calm application-window frame — thin gradient titlebar, three square
 * bevel controls (restrained rounding, per the Ocean design language:
 * squares, never circular "traffic lights"), opaque body.
 */
export function Window({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="window">
      <div className="window__bar">
        <span className="window__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="window__title">{title}</span>
      </div>
      <div className="window__body">{children}</div>
    </div>
  )
}
