import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const cardVariants = cva('aero-panel', {
  variants: {
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    padding: 'md',
  },
})

export type CardPadding = NonNullable<VariantProps<typeof cardVariants>['padding']>

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(cardVariants({ padding }), className)} {...rest}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
