import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { ChevronDownIcon } from '../Icon'
import { Text } from '../Text'
import styles from './Select.module.css'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  errorMessage?: string
  size?: SelectSize
}

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
          <Text as="label" variant="labelLarge" htmlFor={selectId} className={styles.label}>
            {label}
          </Text>
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
            <ChevronDownIcon />
          </span>
        </div>
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

Select.displayName = 'Select'
