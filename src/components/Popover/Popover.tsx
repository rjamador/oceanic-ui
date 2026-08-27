/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Popover.Trigger/Content), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useMemo,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'

import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'
import { toPlacement, type OverlayAlign, type OverlaySide } from '@/lib/placement'

export type PopoverSide = OverlaySide
export type PopoverAlign = OverlayAlign

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  labelId: string
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles']
  context: ReturnType<typeof useFloating>['context']
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
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
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /**
   * Uncontrolled initial open state.
   * @default false
   */
  defaultOpen?: boolean
  /** Fires whenever the layer wants to open or close (trigger click, outside press, Escape). */
  onOpenChange?: (open: boolean) => void
  /**
   * Edge of the trigger the panel opens from. Flips automatically if it
   * would overflow the viewport.
   * @default bottom
   */
  side?: PopoverSide
  /**
   * Alignment along that edge.
   * @default start
   */
  align?: PopoverAlign
  children: ReactNode
}

/**
 * A floating panel anchored to a trigger — for a small chunk of secondary
 * content (a form, a detail card, a colour picker). Compose
 * `Popover.Trigger` (wraps any focusable element) and `Popover.Content`.
 * Positioning, viewport collision, outside-press / Escape dismissal, and
 * focus handling come from Floating UI; the panel renders in a portal so it
 * is never clipped.
 */
function PopoverRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  className,
  children,
  ...rest
}: PopoverProps) {
  const [current, setCurrent] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const labelId = useId()

  const floating = useFloating({
    open: current,
    onOpenChange: setCurrent,
    placement: toPlacement(side, align),
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  })

  const click = useClick(floating.context)
  const dismiss = useDismiss(floating.context)
  const role = useRole(floating.context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const contextValue = useMemo<PopoverContextValue>(
    () => ({
      open: current,
      setOpen: setCurrent,
      labelId,
      refs: floating.refs,
      floatingStyles: floating.floatingStyles,
      context: floating.context,
      getReferenceProps,
      getFloatingProps,
    }),
    [
      current,
      setCurrent,
      labelId,
      floating.refs,
      floating.floatingStyles,
      floating.context,
      getReferenceProps,
      getFloatingProps,
    ],
  )

  return (
    <PopoverContext.Provider value={contextValue}>
      <div className={cn('contents', className)} {...rest}>
        {children}
      </div>
    </PopoverContext.Provider>
  )
}
PopoverRoot.displayName = 'Popover'

type TriggerChildProps = {
  ref?: Ref<HTMLElement>
  id?: string
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'true'
}

export interface PopoverTriggerProps {
  children: ReactElement<TriggerChildProps>
}

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const ctx = usePopoverContext('Trigger')
  const childRef = isValidElement(children)
    ? (children as ReactElement<TriggerChildProps>).props.ref
    : undefined
  const ref = useMergeRefs([ctx.refs.setReference, childRef])

  if (!isValidElement(children)) return children

  return cloneElement(children, {
    ...ctx.getReferenceProps(children.props),
    ref,
    id: children.props.id ?? ctx.labelId,
  })
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Trap focus inside the panel and mark it `aria-modal` until it closes.
   * Leave off for a lightweight non-modal panel.
   * @default false
   */
  modal?: boolean
}

/** The floating panel. Renders (in a portal) only while the Popover is open. */
function PopoverContent({ className, modal = false, ...rest }: PopoverContentProps) {
  const ctx = usePopoverContext('Content')

  if (!ctx.open) return null

  return (
    <FloatingPortal>
      <FloatingFocusManager context={ctx.context} modal={modal} returnFocus>
        <div
          ref={ctx.refs.setFloating}
          aria-labelledby={ctx.labelId}
          aria-modal={modal || undefined}
          tabIndex={-1}
          style={ctx.floatingStyles}
          className={cn('aero-popover-panel', className)}
          {...ctx.getFloatingProps(rest)}
        />
      </FloatingFocusManager>
    </FloatingPortal>
  )
}
PopoverContent.displayName = 'Popover.Content'

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
})
