import { cloneElement, forwardRef, useId, type ReactElement, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

const tooltipVariants = cva(
  'absolute z-[var(--z-popover)] px-3 py-2 rounded-[var(--radius-sm)] bg-[var(--text)] text-[var(--text-on-accent)] [font-family:var(--font-body)] text-xs font-medium whitespace-nowrap shadow-[var(--glass-shadow)] opacity-0 invisible pointer-events-none transition-opacity duration-[120ms] motion-reduce:transition-none group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible',
  {
    variants: {
      side: {
        top: 'aero-tooltip-top',
        bottom: 'aero-tooltip-bottom',
        left: 'aero-tooltip-left',
        right: 'aero-tooltip-right',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  },
)

export interface TooltipProps {
  content: ReactNode
  side?: TooltipSide
  /** A single element that can receive `aria-describedby` — a real focusable
   *  control (Button, IconButton, a native element), so the tooltip shows on
   *  keyboard focus as well as hover, not just mouse hover. */
  children: ReactElement<{ 'aria-describedby'?: string }>
}

export const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  ({ content, side = 'top', children }, ref) => {
    const id = useId()

    return (
      <span ref={ref} className="group relative inline-flex">
        {cloneElement(children, { 'aria-describedby': id })}
        <span role="tooltip" id={id} className={cn(tooltipVariants({ side }))}>
          {content}
        </span>
      </span>
    )
  },
)

Tooltip.displayName = 'Tooltip'
