import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const skeletonVariants = cva('aero-skeleton-base', {
  variants: {
    variant: {
      text: 'aero-skeleton-radius-sm h-[1em]',
      circular: 'rounded-full',
      rectangular: 'aero-skeleton-radius-md',
    },
  },
  defaultVariants: {
    variant: 'text',
  },
})

export type SkeletonVariant = NonNullable<VariantProps<typeof skeletonVariants>['variant']>

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
        className={cn(skeletonVariants({ variant }), className)}
        style={dimensions}
        {...rest}
      />
    )
  },
)

Skeleton.displayName = 'Skeleton'
