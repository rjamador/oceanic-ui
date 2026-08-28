import {
  forwardRef,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { useMergeRefs } from '@floating-ui/react'

import { cn } from '@/lib/cn'

import { PanelLeftIcon } from '../Icon'
import { IconButton, type IconButtonProps } from '../IconButton'
import { useSidebar } from './context'

/* ─── Panel ──────────────────────────────────────────────────────────── */

export interface SidebarPanelProps extends HTMLAttributes<HTMLElement> {
  /**
   * Accessible name for the landmark.
   * @default Sidebar
   */
  'aria-label'?: string
}

/**
 * The panel itself. Renders an `<aside>` landmark on desktop; on mobile it
 * moves into a modal drawer (native `<dialog>` — focus trap, Escape, and
 * focus restore come with it). Layout props (`side`, `collapsible`,
 * `variant`) live on `<Sidebar.Provider>`.
 */
const SidebarPanel = forwardRef<HTMLElement, SidebarPanelProps>(
  ({ className, children, 'aria-label': ariaLabel = 'Sidebar', ...rest }, ref) => {
    const { isMobile, openMobile, setOpenMobile, side, panelId } = useSidebar()
    const dialogRef = useRef<HTMLDialogElement>(null)
    const setDialogRef = useMergeRefs([dialogRef, ref])

    useEffect(() => {
      const el = dialogRef.current
      if (!el || !isMobile) return
      if (openMobile && !el.open) el.showModal()
      else if (!openMobile && el.open) el.close()
    }, [isMobile, openMobile])

    useEffect(() => {
      const el = dialogRef.current
      if (!el) return
      const handleClose = () => setOpenMobile(false)
      // Backdrop tap: a click whose target is the <dialog> itself (not the
      // panel) closes it. An imperative listener, so it isn't a click
      // handler on a non-interactive element.
      const handleClick = (event: Event) => {
        if (event.target === el) el.close()
      }
      el.addEventListener('close', handleClose)
      el.addEventListener('click', handleClick)
      return () => {
        el.removeEventListener('close', handleClose)
        el.removeEventListener('click', handleClick)
      }
    }, [setOpenMobile])

    if (isMobile) {
      return (
        <dialog
          ref={setDialogRef}
          id={panelId}
          className={cn('aero-sidebar-drawer', className)}
          data-side={side}
          aria-label={ariaLabel}
        >
          <div className="aero-sidebar-drawer-panel">{children}</div>
        </dialog>
      )
    }

    return (
      <aside
        ref={ref}
        id={panelId}
        className={cn('aero-sidebar', className)}
        aria-label={ariaLabel}
        {...rest}
      >
        <div className="aero-sidebar-inner">{children}</div>
      </aside>
    )
  },
)
SidebarPanel.displayName = 'Sidebar'

/* ─── Trigger ────────────────────────────────────────────────────────── */

export interface SidebarTriggerProps
  extends Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick'> {
  /** @default Toggle sidebar */
  'aria-label'?: string
  icon?: ReactNode
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

/**
 * Toggles the sidebar. Works anywhere inside `<Sidebar.Provider>` — a top
 * bar, the sidebar header, a settings screen.
 */
const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ 'aria-label': ariaLabel = 'Toggle sidebar', icon, onClick, ...rest }, ref) => {
    const { toggle, open, openMobile, isMobile, collapsible, panelId } = useSidebar()
    const expanded = isMobile ? openMobile : collapsible === 'none' ? true : open

    return (
      <IconButton
        ref={ref}
        type="button"
        variant="ghost"
        size="sm"
        icon={icon ?? <PanelLeftIcon />}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) toggle()
        }}
        {...rest}
      />
    )
  },
)
SidebarTrigger.displayName = 'Sidebar.Trigger'

/* ─── Rail ───────────────────────────────────────────────────────────── */

export type SidebarRailProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  /** @default Toggle sidebar */
  'aria-label'?: string
}

/**
 * A thin hit-strip along the panel's inner edge — click or Enter toggles.
 * Hidden on mobile and when `collapsible="none"`.
 */
const SidebarRail = forwardRef<HTMLButtonElement, SidebarRailProps>(
  ({ className, 'aria-label': ariaLabel = 'Toggle sidebar', onClick, ...rest }, ref) => {
    const { toggle, open, isMobile, collapsible, panelId } = useSidebar()
    if (isMobile || collapsible === 'none') return null

    return (
      <button
        ref={ref}
        type="button"
        tabIndex={-1}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn('aero-sidebar-rail', className)}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) toggle()
        }}
        {...rest}
      />
    )
  },
)
SidebarRail.displayName = 'Sidebar.Rail'

/* ─── Main ───────────────────────────────────────────────────────────── */

export type SidebarMainProps = HTMLAttributes<HTMLElement>

/** The sibling region that reflows as the panel collapses or insets. */
const SidebarMain = forwardRef<HTMLElement, SidebarMainProps>(
  ({ className, children, ...rest }, ref) => (
    <main ref={ref} className={cn('aero-sidebar-main', className)} {...rest}>
      {children}
    </main>
  ),
)
SidebarMain.displayName = 'Sidebar.Main'

/* ─── Header / Body / Footer ─────────────────────────────────────────── */

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>
const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} data-slot="sidebar-header" className={cn('aero-sidebar-header', className)} {...rest} />
  ),
)
SidebarHeader.displayName = 'Sidebar.Header'

export type SidebarBodyProps = HTMLAttributes<HTMLDivElement>
const SidebarBody = forwardRef<HTMLDivElement, SidebarBodyProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} data-slot="sidebar-body" className={cn('aero-sidebar-body', className)} {...rest} />
  ),
)
SidebarBody.displayName = 'Sidebar.Body'

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>
const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...rest }, ref) => (
    <div ref={ref} data-slot="sidebar-footer" className={cn('aero-sidebar-footer', className)} {...rest} />
  ),
)
SidebarFooter.displayName = 'Sidebar.Footer'

export {
  SidebarPanel,
  SidebarTrigger,
  SidebarRail,
  SidebarMain,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
}
