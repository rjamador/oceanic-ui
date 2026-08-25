import { cloneElement, forwardRef, useId, type ReactElement, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import styles from './Tooltip.module.css'

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

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
      <span ref={ref} className={styles.wrapper}>
        {cloneElement(children, { 'aria-describedby': id })}
        <span role="tooltip" id={id} className={cn(styles.tooltip, styles[side])}>
          {content}
        </span>
      </span>
    )
  },
)

Tooltip.displayName = 'Tooltip'
