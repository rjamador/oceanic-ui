import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const iconButtonVariants = cva('aero-icon-button-base', {
  variants: {
    variant: {
      primary: 'aero-icon-button-primary',
      secondary: 'aero-icon-button-secondary',
      ghost: 'aero-icon-button-ghost',
    },
    size: {
      sm: 'size-8 [&_svg]:size-4',
      md: 'h-[38px] w-[38px] [&_svg]:h-[18px] [&_svg]:w-[18px]',
      lg: 'h-[46px] w-[46px] [&_svg]:h-[22px] [&_svg]:w-[22px]',
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'md',
  },
})

export type IconButtonVariant = NonNullable<VariantProps<typeof iconButtonVariants>['variant']>
export type IconButtonSize = NonNullable<VariantProps<typeof iconButtonVariants>['size']>

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  icon: ReactNode
  /** Required — an icon-only control with no aria-label is unreachable for screen-reader users. */
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', icon, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...rest}
      >
        <span className="inline-flex items-center justify-center">{icon}</span>
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
