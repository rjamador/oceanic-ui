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

    useEffect(() => {
      if (!current) return

      const onPointerDown = (event: PointerEvent) => {
        const root = rootRef.current
        if (!root) return
        if (event.target instanceof Node && !root.contains(event.target)) {
          setOpen(false)
        }
      }
      const onKeyDown = (event: globalThis.KeyboardEvent) => {
        if (event.key === 'Escape') setOpen(false)
      }

      document.addEventListener('pointerdown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)
      return () => {
        document.removeEventListener('pointerdown', onPointerDown)
        document.removeEventListener('keydown', onKeyDown)
      }
    }, [current, setOpen])

    useEffect(() => {
      if (wasOpen.current && !current) {
        document.getElementById(triggerId)?.focus()
      }
      wasOpen.current = current
    }, [current, triggerId])

    return (
      <MenuContext.Provider
        value={{
          open: current,
          setOpen,
          triggerId,
          contentId,
          highlighted,
          setHighlighted,
        }}
      >
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

    useEffect(() => {
      if (!ctx.open) return
      const first = localRef.current?.querySelector<HTMLButtonElement>(
        '[role="menuitem"]:not(:disabled)',
      )
      first?.focus()
    }, [ctx.open])

    if (!ctx.open) return null

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      const items = Array.from(
        event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'),
      )
      if (items.length === 0) return

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const step = event.key === 'ArrowDown' ? 1 : -1
        const next = (ctx.highlighted + step + items.length) % items.length
        ctx.setHighlighted(next)
        items[next]?.focus()
        return
      }
      if (event.key === 'Home') {
        event.preventDefault()
        ctx.setHighlighted(0)
        items[0]?.focus()
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        ctx.setHighlighted(items.length - 1)
        items[items.length - 1]?.focus()
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        ctx.setOpen(false)
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
        className={cn(menuContentVariants({ side, align }), className)}
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
    const itemRef = useRef<HTMLButtonElement | null>(null)

    return (
      <button
        ref={(node) => {
          itemRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
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
