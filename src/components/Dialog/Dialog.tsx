import { forwardRef, useEffect, useId, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { IconButton } from '../IconButton'
import styles from './Dialog.module.css'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ open, onClose, title, children, className }, forwardedRef) => {
    const ref = useRef<HTMLDialogElement>(null)
    const titleId = useId()

    // The native <dialog> element owns its own open state (showModal/close),
    // React just syncs the `open` prop to it — this also gives us the focus
    // trap, Escape-to-close, and focus-restore-on-close for free.
    useEffect(() => {
      const el = ref.current
      if (!el) return

      if (open && !el.open) {
        el.showModal()
      } else if (!open && el.open) {
        el.close()
      }
    }, [open])

    useEffect(() => {
      const el = ref.current
      if (!el) return

      const handleClose = () => onClose()
      el.addEventListener('close', handleClose)
      return () => el.removeEventListener('close', handleClose)
    }, [onClose])

    return (
      <dialog
        ref={(node) => {
          ref.current = node
          if (typeof forwardedRef === 'function') {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
        }}
        className={cn(styles.dialog, className)}
        aria-labelledby={title ? titleId : undefined}
      >
        {title && (
          <div className={styles.header}>
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <IconButton
              variant="ghost"
              size="sm"
              icon={CloseIcon}
              aria-label="Close"
              onClick={() => ref.current?.close()}
            />
          </div>
        )}
        <div className={styles.content}>{children}</div>
      </dialog>
    )
  },
)

Dialog.displayName = 'Dialog'
