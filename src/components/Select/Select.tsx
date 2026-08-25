import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Select.module.css'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: SelectSize
}

const ChevronGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, helperText, errorMessage, size = 'md', id, className, children, ...rest },
    ref,
  ) => {
    const generatedId = useId()
    const selectId = id ?? generatedId
    const helperId = helperText ? `${selectId}-helper` : undefined
    const errorId = errorMessage ? `${selectId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.control}>
          <select
            ref={ref}
            id={selectId}
            className={cn(styles.field, styles[size], errorMessage && styles.fieldError, className)}
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={describedBy}
            {...rest}
          >
            {children}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            {ChevronGlyph}
          </span>
        </div>
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

Select.displayName = 'Select'
