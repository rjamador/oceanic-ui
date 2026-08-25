/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Tabs.List/Tab/Panel share TabsContext), which by
   convention (see "Compound components" in docs/creating-components.md)
   lives in one file per component folder rather than scattering the
   shared context across files. */
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import styles from './Tabs.module.css'

interface TabsContextValue {
  value: string
  setValue: (value: string) => void
  idBase: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext(component: string) {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error(`<Tabs.${component}> must be rendered inside <Tabs>`)
  }
  return context
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  defaultValue: string
  onValueChange?: (value: string) => void
}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  ({ value, defaultValue, onValueChange, className, children, ...rest }, ref) => {
    const [current, setCurrent] = useControllableState({
      value,
      defaultValue,
      onChange: onValueChange,
    })
    const idBase = useId()

    return (
      <TabsContext.Provider value={{ value: current, setValue: setCurrent, idBase }}>
        <div ref={ref} className={cn(styles.root, className)} {...rest}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)
TabsRoot.displayName = 'Tabs'

export type TabsListProps = HTMLAttributes<HTMLDivElement>

function TabsList({ className, children, ...rest }: TabsListProps) {
  return (
    <div role="tablist" className={cn(styles.list, className)} {...rest}>
      {children}
    </div>
  )
}

export interface TabsTabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children'> {
  value: string
  children: ReactNode
}

const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>(
  ({ value, children, className, disabled, ...rest }, ref) => {
    const ctx = useTabsContext('Tab')
    const selected = ctx.value === value

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
      const list = event.currentTarget.closest('[role="tablist"]')
      if (!list) return

      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
      )
      const index = tabs.indexOf(event.currentTarget)
      if (index === -1) return

      event.preventDefault()
      const nextIndex =
        event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length
      const next = tabs[nextIndex]
      next?.focus()
      next?.click()
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${ctx.idBase}-tab-${value}`}
        aria-selected={selected}
        aria-controls={`${ctx.idBase}-panel-${value}`}
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        className={cn(styles.tab, selected && styles.tabSelected, className)}
        onClick={() => ctx.setValue(value)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
TabsTab.displayName = 'Tabs.Tab'

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ value, className, children, ...rest }, ref) => {
    const ctx = useTabsContext('Panel')
    if (ctx.value !== value) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${ctx.idBase}-panel-${value}`}
        aria-labelledby={`${ctx.idBase}-tab-${value}`}
        tabIndex={0}
        className={cn(styles.panel, className)}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
TabsPanel.displayName = 'Tabs.Panel'

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
})
