/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Menu.Trigger/Content/Item), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { useDismissable } from '@/hooks/useDismissable'
import { useEdgeAlign } from '@/hooks/useEdgeAlign'
import { cn } from '@/lib/cn'

export type MenuSide = 'top' | 'bottom'
export type MenuAlign = 'start' | 'end'

interface MenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
  highlighted: number
  setHighlighted: (index: number) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext(component: string) {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error(`<Menu.${component}> must be rendered inside <Menu>`)
  }
  return context
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const MenuRoot = forwardRef<HTMLDivElement, MenuProps>(
  ({ open, defaultOpen = false, onOpenChange, className, children, ...rest }, ref) => {
    const [current, setCurrent] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const [highlighted, setHighlighted] = useState(0)
    const triggerId = useId()
    const contentId = useId()
    const rootRef = useRef<HTMLDivElement | null>(null)
    const wasOpen = useRef(false)

    const setOpen = useCallback(
      (next: boolean) => {
        if (next) setHighlighted(0)
        setCurrent(next)
      },
      [setCurrent],
    )

    useDismissable({
      open: current,
      onDismiss: () => setOpen(false),
      rootRef,
    })

    useEffect(() => {
      if (wasOpen.current && !current) {
        // Restore focus to the trigger only when the close left focus
        // inside the menu (Escape, Tab, selecting an item) — not when the
        // user clicked another control on the page.
        const active = document.activeElement
        if (!active || active === document.body || rootRef.current?.contains(active)) {
          document.getElementById(triggerId)?.focus()
        }
      }
      wasOpen.current = current
    }, [current, triggerId])

    const contextValue = useMemo<MenuContextValue>(
      () => ({ open: current, setOpen, triggerId, contentId, highlighted, setHighlighted }),
      [current, setOpen, triggerId, contentId, highlighted],
    )

    return (
      <MenuContext.Provider value={contextValue}>
        <div
          ref={(node) => {
            rootRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          className={cn('relative inline-flex', className)}
          {...rest}
        >
          {children}
        </div>
      </MenuContext.Provider>
    )
  },
)
MenuRoot.displayName = 'Menu'

export interface MenuTriggerProps {
  children: ReactElement<{
    id?: string
    onClick?: (event: MouseEvent<HTMLElement>) => void
    'aria-expanded'?: boolean
    'aria-haspopup'?: boolean | 'menu'
    'aria-controls'?: string
  }>
}

function MenuTrigger({ children }: MenuTriggerProps) {
  const ctx = useMenuContext('Trigger')
  if (!isValidElement(children)) return children

  return cloneElement(children, {
    id: children.props.id ?? ctx.triggerId,
    'aria-expanded': ctx.open,
    'aria-haspopup': 'menu',
    'aria-controls': ctx.open ? ctx.contentId : undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event)
      if (!event.defaultPrevented) ctx.setOpen(!ctx.open)
    },
  })
}

const menuContentVariants = cva('aero-popover-panel flex flex-col', {
  variants: {
    side: {
      top: 'bottom-[calc(100%+8px)]',
      bottom: 'top-[calc(100%+8px)]',
    },
    align: {
      start: 'left-0',
      end: 'right-0',
    },
  },
  defaultVariants: {
    side: 'bottom',
    align: 'start',
  },
})

export interface MenuContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuContentVariants> {}

const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ className, side = 'bottom', align = 'start', onKeyDown, children, ...rest }, ref) => {
    const ctx = useMenuContext('Content')
    const localRef = useRef<HTMLDivElement | null>(null)
    const resolvedAlign = useEdgeAlign(ctx.open, localRef, align ?? 'start')
    const typeahead = useRef({ buffer: '', timer: 0 })

    useEffect(() => {
      if (!ctx.open) return
      const first = localRef.current?.querySelector<HTMLButtonElement>(
        '[role="menuitem"]:not(:disabled)',
      )
      first?.focus()
    }, [ctx.open])

    if (!ctx.open) return null

    const itemsOf = (root: HTMLElement) =>
      Array.from(root.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'))

    const focusItem = (items: HTMLButtonElement[], index: number) => {
      ctx.setHighlighted(index)
      items[index]?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      const items = itemsOf(event.currentTarget)
      if (items.length === 0) return

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp': {
          event.preventDefault()
          const step = event.key === 'ArrowDown' ? 1 : -1
          focusItem(items, (ctx.highlighted + step + items.length) % items.length)
          return
        }
        case 'Home':
          event.preventDefault()
          focusItem(items, 0)
          return
        case 'End':
          event.preventDefault()
          focusItem(items, items.length - 1)
          return
        case 'Tab':
          // APG: Tab closes the menu. Focus returns to the trigger.
          event.preventDefault()
          ctx.setOpen(false)
          return
        case 'Escape':
          event.preventDefault()
          ctx.setOpen(false)
          return
      }

      // Type-ahead: jump to the next item whose label starts with what was typed.
      if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
        const state = typeahead.current
        window.clearTimeout(state.timer)
        state.buffer += event.key.toLowerCase()
        state.timer = window.setTimeout(() => {
          state.buffer = ''
        }, 500)
        const match = items.findIndex((item) =>
          (item.textContent ?? '').trim().toLowerCase().startsWith(state.buffer),
        )
        if (match >= 0) focusItem(items, match)
      }
    }

    return (
      <div
        ref={(node) => {
          localRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        id={ctx.contentId}
        role="menu"
        aria-labelledby={ctx.triggerId}
        className={cn(menuContentVariants({ side, align: resolvedAlign }), className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
MenuContent.displayName = 'Menu.Content'

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSelect?: () => void
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, disabled, onClick, onSelect, onMouseEnter, children, ...rest }, ref) => {
    const ctx = useMenuContext('Item')

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        className={cn('aero-menu-item', className)}
        onMouseEnter={(event) => {
          onMouseEnter?.(event)
          const menu = event.currentTarget.closest('[role="menu"]')
          if (!menu) return
          const items = Array.from(
            menu.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
          )
          ctx.setHighlighted(items.indexOf(event.currentTarget))
        }}
        onClick={(event) => {
          onClick?.(event)
          if (event.defaultPrevented || disabled) return
          onSelect?.()
          ctx.setOpen(false)
        }}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
MenuItem.displayName = 'Menu.Item'

export const Menu = Object.assign(MenuRoot, {
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
})
