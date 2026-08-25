import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'
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
          <Text as="label" variant="labelLarge" htmlFor={textareaId} className={styles.label}>
            {label}
          </Text>
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

Textarea.displayName = 'Textarea'
