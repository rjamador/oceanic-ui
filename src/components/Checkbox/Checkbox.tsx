import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { CheckIcon } from '../Icon'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

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
            <CheckIcon />
          </span>
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
