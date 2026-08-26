import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  size?: number
  /** Accessible name — a spinner has no visible text of its own. */
  label?: string
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = 20, label = 'Loading', className, style, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('aero-spinner', className)}
        style={{ width: size, height: size, ...style }}
        {...rest}
      />
    )
  },
)

Spinner.displayName = 'Spinner'
