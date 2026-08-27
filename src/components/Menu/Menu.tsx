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
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react'

import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'
import { toPlacement, type OverlayAlign, type OverlaySide } from '@/lib/placement'

export type MenuSide = OverlaySide
export type MenuAlign = OverlayAlign

interface MenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  labelId: string
  activeIndex: number | null
  refs: ReturnType<typeof useFloating>['refs']
  floatingStyles: ReturnType<typeof useFloating>['floatingStyles']
  context: ReturnType<typeof useFloating>['context']
  elementsRef: MutableRefObject<Array<HTMLButtonElement | null>>
  labelsRef: MutableRefObject<Array<string | null>>
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps']
  getFloatingProps: ReturnType<typeof useInteractions>['getFloatingProps']
  getItemProps: ReturnType<typeof useInteractions>['getItemProps']
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
  side?: MenuSide
  align?: MenuAlign
  children: ReactNode
}

function MenuRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  className,
  children,
  ...rest
}: MenuProps) {
  const [current, setCurrent] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const labelId = useId()
  const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
  const labelsRef = useRef<Array<string | null>>([])

  const floating = useFloating({
    open: current,
    onOpenChange: (next) => {
      setCurrent(next)
      if (!next) setActiveIndex(null)
    },
    placement: toPlacement(side, align),
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  })

  const click = useClick(floating.context)
  const dismiss = useDismiss(floating.context)
  const role = useRole(floating.context, { role: 'menu' })
  const listNavigation = useListNavigation(floating.context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnOpen: true,
  })
  const typeahead = useTypeahead(floating.context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: current ? setActiveIndex : undefined,
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ])

  const contextValue = useMemo<MenuContextValue>(
    () => ({
      open: current,
      setOpen: setCurrent,
      labelId,
      activeIndex,
      refs: floating.refs,
      floatingStyles: floating.floatingStyles,
      context: floating.context,
      elementsRef,
      labelsRef,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    }),
    [
      current,
      setCurrent,
      labelId,
      activeIndex,
      floating.refs,
      floating.floatingStyles,
      floating.context,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
    ],
  )

  return (
    <MenuContext.Provider value={contextValue}>
      <div className={cn('contents', className)} {...rest}>
        {children}
      </div>
    </MenuContext.Provider>
  )
}
MenuRoot.displayName = 'Menu'

type TriggerChildProps = { ref?: Ref<HTMLElement>; id?: string }

export interface MenuTriggerProps {
  children: ReactElement<TriggerChildProps>
}

function MenuTrigger({ children }: MenuTriggerProps) {
  const ctx = useMenuContext('Trigger')
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

export type MenuContentProps = HTMLAttributes<HTMLDivElement>

function MenuContent({ className, ...rest }: MenuContentProps) {
  const ctx = useMenuContext('Content')

  if (!ctx.open) return null

  return (
    <FloatingPortal>
      <FloatingFocusManager context={ctx.context} modal={false} returnFocus>
        <FloatingList elementsRef={ctx.elementsRef} labelsRef={ctx.labelsRef}>
          <div
            ref={ctx.refs.setFloating}
            aria-labelledby={ctx.labelId}
            style={ctx.floatingStyles}
            className={cn('aero-popover-panel flex flex-col', className)}
            {...ctx.getFloatingProps(rest)}
          />
        </FloatingList>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}
MenuContent.displayName = 'Menu.Content'

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSelect?: () => void
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, disabled, onClick, onSelect, children, ...rest }, forwardedRef) => {
    const ctx = useMenuContext('Item')
    const item = useListItem()
    const ref = useMergeRefs([item.ref, forwardedRef])
    const isActive = ctx.activeIndex === item.index

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        className={cn('aero-menu-item', className)}
        {...ctx.getItemProps({
          ...rest,
          onClick: (event: MouseEvent<HTMLButtonElement>) => {
            onClick?.(event)
            if (event.defaultPrevented || disabled) return
            onSelect?.()
            ctx.setOpen(false)
          },
        })}
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
