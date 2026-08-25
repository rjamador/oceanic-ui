import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

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
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
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
          <p id={errorId} className={styles.error} role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p id={helperId} className={styles.helper}>
            {helperText}
          </p>
        ) : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
