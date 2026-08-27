import { useLayoutEffect, useState, type RefObject } from 'react'

export type EdgeAlign = 'start' | 'end'

/**
 * Naive one-axis collision guard for the overlay layers: once the panel is
 * on screen, if it overflows the viewport on the side its `align` anchors
 * away from, flip to the other side. Not a placement engine — no shift/size
 * middleware, no vertical flip, no re-measure on scroll/resize.
 *
 * ponytail: edge-flip only. If DatePicker or a floating Select need real
 * placement, pull in `@floating-ui/react` rather than growing this.
 */
export function useEdgeAlign(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  align: EdgeAlign,
): EdgeAlign {
  const [resolved, setResolved] = useState<EdgeAlign>(align)

  useLayoutEffect(() => {
    const el = ref.current
    let next: EdgeAlign = align
    if (open && el) {
      const rect = el.getBoundingClientRect()
      const margin = 8
      if (rect.width > 0) {
        if (align === 'start' && rect.right > window.innerWidth - margin) next = 'end'
        else if (align === 'end' && rect.left < margin) next = 'start'
      }
    }
    // Post-layout measurement → single adjustment; the intended use of
    // useLayoutEffect, not a state-synchronisation smell.
    setResolved(next)
  }, [open, align, ref])

  return resolved
}
