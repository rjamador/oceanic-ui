/* eslint-disable react-refresh/only-export-components -- reason: <Sidebar.Provider>
   and its useSidebar() hook share one context; keeping them in one file is the
   same call as a compound component (see docs/creating-components.md). */
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  useSyncExternalStore,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {}
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export type SidebarSide = 'left' | 'right'
export type SidebarCollapsible = 'icon' | 'offcanvas' | 'none'
export type SidebarVariant = 'plain' | 'inset'

export interface SidebarContextValue {
  /** Desktop expanded/collapsed state. */
  open: boolean
  setOpen: (open: boolean) => void
  /** Mobile drawer state — always component-owned. */
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  /** Below the provider's `mobileBreakpoint`. */
  isMobile: boolean
  /** Toggles the drawer on mobile, the collapse state on desktop. */
  toggle: () => void
  side: SidebarSide
  collapsible: SidebarCollapsible
  variant: SidebarVariant
  /** `id` of the `<aside>` — wired to every trigger's `aria-controls`. */
  panelId: string
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

/**
 * Reads the shared sidebar state. Throws outside `<Sidebar.Provider>`.
 * `state` is derived: `"expanded"` | `"collapsed"` on desktop.
 */
export function useSidebar(): SidebarContextValue & { state: 'expanded' | 'collapsed' } {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used inside <Sidebar.Provider>')
  }
  return { ...context, state: context.open ? 'expanded' : 'collapsed' }
}

export interface SidebarProviderProps {
  /**
   * Which edge the panel sits on. Governs the whole layout, so it lives
   * here rather than on `<Sidebar>`.
   * @default left
   */
  side?: SidebarSide
  /**
   * Desktop collapse behaviour: shrink to an icon rail, slide fully away,
   * or stay put. Mobile always uses the drawer regardless.
   * @default icon
   */
  collapsible?: SidebarCollapsible
  /**
   * `inset` floats `<Sidebar.Main>` in a rounded card; `plain` is flush.
   * @default plain
   */
  variant?: SidebarVariant
  /** Controlled desktop open state. */
  open?: boolean
  /** @default true */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * Max width (px) at which the panel becomes a drawer.
   * @default 768
   */
  mobileBreakpoint?: number
  /** Extra classes for the layout wrapper. */
  className?: string
  style?: HTMLAttributes<HTMLDivElement>['style']
  children: ReactNode
}

export function SidebarProvider({
  side = 'left',
  collapsible = 'icon',
  variant = 'plain',
  open,
  defaultOpen = true,
  onOpenChange,
  mobileBreakpoint = 768,
  className,
  style,
  children,
}: SidebarProviderProps) {
  const [desktopOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })
  const [openMobile, setOpenMobile] = useState(false)
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`)
  const panelId = useId()

  const toggle = useCallback(() => {
    if (isMobile) {
      setOpenMobile((value) => !value)
      return
    }
    if (collapsible === 'none') return
    setOpen(!desktopOpen)
  }, [isMobile, collapsible, desktopOpen, setOpen])

  const value = useMemo<SidebarContextValue>(
    () => ({
      open: desktopOpen,
      setOpen,
      // Drawer state only counts on mobile — gate it so a resize to desktop
      // with the drawer left open doesn't strand an overlay.
      openMobile: isMobile && openMobile,
      setOpenMobile,
      isMobile,
      toggle,
      side,
      collapsible,
      variant,
      panelId,
    }),
    [desktopOpen, setOpen, openMobile, isMobile, toggle, side, collapsible, variant, panelId],
  )

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn('aero-sidebar-layout', className)}
        data-side={side}
        data-variant={variant}
        data-collapsible={collapsible}
        data-state={desktopOpen ? 'expanded' : 'collapsed'}
        data-mobile={isMobile || undefined}
        style={style}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}
