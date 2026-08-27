import { type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface IconSwapProps {
  /** Show `swapped` when true, `initial` when false. */
  active: boolean
  initial: ReactNode
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
      <IconLayer visible={!active}>{initial}</IconLayer>
      <IconLayer visible={active}>{swapped}</IconLayer>
    </span>
  )
}

function IconLayer({ visible, children }: { visible: boolean; children: ReactNode }) {
  return (
    <span
      className="col-start-1 row-start-1 flex items-center justify-center motion-reduce:transition-none transition-[opacity,transform,filter] duration-200 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.5)',
        filter: visible ? 'blur(0px)' : 'blur(2px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {children}
    </span>
  )
}
