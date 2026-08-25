import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Slider.module.css'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, id, className, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type="range"
          className={cn(styles.slider, className)}
          {...rest}
        />
      </div>
    )
  },
)

Slider.displayName = 'Slider'
