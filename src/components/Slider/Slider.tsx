import { forwardRef, useId, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

const sliderClasses =
  'aero-slider h-5 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none'

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ label, id, className, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <div className="flex w-full flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[color:var(--text)]"
          >
            {label}
          </label>
        )}
        <input ref={ref} id={inputId} type="range" className={cn(sliderClasses, className)} {...rest} />
      </div>
    )
  },
)

Slider.displayName = 'Slider'
