import type { ReactNode } from 'react'

/**
 * A calm application-window frame — thin gradient titlebar, three square
 * bevel controls (restrained rounding, per the Ocean design language:
 * squares, never circular "traffic lights"), opaque body.
 *
 * `flush` drops the body padding — for content that owns its own edges,
 * like the workspace rail.
 */
export function Window({
  title,
  flush = false,
  children,
}: {
  title: string
  flush?: boolean
  children: ReactNode
}) {
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
      <div className={flush ? 'window__body window__body--flush' : 'window__body'}>{children}</div>
    </div>
  )
}
