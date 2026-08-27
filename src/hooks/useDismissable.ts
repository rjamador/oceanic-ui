import { useEffect, useRef, type RefObject } from 'react'

export interface UseDismissableProps {
  /** Whether the layer is currently open — listeners are only bound while true. */
  open: boolean
  /** Called on outside pointerdown or the Escape key. */
  onDismiss: () => void
  /** The layer's outermost node; a pointerdown inside it is not a dismiss. */
  rootRef: RefObject<HTMLElement | null>
}

/**
 * Shared dismiss behaviour for the non-modal overlay layers (`Popover`,
 * `Menu`): close on outside pointerdown and on Escape. `onDismiss` is held
 * in a ref so an inline callback from the consumer doesn't re-bind the
 * document listeners on every render.
 */
export function useDismissable({ open, onDismiss, rootRef }: UseDismissableProps): void {
  const onDismissRef = useRef(onDismiss)
  useEffect(() => {
    onDismissRef.current = onDismiss
  })

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current
      if (root && event.target instanceof Node && !root.contains(event.target)) {
        onDismissRef.current()
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onDismissRef.current()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, rootRef])
}
