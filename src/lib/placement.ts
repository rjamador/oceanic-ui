import type { Placement } from '@floating-ui/react'

/** Which edge of the trigger the overlay opens from. */
export type OverlaySide = 'top' | 'bottom' | 'left' | 'right'
/** How the overlay aligns along that edge. */
export type OverlayAlign = 'start' | 'center' | 'end'

/** Map our `side` + `align` pair to a Floating UI placement string. */
export function toPlacement(side: OverlaySide, align: OverlayAlign): Placement {
  return align === 'center' ? side : (`${side}-${align}` as Placement)
}
