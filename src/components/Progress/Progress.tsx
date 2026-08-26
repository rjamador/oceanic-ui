import { forwardRef, type HTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const progressTrackVariants = cva('aero-progress-track')
const progressFillVariants = cva('aero-progress-fill', {
  variants: {
    indeterminate: {
      true: 'aero-progress-indeterminate',
      false: '',
    },
  },
  defaultVariants: {
    indeterminate: false,
  },
})

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
        className={cn(progressTrackVariants(), className)}
        {...rest}
      >
        <div
          className={cn(progressFillVariants({ indeterminate }))}
          style={indeterminate ? undefined : { width: `${(clamped! / max) * 100}%` }}
        />
      </div>
    )
  },
)

Progress.displayName = 'Progress'
