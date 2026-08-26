import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-[2px] font-[var(--font-body)] text-xs leading-[1.4] font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-[var(--control-secondary-mid)] border-[var(--control-secondary-border)] text-[var(--text)]',
        accent: 'bg-[var(--control-primary-mid)] border-[var(--control-primary-border)] text-[var(--text)]',
        danger: 'bg-[var(--danger-tint)] border-[var(--danger)] text-[var(--danger)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...rest }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...rest}>
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
