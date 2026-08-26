import { forwardRef, useId, type SelectHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { ChevronDownIcon } from '../Icon'
import { Text } from '../Text'

const fieldVariants = cva('aero-select-field', {
  variants: {
    size: {
      sm: 'h-8 text-sm',
      md: 'h-[38px] text-base',
      lg: 'h-[46px] text-lg',
    },
    invalid: {
      true: 'aero-select-field-error',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
})

export type SelectSize = NonNullable<VariantProps<typeof fieldVariants>['size']>

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: SelectSize
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, errorMessage, size = 'md', id, className, children, ...rest }, ref) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = helperText ? `${selectId}-helper` : undefined
    const errorId = errorMessage ? `${selectId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="flex w-full flex-col">
        {label && (
          <Text as="label" variant="labelLarge" htmlFor={selectId} className="block mb-2">
            {label}
          </Text>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(fieldVariants({ size, invalid: Boolean(errorMessage) }), className)}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={describedBy}
            {...rest}
          >
            {children}
          </select>
          <span
            className="pointer-events-none absolute right-3 flex text-[var(--text-muted)] [&>svg]:w-3.5 [&>svg]:h-3.5"
            aria-hidden="true"
          >
            <ChevronDownIcon />
          </span>
        </div>
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

Select.displayName = 'Select'
