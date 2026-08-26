import { forwardRef, useEffect, useId, useRef, type ReactNode } from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { CloseIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { Text } from '../Text'

const dialogVariants = cva('aero-dialog-panel')

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

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
        className={cn(dialogVariants(), className)}
        aria-labelledby={title ? titleId : undefined}
      >
        {title && (
          <div className="flex items-center justify-between gap-4 pt-5 pr-4 pb-4 pl-5 border-b border-[var(--hairline)]">
            <Text as="h2" variant="headingSmall" id={titleId} className="m-0">
              {title}
            </Text>
            <IconButton
              variant="ghost"
              size="sm"
              icon={<CloseIcon />}
              aria-label="Close"
              onClick={() => ref.current?.close()}
            />
          </div>
        )}
        <div className="p-5">{children}</div>
      </dialog>
    )
  },
)

Dialog.displayName = 'Dialog'
