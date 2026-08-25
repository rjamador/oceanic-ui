import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Progress.module.css'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Omit for an indeterminate (busy, unknown duration) progress bar. */
  value?: number
  max?: number
  /** Accessible name — progress bars rarely have visible text of their own. */
  label?: string
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, label, className, ...rest }, ref) => {
    const indeterminate = value === undefined
    const clamped = indeterminate ? undefined : Math.min(Math.max(value, 0), max)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        className={cn(styles.track, className)}
        {...rest}
      >
        <div
          className={cn(styles.fill, indeterminate && styles.indeterminate)}
          style={indeterminate ? undefined : { width: `${(clamped! / max) * 100}%` }}
        />
      </div>
    )
  },
)

Progress.displayName = 'Progress'
