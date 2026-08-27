import { type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface IconSwapProps {
  /** Show `swapped` when true, `initial` when false. */
  active: boolean
  /** Rendered element for the inactive state (e.g. `<ArrowUpIcon />`). */
  initial: ReactNode
  /** Rendered element for the active state (e.g. `<SquareIcon />`). */
  swapped: ReactNode
  className?: string
}

/**
 * Cross-fade between two icon states in place so a click reads as a
 * response rather than a hard repaint. Both children stay mounted and
 * stacked; `prefers-reduced-motion` flattens the motion via CSS.
 */
export function IconSwap({ active, initial, swapped, className }: IconSwapProps) {
  return (
    <span className={cn('relative grid place-items-center', className)} aria-hidden>
      <span className="aero-icon-swap-layer" data-visible={!active}>
        {initial}
      </span>
      <span className="aero-icon-swap-layer" data-visible={active}>
        {swapped}
      </span>
    </span>
  )
}
