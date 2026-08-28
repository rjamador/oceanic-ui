import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const pulseVariants = cva('aero-pulse', {
  variants: {
    // Disc diameter. `xs`–`lg` is a deliberate dot-scale, separate from the
    // shared control `sm/md/lg` height scale — a Pulse is a mark, not a control.
    size: {
      xs: 'size-2.5',
      sm: 'size-3.5',
      md: 'size-5',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'sm',
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
   * Breathes the glow ring while work is in flight. Honours
   * `prefers-reduced-motion` (static ring, no animation).
   * @default false
   */
  active?: boolean
  /**
   * Expose the mark as a live status region (`role="status"`) with an
   * off-screen accessible name. Leave off when the Pulse sits next to its
   * own visible label — the default is decorative (`aria-hidden`).
   * @default false
   */
  announce?: boolean
  /**
   * Off-screen accessible name, used only when `announce` is set.
   * @default Working
   */
  label?: string
}

/**
 * A small round mark whose glow ring breathes while something is in
 * progress — a quieter alternative to a spinner for "working", "saving",
 * "recording", or a live activity dot. Opaque, top-lit, thin light border,
 * glow not gloss.
 *
 * Decorative by default. Pass `announce` for a standalone mark a screen
 * reader should pick up.
 */
export const Pulse = forwardRef<HTMLSpanElement, PulseProps>(
  (
    {
      size = 'sm',
      active = false,
      announce = false,
      label = 'Working',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role={announce ? 'status' : undefined}
        aria-hidden={announce ? undefined : true}
        aria-label={announce ? label : undefined}
        aria-live={announce && active ? 'polite' : undefined}
        data-active={active || undefined}
        className={cn(pulseVariants({ size }), active && 'aero-pulse-active', className)}
        {...rest}
      >
        {announce ? <span className="sr-only">{label}</span> : null}
        {children}
      </span>
    )
  },
)

Pulse.displayName = 'Pulse'
