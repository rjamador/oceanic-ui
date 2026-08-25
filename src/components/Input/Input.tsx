import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: InputSize
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, helperText, errorMessage, size = 'md', id, className, ...rest },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = helperText ? `${inputId}-helper` : undefined
    const errorId = errorMessage ? `${inputId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={styles.wrapper}>
        {label && (
          <Text as="label" variant="labelLarge" htmlFor={inputId} className={styles.label}>
            {label}
          </Text>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(styles.field, styles[size], errorMessage && styles.fieldError, className)}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {errorMessage ? (
          <Text as="p" variant="labelSmall" color="danger" id={errorId} className={styles.helper} role="alert">
            {errorMessage}
          </Text>
        ) : helperText ? (
          <Text as="p" variant="labelSmall" color="muted" id={helperId} className={styles.helper}>
            {helperText}
          </Text>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
