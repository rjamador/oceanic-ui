/* eslint-disable react-refresh/only-export-components -- reason: this is a
   provider + hook pair (ToastProvider/useToast) that must share one module
   scope for the Context; splitting the hook into its own file would still
   need to import the same non-exported Context, so there's nothing to gain
   by separating them. */
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { CloseIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { Text } from '../Text'

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

const toastVariants = cva(
  'aero-toast-surface flex items-start gap-2 pt-3 pr-3 pb-3 pl-4',
  {
    variants: {
      variant: {
        default: '',
        danger: 'aero-toast-danger',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/** Must be called inside a <ToastProvider>. Returns a function that queues a toast. */
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside a <ToastProvider>')
  }
  return context.toast
}

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
        <div
          className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-2 w-[min(360px,calc(100vw_-_var(--space-8)))]"
          role="region"
          aria-label="Notifications"
        >
          {toasts.map((item) => (
            <div key={item.id} role="status" aria-live="polite" className={cn(toastVariants({ variant: item.variant }))}>
              <div className="flex-1 min-w-0">
                {item.title && (
                  <Text
                    as="p"
                    variant="labelLarge"
                    color={item.variant === 'danger' ? 'danger' : 'default'}
                    className="mt-0 mr-0 mb-1 ml-0"
                  >
                    {item.title}
                  </Text>
                )}
                <Text as="p" variant="bodySmall" color="muted" className="m-0">
                  {item.description}
                </Text>
              </div>
              <IconButton
                variant="ghost"
                size="sm"
                icon={<CloseIcon />}
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
