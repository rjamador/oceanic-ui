import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Text } from '../Text'
import styles from './Divider.module.css'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  orientation?: DividerOrientation
  /** Horizontal only — renders "— label —" instead of a plain line. */
  label?: ReactNode
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', label, className, ...rest }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn(styles.withLabel, className)}
          {...rest}
        >
          <span className={styles.line} aria-hidden="true" />
          <Text as="span" variant="labelSmall" color="muted">
            {label}
          </Text>
          <span className={styles.line} aria-hidden="true" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(orientation === 'vertical' ? styles.vertical : styles.horizontal, className)}
        {...rest}
      />
    )
  },
)

Divider.displayName = 'Divider'
