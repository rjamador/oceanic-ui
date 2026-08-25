import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Card.module.css'

export type CardPadding = 'sm' | 'md' | 'lg'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.card, styles[padding], className)} {...rest}>
        <span className={styles.sheen} aria-hidden="true" />
        <div className={styles.content}>{children}</div>
      </div>
    )
  },
)

Card.displayName = 'Card'
