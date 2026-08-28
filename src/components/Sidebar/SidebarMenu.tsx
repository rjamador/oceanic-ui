import {
  forwardRef,
  useId,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react'
import { cva } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { ChevronRightIcon } from '../Icon'
import { Tooltip } from '../Tooltip'
import { useSidebar } from './context'
import { Slot } from './slot'

/* ─── Group ──────────────────────────────────────────────────────────── */

export interface SidebarGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading. Hidden in the collapsed icon rail. */
  label?: ReactNode
  /** Trailing control beside the label (e.g. an "add" button). */
  action?: ReactNode
  /** Make the section a disclosure. */
  collapsible?: boolean
  /** @default true */
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarGroup = forwardRef<HTMLElement, SidebarGroupProps>(
  (
    { label, action, collapsible = false, defaultOpen = true, open, onOpenChange, className, children, ...rest },
    ref,
  ) => {
    const { state, collapsible: mode, isMobile } = useSidebar()
    const [expanded, setExpanded] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const contentId = useId()
    const iconRail = state === 'collapsed' && mode === 'icon' && !isMobile
    const showContent = !collapsible || expanded

    return (
      <section ref={ref} data-slot="sidebar-group" className={cn('aero-sidebar-group', className)} {...rest}>
        {label && !iconRail ? (
          collapsible ? (
            <button
              type="button"
              className="aero-sidebar-group-label aero-sidebar-group-label-button"
              aria-expanded={expanded}
              aria-controls={contentId}
              onClick={() => setExpanded(!expanded)}
            >
              <span
                className={cn('inline-flex transition-transform duration-150', expanded && 'rotate-90')}
                aria-hidden="true"
              >
                <ChevronRightIcon size={12} />
              </span>
              {label}
            </button>
          ) : (
            <div className="aero-sidebar-group-label">
              <span className="min-w-0 truncate">{label}</span>
              {action ? <span className="aero-sidebar-group-action">{action}</span> : null}
            </div>
          )
        ) : null}
        {showContent ? (
          <div id={collapsible ? contentId : undefined}>{children}</div>
        ) : null}
      </section>
    )
  },
)
SidebarGroup.displayName = 'Sidebar.Group'

/* ─── Menu ───────────────────────────────────────────────────────────── */

export type SidebarMenuProps = HTMLAttributes<HTMLUListElement>

const SidebarMenu = forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...rest }, ref) => (
    <ul ref={ref} className={cn('aero-sidebar-menu', className)} {...rest} />
  ),
)
SidebarMenu.displayName = 'Sidebar.Menu'

/** Up/Down moves focus between the interactive rows of the nearest menu. */
function rovingKeyDown(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  const menu = event.currentTarget.closest('.aero-sidebar-menu')
  if (!menu) return
  const items = Array.from(
    menu.querySelectorAll<HTMLElement>(
      '[data-sidebar-item]:not([disabled]):not([aria-disabled="true"])',
    ),
  )
  const index = items.indexOf(event.currentTarget)
  if (index === -1) return
  event.preventDefault()
  const next =
    event.key === 'ArrowDown'
      ? items[(index + 1) % items.length]
      : items[(index - 1 + items.length) % items.length]
  next?.focus()
}

/* ─── Item ───────────────────────────────────────────────────────────── */

const itemVariants = cva('aero-sidebar-item', {
  variants: {
    active: { true: 'aero-sidebar-item-active', false: '' },
  },
  defaultVariants: { active: false },
})

export interface SidebarItemProps
  extends Omit<LiHTMLAttributes<HTMLLIElement>, 'onClick' | 'title'> {
  icon?: ReactNode
  /** Marks the item selected — sets `aria-current="page"` unless you pass
   *  your own `aria-current` (use `"true"` for non-navigation lists). */
  active?: boolean
  /** Trailing count or dot. Hidden in the collapsed rail. */
  badge?: ReactNode
  /** Hover/focus-revealed trailing control (e.g. delete). */
  action?: ReactNode
  /** Off-screen / tooltip label when the rail is collapsed to icons. */
  label?: string
  /** Render the row as this element instead of a `<button>` (an `<a>`, a router `<Link>`). */
  asChild?: boolean
  /** A nested `<Sidebar.Menu>` — the row becomes a disclosure for it. */
  subMenu?: ReactNode
  /** @default false */
  defaultSubMenuOpen?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  'aria-current'?: LiHTMLAttributes<HTMLLIElement>['aria-current']
  children?: ReactNode
}

const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  (
    {
      icon,
      active = false,
      badge,
      action,
      label,
      asChild = false,
      subMenu,
      defaultSubMenuOpen = false,
      className,
      children,
      onClick,
      'aria-current': ariaCurrent,
      'aria-label': ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const { state, collapsible: mode, isMobile } = useSidebar()
    const [subOpen, setSubOpen] = useState(defaultSubMenuOpen)
    const subId = useId()
    const iconRail = state === 'collapsed' && mode === 'icon' && !isMobile
    const hasSub = subMenu != null && subMenu !== false
    const current = ariaCurrent ?? (active ? 'page' : undefined)
    const accessibleName = label ?? (typeof children === 'string' ? children : undefined)

    const control = (
      <Slot
        asChild={asChild}
        child={children}
        forwardedRef={ref}
        data-sidebar-item=""
        data-active={active || undefined}
        aria-current={current}
        aria-expanded={hasSub && !asChild ? subOpen : undefined}
        aria-controls={hasSub ? subId : undefined}
        aria-label={iconRail ? accessibleName : ariaLabel}
        className={cn(itemVariants({ active }), className)}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          onClick?.(event)
          if (hasSub && !asChild && !event.defaultPrevented) setSubOpen((v) => !v)
        }}
        onKeyDown={rovingKeyDown}
      >
        {icon ? (
          <span className="aero-sidebar-item-icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {/* With asChild the child element carries its own label. */}
        {!iconRail && !asChild ? (
          <span className="min-w-0 flex-1 truncate">{children}</span>
        ) : null}
        {!iconRail && badge != null ? <span className="aero-sidebar-item-badge">{badge}</span> : null}
        {!iconRail && hasSub ? (
          <span
            className={cn('inline-flex shrink-0 transition-transform duration-150', subOpen && 'rotate-90')}
            aria-hidden="true"
          >
            <ChevronRightIcon size={12} />
          </span>
        ) : null}
      </Slot>
    )

    return (
      <li className="aero-sidebar-menu-item" data-slot="sidebar-item" {...rest}>
        {iconRail && accessibleName ? (
          <Tooltip content={accessibleName} side="right">
            {control}
          </Tooltip>
        ) : (
          control
        )}
        {!iconRail && action ? <div className="aero-sidebar-item-action">{action}</div> : null}
        {hasSub && subOpen && !iconRail ? (
          <div id={subId} className="aero-sidebar-submenu">
            {subMenu}
          </div>
        ) : null}
      </li>
    )
  },
)
SidebarItem.displayName = 'Sidebar.Item'

/* ─── Separator ──────────────────────────────────────────────────────── */

export type SidebarSeparatorProps = HTMLAttributes<HTMLHRElement>

const SidebarSeparator = forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...rest }, ref) => (
    <hr ref={ref} className={cn('aero-sidebar-separator', className)} {...rest} />
  ),
)
SidebarSeparator.displayName = 'Sidebar.Separator'

export { SidebarGroup, SidebarMenu, SidebarItem, SidebarSeparator }

/* Re-export the label-as-standalone for consumers who want it outside a Group. */
export type SidebarGroupLabelProps = HTMLAttributes<HTMLDivElement>
export const SidebarGroupLabel = forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, ...rest }, ref) => {
    const { state, collapsible: mode, isMobile } = useSidebar()
    if (state === 'collapsed' && mode === 'icon' && !isMobile) return null
    return <div ref={ref} className={cn('aero-sidebar-group-label', className)} {...rest} />
  },
)
SidebarGroupLabel.displayName = 'Sidebar.GroupLabel'
