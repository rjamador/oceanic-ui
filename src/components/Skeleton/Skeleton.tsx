import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Skeleton.module.css'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  variant?: SkeletonVariant
  width?: number | string
  height?: number | string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'text', width, height, className, style, ...rest }, ref) => {
    const dimensions: CSSProperties = { width, height, ...style }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(styles.skeleton, styles[variant], className)}
        style={dimensions}
        {...rest}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
