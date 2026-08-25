import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Textarea.module.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  errorMessage?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, errorMessage, id, className, ...rest }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const helperId = helperText ? `${textareaId}-helper` : undefined
    const errorId = errorMessage ? `${textareaId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(styles.field, errorMessage && styles.fieldError, className)}
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

Textarea.displayName = 'Textarea'
