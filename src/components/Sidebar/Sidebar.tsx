/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Sidebar.Header/Nav/Item/…), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import {
  createContext,
  forwardRef,
  useContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cva } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, FolderIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { Text } from '../Text'

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  collapsible: boolean
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function useSidebar(component: string) {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(`<Sidebar.${component}> must be used inside <Sidebar>`)
  }
  return context
}

const sidebarItemVariants = cva('aero-sidebar-item', {
  variants: {
    active: {
      true: 'aero-sidebar-item-selected',
      false: '',
    },
  },
  defaultVariants: {
    active: false,
  },
})

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean
  /**
   * Uncontrolled initial open state.
   * @default true
   */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * When true, `Sidebar.Header` renders a collapse control.
   * @default true
   */
  collapsible?: boolean
}

/**
 * Chat history rail — Zest's information architecture (nav, projects,
 * recent, profile) with Ocean chrome: opaque panel, modest radius, glow
 * on focus. Presentational: no persistence, no fetching.
 */
const SidebarRoot = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      open,
      defaultOpen = true,
      onOpenChange,
      collapsible = true,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [current, setOpen] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })

    return (
      <SidebarContext.Provider value={{ open: current, setOpen, collapsible }}>
        <aside
          ref={ref}
          data-slot="sidebar"
          data-open={current}
          className={cn('aero-sidebar', className)}
          {...rest}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    )
  },
)
SidebarRoot.displayName = 'Sidebar'

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const { open, setOpen, collapsible } = useSidebar('Header')

    if (!open) {
      return (
        <div ref={ref} data-slot="sidebar-header" className={cn('aero-sidebar-header', className)} {...rest}>
          {collapsible ? (
            <IconButton
              type="button"
              variant="ghost"
              size="sm"
              icon={<ChevronsRightIcon />}
              aria-label="Expand sidebar"
              aria-expanded={false}
              onClick={() => setOpen(true)}
            />
          ) : null}
        </div>
      )
    }

    return (
      <div ref={ref} data-slot="sidebar-header" className={cn('aero-sidebar-header', className)} {...rest}>
        <div className="flex min-w-0 flex-1 items-center gap-0.5">{children}</div>
        {collapsible ? (
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            icon={<ChevronsLeftIcon />}
            aria-label="Collapse sidebar"
            aria-expanded
            onClick={() => setOpen(false)}
          />
        ) : null}
      </div>
    )
  },
)
SidebarHeader.displayName = 'Sidebar.Header'

export type SidebarBodyProps = HTMLAttributes<HTMLDivElement>

const SidebarBody = forwardRef<HTMLDivElement, SidebarBodyProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div ref={ref} data-slot="sidebar-body" className={cn('aero-sidebar-body', className)} {...rest} />
    )
  },
)
SidebarBody.displayName = 'Sidebar.Body'

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-footer"
        className={cn('aero-sidebar-footer mt-auto', className)}
        {...rest}
      />
    )
  },
)
SidebarFooter.displayName = 'Sidebar.Footer'

export type SidebarNavProps = HTMLAttributes<HTMLElement>

const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(({ className, ...rest }, ref) => {
  return (
    <nav
      ref={ref}
      data-slot="sidebar-nav"
      aria-label="Primary"
      className={cn('flex flex-col gap-0.5', className)}
      {...rest}
    />
  )
})
SidebarNav.displayName = 'Sidebar.Nav'

export interface SidebarNavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  active?: boolean
}

const SidebarNavItem = forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ icon, active = false, className, children, ...rest }, ref) => {
    const { open } = useSidebar('NavItem')
    const label = typeof children === 'string' ? children : undefined

    return (
      <button
        ref={ref}
        type="button"
        data-slot="sidebar-nav-item"
        data-active={active || undefined}
        aria-current={active ? 'page' : undefined}
        className={cn(sidebarItemVariants({ active }), className)}
        {...rest}
        aria-label={rest['aria-label'] ?? label}
      >
        {icon ? (
          <span className="inline-flex shrink-0 text-[var(--text-muted)]" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {open ? <span className="min-w-0 truncate">{children}</span> : null}
      </button>
    )
  },
)
SidebarNavItem.displayName = 'Sidebar.NavItem'

export type SidebarSectionProps = HTMLAttributes<HTMLElement>

const SidebarSection = forwardRef<HTMLElement, SidebarSectionProps>(
  ({ className, ...rest }, ref) => {
    const { open } = useSidebar('Section')
    if (!open) return null

    return (
      <section
        ref={ref}
        data-slot="sidebar-section"
        className={cn('flex flex-col gap-1', className)}
        {...rest}
      />
    )
  },
)
SidebarSection.displayName = 'Sidebar.Section'

export interface SidebarSectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  count?: number
  action?: ReactNode
}

const SidebarSectionHeader = forwardRef<HTMLDivElement, SidebarSectionHeaderProps>(
  ({ icon, count, action, className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="sidebar-section-header"
        className={cn('flex items-center justify-between gap-1 px-1', className)}
        {...rest}
      >
        <div className="aero-sidebar-section-label min-w-0">
          {icon ? (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <span className="min-w-0 truncate">{children}</span>
          {count != null ? (
            <span className="tabular-nums text-[var(--text-muted)] opacity-70">{count}</span>
          ) : null}
        </div>
        {action}
      </div>
    )
  },
)
SidebarSectionHeader.displayName = 'Sidebar.SectionHeader'

export interface SidebarGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  icon?: ReactNode
  trailing?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  (
    {
      title,
      icon,
      trailing,
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })

    return (
      <div
        ref={ref}
        data-slot="sidebar-group"
        className={cn('flex min-w-0 flex-col gap-0.5', className)}
        {...rest}
      >
        <div className="group/sidebar-group flex min-w-0 items-center gap-0.5">
          <button
            type="button"
            aria-expanded={expanded}
            className={cn(sidebarItemVariants({ active: false }), 'flex-1')}
            onClick={() => setExpanded(!expanded)}
          >
            <span
              className={cn(
                'inline-flex shrink-0 text-[var(--text-muted)] transition-transform duration-150',
                expanded && 'rotate-90',
              )}
              aria-hidden="true"
            >
              <ChevronRightIcon size={12} />
            </span>
            <span className="inline-flex shrink-0 text-[var(--text-muted)]" aria-hidden="true">
              {icon ?? <FolderIcon size={14} />}
            </span>
            <span className="min-w-0 truncate">{title}</span>
          </button>
          {trailing ? (
            <div className="flex shrink-0 items-center opacity-0 transition-opacity group-hover/sidebar-group:opacity-100 group-focus-within/sidebar-group:opacity-100">
              {trailing}
            </div>
          ) : null}
        </div>
        {expanded ? <div className="flex flex-col gap-0.5 pl-3">{children}</div> : null}
      </div>
    )
  },
)
SidebarGroup.displayName = 'Sidebar.Group'

export interface SidebarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  avatar?: ReactNode
  description?: ReactNode
  meta?: ReactNode
  trailing?: ReactNode
  active?: boolean
}

const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  (
    {
      icon,
      avatar,
      description,
      meta,
      trailing,
      active = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const { open } = useSidebar('Item')
    const label = typeof children === 'string' ? children : undefined

    if (!open) {
      return (
        <button
          ref={ref}
          type="button"
          data-slot="sidebar-item"
          data-active={active || undefined}
          aria-current={active ? 'page' : undefined}
          className={cn(sidebarItemVariants({ active }), className)}
          {...rest}
          aria-label={rest['aria-label'] ?? label}
        >
          {avatar ?? icon}
        </button>
      )
    }

    return (
      <div className="group/sidebar-item relative min-w-0" data-active={active || undefined}>
        <button
          ref={ref}
          type="button"
          data-slot="sidebar-item"
          data-active={active || undefined}
          aria-current={active ? 'page' : undefined}
          className={cn(
            sidebarItemVariants({ active }),
            trailing && 'pr-10',
            description && 'h-auto min-h-7 items-start py-1.5',
            className,
          )}
          {...rest}
          aria-label={rest['aria-label'] ?? label}
        >
          {avatar ??
            (icon ? (
              <span className="inline-flex shrink-0 text-[var(--text-muted)]" aria-hidden="true">
                {icon}
              </span>
            ) : null)}
          <span className="flex min-w-0 flex-1 flex-col items-stretch">
            <span className="min-w-0 truncate">{children}</span>
            {description ? (
              <Text as="span" variant="labelSmall" color="muted" className="min-w-0 truncate">
                {description}
              </Text>
            ) : null}
          </span>
          {meta ? (
            <span className="shrink-0 [font-family:var(--font-body)] text-[length:var(--text-xs)] tabular-nums text-[var(--text-muted)]">
              {meta}
            </span>
          ) : null}
        </button>
        {trailing ? (
          <div
            className={cn(
              'absolute top-1/2 right-0.5 flex -translate-y-1/2 items-center gap-0.5',
              'opacity-0 transition-opacity group-hover/sidebar-item:opacity-100 group-focus-within/sidebar-item:opacity-100',
              active && 'opacity-100',
            )}
          >
            {trailing}
          </div>
        ) : null}
      </div>
    )
  },
)
SidebarItem.displayName = 'Sidebar.Item'

export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Body: SidebarBody,
  Footer: SidebarFooter,
  Nav: SidebarNav,
  NavItem: SidebarNavItem,
  Section: SidebarSection,
  SectionHeader: SidebarSectionHeader,
  Group: SidebarGroup,
  Item: SidebarItem,
})
