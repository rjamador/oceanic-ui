import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const buttonVariants = cva('aero-btn-base', {
  variants: {
    variant: {
      primary: 'aero-btn-primary',
      secondary: 'aero-btn-secondary',
      ghost: 'aero-btn-ghost',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-[38px] px-5 text-base',
      lg: 'h-[46px] px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
