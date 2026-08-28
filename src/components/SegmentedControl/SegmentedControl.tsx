/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (SegmentedControl.Option), which by convention (see
   "Compound components" in docs/creating-components.md) lives in one file
   per component folder rather than scattering the shared context across
   files. */
import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

const optionVariants = cva('aero-segmented-option inline-flex shrink-0 items-center text-sm font-medium', {
  variants: {
    selected: {
      true: 'aero-segmented-option-selected',
      false: '',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-50',
      false: 'cursor-pointer',
    },
  },
  defaultVariants: {
    selected: false,
    disabled: false,
  },
})

interface SegmentedContextValue {
  name: string
  value: string
  setValue: (value: string) => void
}

const SegmentedContext = createContext<SegmentedContextValue | null>(null)

function useSegmentedContext() {
  const context = useContext(SegmentedContext)
  if (!context) {
    throw new Error('<SegmentedControl.Option> must be used inside <SegmentedControl>')
  }
  return context
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}

function SegmentedControlRoot({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...rest
}: SegmentedControlProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange })
  const name = useId()

  return (
    <SegmentedContext.Provider value={{ name, value: current, setValue: setCurrent }}>
      <div
        role="radiogroup"
        className={cn('aero-segmented-root inline-flex max-w-full overflow-x-auto', className)}
        {...rest}
      >
        {children}
      </div>
    </SegmentedContext.Provider>
  )
}

export interface SegmentedControlOptionProps {
  value: string
  children: ReactNode
  disabled?: boolean
}

function SegmentedControlOption({ value, children, disabled }: SegmentedControlOptionProps) {
  const ctx = useSegmentedContext()
  const selected = ctx.value === value

  return (
    <label className={optionVariants({ selected, disabled })}>
      <input
        type="radio"
        name={ctx.name}
        value={value}
        checked={selected}
        disabled={disabled}
        onChange={() => ctx.setValue(value)}
        className={cn('absolute inset-0 m-0 opacity-0', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
      />
      {children}
    </label>
  )
}

export const SegmentedControl = Object.assign(SegmentedControlRoot, { Option: SegmentedControlOption })
