import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

const dividerVariants = cva('m-0 border-none bg-[var(--hairline)]', {
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px self-stretch',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type DividerOrientation = NonNullable<VariantProps<typeof dividerVariants>['orientation']>

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  orientation?: DividerOrientation
  /** Horizontal only — renders "— label —" instead of a plain line. */
  label?: ReactNode
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, ...rest }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center gap-3', className)}
          {...rest}
        >
          <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
          <Text as="span" variant="labelSmall" color="muted">
            {label}
          </Text>
          <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(dividerVariants({ orientation }), className)}
        {...rest}
      />
    )
  },
)

Divider.displayName = 'Divider'
