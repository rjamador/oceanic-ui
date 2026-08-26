import { forwardRef, useId, type TextareaHTMLAttributes } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

const fieldVariants = cva('aero-textarea-field', {
  variants: {
    invalid: {
      true: 'aero-textarea-field-error',
      false: '',
    },
  },
  defaultVariants: {
    invalid: false,
  },
})

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
      <div className="flex w-full flex-col">
        {label && (
          <Text as="label" variant="labelLarge" htmlFor={textareaId} className="block mb-2">
            {label}
          </Text>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(fieldVariants({ invalid: Boolean(errorMessage) }), className)}
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

Textarea.displayName = 'Textarea'
