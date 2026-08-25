import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'
import styles from './Radio.module.css'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
            type="radio"
            className={styles.input}
            disabled={disabled}
            {...rest}
          />
          <span className={styles.box} aria-hidden="true">
            <span className={styles.dot} />
          </span>
        </span>
        {label && (
          <Text as="span" variant="bodySmall" className={styles.text}>
            {label}
          </Text>
        )}
      </label>
    )
  },
)

Radio.displayName = 'Radio'
