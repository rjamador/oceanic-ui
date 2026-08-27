import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const pulseVariants = cva('aero-pulse', {
  variants: {
    size: {
      xs: 'size-2.5',
      sm: 'size-3.5',
      md: 'size-5',
      lg: 'size-8',
    },
    active: {
      true: 'aero-pulse-active',
      false: '',
    },
  },
  defaultVariants: {
    size: 'sm',
    active: false,
  },
})

export type PulseSize = NonNullable<VariantProps<typeof pulseVariants>['size']>

export interface PulseProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Disc diameter. `sm` matches a compact chat/sidebar mark.
   * @default sm
   */
  size?: PulseSize
  /**
   * Breathes the aqua glow while work is in flight. Honours
   * `prefers-reduced-motion` (static glow, no animation).
   * @default false
   */
  active?: boolean
  /**
   * Accessible name. A pulse has no visible text of its own.
   * @default Working
   */
  label?: string
}

/**
 * The thinking mark — a round, opaque Ocean disc whose glow breathes
 * while the agent is working. Structure is inspired by Zest's activity
 * orb; the surface is Ocean (top-lit gradient, thin light border, glow
 * not gloss).
 */
export const Pulse = forwardRef<HTMLSpanElement, PulseProps>(
  (
    { size = 'sm', active = false, label = 'Working', className, children, ...rest },
    ref,
  ) => {
    const decorative = rest['aria-hidden'] === true

    return (
      <span
        ref={ref}
        role={decorative ? undefined : 'status'}
        aria-label={decorative ? undefined : label}
        aria-live={!decorative && active ? 'polite' : undefined}
        data-active={active || undefined}
        className={cn(pulseVariants({ size, active }), className)}
        {...rest}
      >
        {children}
      </span>
    )
  },
)

Pulse.displayName = 'Pulse'
