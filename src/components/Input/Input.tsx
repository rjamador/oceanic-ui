import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

const fieldVariants = cva('aero-input-field', {
  variants: {
    size: {
      sm: 'h-8 text-sm',
      md: 'h-[38px] text-base',
      lg: 'h-[46px] text-lg',
    },
    invalid: {
      true: 'aero-input-field-error',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
})

export type InputSize = NonNullable<VariantProps<typeof fieldVariants>['size']>

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: InputSize
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorMessage, size = 'md', id, className, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = errorMessage ? `${inputId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="flex w-full flex-col">
        {label && (
          <Text as="label" variant="labelLarge" htmlFor={inputId} className="block mb-2">
            {label}
          </Text>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(fieldVariants({ size, invalid: Boolean(errorMessage) }), className)}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {errorMessage ? (
          <Text
            as="p"
            variant="labelSmall"
            color="danger"
            id={errorId}
            className="mt-2"
            role="alert"
          >
            {errorMessage}
          </Text>
        ) : helperText ? (
          <Text as="p" variant="labelSmall" color="muted" id={helperId} className="mt-2">
            {helperText}
          </Text>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
