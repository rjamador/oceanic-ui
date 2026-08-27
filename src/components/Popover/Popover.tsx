/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Popover.Trigger/Content), which by convention
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
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { useDismissable } from '@/hooks/useDismissable'
import { useEdgeAlign } from '@/hooks/useEdgeAlign'
import { cn } from '@/lib/cn'

export type PopoverSide = 'top' | 'bottom'
export type PopoverAlign = 'start' | 'end'

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerId: string
  contentId: string
}

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext(component: string) {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error(`<Popover.${component}> must be rendered inside <Popover>`)
  }
  return context
}

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(
  ({ open, defaultOpen = false, onOpenChange, className, children, ...rest }, ref) => {
    const [current, setCurrent] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const triggerId = useId()
    const contentId = useId()
    const rootRef = useRef<HTMLDivElement | null>(null)
    const wasOpen = useRef(false)

    useEffect(() => {
      if (wasOpen.current && !current) {
        // Only pull focus back to the trigger when the close left focus
        // inside the layer (Escape, selecting something) — not when the
        // user clicked away to another control.
        const active = document.activeElement
        if (!active || active === document.body || rootRef.current?.contains(active)) {
          document.getElementById(triggerId)?.focus()
        }
      }
      wasOpen.current = current
    }, [current, triggerId])

    useDismissable({
      open: current,
      onDismiss: () => setCurrent(false),
      rootRef,
    })

    const contextValue = useMemo<PopoverContextValue>(
      () => ({ open: current, setOpen: setCurrent, triggerId, contentId }),
      [current, setCurrent, triggerId, contentId],
    )

    return (
      <PopoverContext.Provider value={contextValue}>
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
      </PopoverContext.Provider>
    )
  },
)
PopoverRoot.displayName = 'Popover'

export interface PopoverTriggerProps {
  children: ReactElement<{
    id?: string
    onClick?: (event: MouseEvent<HTMLElement>) => void
    'aria-expanded'?: boolean
    'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'true'
    'aria-controls'?: string
  }>
}

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const ctx = usePopoverContext('Trigger')
  if (!isValidElement(children)) return children

  return cloneElement(children, {
    id: children.props.id ?? ctx.triggerId,
    'aria-expanded': ctx.open,
    // No default aria-haspopup — the content is a plain group, not a menu
    // or dialog. A consumer whose content warrants it can still pass one.
    'aria-haspopup': children.props['aria-haspopup'],
    'aria-controls': ctx.open ? ctx.contentId : undefined,
    onClick: (event: MouseEvent<HTMLElement>) => {
      children.props.onClick?.(event)
      if (!event.defaultPrevented) ctx.setOpen(!ctx.open)
    },
  })
}

const popoverContentVariants = cva('aero-popover-panel', {
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

export interface PopoverContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popoverContentVariants> {}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, side = 'bottom', align = 'start', ...rest }, ref) => {
    const ctx = usePopoverContext('Content')
    const localRef = useRef<HTMLDivElement | null>(null)
    const resolvedAlign = useEdgeAlign(ctx.open, localRef, align ?? 'start')

    useEffect(() => {
      if (!ctx.open) return
      localRef.current?.focus()
    }, [ctx.open])

    if (!ctx.open) return null

    // Escape is handled by useDismissable (document-level) on the root.

    return (
      <div
        ref={(node) => {
          localRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        id={ctx.contentId}
        role="group"
        tabIndex={-1}
        aria-labelledby={ctx.triggerId}
        className={cn(popoverContentVariants({ side, align: resolvedAlign }), className)}
        {...rest}
      />
    )
  },
)
PopoverContent.displayName = 'Popover.Content'

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
})
