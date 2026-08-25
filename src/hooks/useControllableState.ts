import { useCallback, useState } from 'react'

export interface UseControllableStateProps<T> {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

/**
 * Backs a value that a consumer may either own (`value` + `onChange`) or
 * let the component manage itself (`defaultValue`). Needed for state that
 * isn't backed by a native controllable HTML element (unlike Input/Checkbox,
 * which get controlled/uncontrolled for free from the browser).
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [current, setValue]
}
