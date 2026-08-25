/* eslint-disable react-refresh/only-export-components -- reason: this is a
   provider + hook pair (ToastProvider/useToast) that must share one module
   scope for the Context; splitting the hook into its own file would still
   need to import the same non-exported Context, so there's nothing to gain
   by separating them. */
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/cn'

import { IconButton } from '../IconButton'
import styles from './Toast.module.css'

export type ToastVariant = 'default' | 'danger'

export interface ToastOptions {
  title?: string
  description: string
  variant?: ToastVariant
  /** Milliseconds before auto-dismiss. */
  duration?: number
}

interface ToastItem extends Required<Omit<ToastOptions, 'title'>> {
  id: string
  title?: string
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/** Must be called inside a <ToastProvider>. Returns a function that queues a toast. */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>')
  }
  return context.toast
}

const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, variant = 'default', duration = 4000 }: ToastOptions) => {
      const id = String(nextId.current++)
      setToasts((current) => [...current, { id, title, description, variant, duration }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <div className={styles.viewport} role="region" aria-label="Notifications">
          {toasts.map((item) => (
            <div
              key={item.id}
              role="status"
              aria-live="polite"
              className={cn(styles.toast, item.variant === 'danger' && styles.danger)}
            >
              <div className={styles.content}>
                {item.title && <p className={styles.title}>{item.title}</p>}
                <p className={styles.description}>{item.description}</p>
              </div>
              <IconButton
                variant="ghost"
                size="sm"
                icon={CloseIcon}
                aria-label="Dismiss"
                onClick={() => dismiss(item.id)}
              />
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}
