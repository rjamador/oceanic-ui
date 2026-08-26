import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
        <span className="aero-switch-track">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className="absolute inset-0 z-[1] m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
            disabled={disabled}
            {...rest}
          />
          <span className="aero-switch-thumb" aria-hidden="true" />
        </span>
        {label && <Text as="span" variant="bodySmall">{label}</Text>}
      </label>
    )
  },
)

Switch.displayName = 'Switch'
