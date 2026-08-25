import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import styles from './IconButton.module.css'

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost'
export type IconButtonSize = 'sm' | 'md' | 'lg'

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  icon: ReactNode
  /** Required — an icon-only control with no aria-label is unreachable for screen-reader users. */
  'aria-label': string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', icon, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, styles[variant], styles[size], className)}
        {...rest}
      >
        <span className={styles.icon}>{icon}</span>
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
