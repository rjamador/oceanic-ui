import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'
import styles from './Switch.module.css'

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
        className={cn(styles.wrapper, disabled && styles.disabled, className)}
      >
        <span className={styles.track}>
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            role="switch"
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          <span className={styles.thumb} aria-hidden="true" />
        </span>
        {label && (
          <Text as="span" variant="bodySmall">
            {label}
          </Text>
        )}
      </label>
    )
  },
)

Switch.displayName = 'Switch'
