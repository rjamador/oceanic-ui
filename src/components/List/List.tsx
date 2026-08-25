/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (List.Item), which by convention (see "Compound
   components" in docs/creating-components.md) lives in one file per
   component folder rather than scattering the shared context across
   files. */
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import styles from './List.module.css'

interface ListContextValue {
  value: string
  setValue: (value: string) => void
}

const ListContext = createContext<ListContextValue | null>(null)

function useListContext(component: string) {
  const context = useContext(ListContext)
  if (!context) {
    throw new Error(`<List.${component}> must be used inside <List>`)
  }
  return context
}

export interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}

const ListRoot = forwardRef<HTMLUListElement, ListProps>(
  ({ value, defaultValue, onValueChange, className, children, ...rest }, ref) => {
    const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange })

    return (
      <ListContext.Provider value={{ value: current, setValue: setCurrent }}>
        <ul ref={ref} role="listbox" className={cn(styles.list, className)} {...rest}>
          {children}
        </ul>
      </ListContext.Provider>
    )
  },
)
ListRoot.displayName = 'List'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, 'onSelect'> {
  value: string
  disabled?: boolean
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ value, disabled, className, children, onKeyDown, onClick, ...rest }, ref) => {
    const ctx = useListContext('Item')
    const selected = ctx.value === value

    const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return

      const list = event.currentTarget.closest('[role="listbox"]')
      if (!list) return

      const items = Array.from(
        list.querySelectorAll<HTMLLIElement>('[role="option"]:not([aria-disabled="true"])'),
      )
      const index = items.indexOf(event.currentTarget)
      if (index === -1) return

      event.preventDefault()
      let nextIndex = index
      if (event.key === 'ArrowDown') nextIndex = (index + 1) % items.length
      if (event.key === 'ArrowUp') nextIndex = (index - 1 + items.length) % items.length
      if (event.key === 'Home') nextIndex = 0
      if (event.key === 'End') nextIndex = items.length - 1

      const next = items[nextIndex]
      next?.focus()
      next?.click()
    }

    const handleClick = (event: MouseEvent<HTMLLIElement>) => {
      onClick?.(event)
      if (!disabled) ctx.setValue(value)
    }

    return (
      <li
        ref={ref}
        role="option"
        aria-selected={selected}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? undefined : selected ? 0 : -1}
        className={cn(styles.item, selected && styles.itemSelected, disabled && styles.itemDisabled, className)}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </li>
    )
  },
)
ListItem.displayName = 'List.Item'

export const List = Object.assign(ListRoot, { Item: ListItem })
