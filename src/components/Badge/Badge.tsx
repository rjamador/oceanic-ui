import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'accent' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...rest }, ref) => {
    return (
      <span ref={ref} className={cn(styles.badge, styles[variant], className)} {...rest}>
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
