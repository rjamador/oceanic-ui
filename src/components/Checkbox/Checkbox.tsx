import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

const CheckGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, disabled, id, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label
        htmlFor={inputId}
        className={cn(styles.wrapper, disabled && styles.disabled, className)}
      >
        <span className={styles.control}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          <span className={styles.box} aria-hidden="true">
            {CheckGlyph}
          </span>
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
