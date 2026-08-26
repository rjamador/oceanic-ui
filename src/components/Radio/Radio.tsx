import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, disabled, id, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label
        htmlFor={inputId}
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <span className="relative inline-flex w-[18px] h-[18px] flex-none">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className="absolute inset-0 z-[1] m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
            disabled={disabled}
            {...rest}
          />
          <span className="aero-radio-box" aria-hidden="true">
            <span className="aero-radio-dot" />
          </span>
        </span>
        {label && (
          <Text as="span" variant="bodySmall" className="select-none">
            {label}
          </Text>
        )}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
