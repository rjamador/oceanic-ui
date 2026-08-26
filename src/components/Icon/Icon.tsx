import { forwardRef, type SVGAttributes } from 'react'

import { cn } from '@/lib/cn'

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number
}

/**
 * The shell every icon in this library renders through — a 24×24 outline
 * SVG (stroke-only, no filled style; see docs/design-language.md#icons).
 * Pass raw SVG children (`<path>`, `<circle>`, …) to build a new icon, or
 * use one of the pre-built icons in `src/components/Icon/icons.tsx`.
 *
 * Decorative by default (`aria-hidden`) since most icons sit inside an
 * already-labeled control (IconButton's `aria-label`, a Tooltip). Pass
 * `aria-label` yourself for a standalone, meaningful icon — `role="img"`
 * is added automatically whenever you do.
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, strokeWidth = 2, className, children, ...rest }, ref) => {
    const hasLabel = Boolean(rest['aria-label'] ?? rest['aria-labelledby'])

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        role={hasLabel ? 'img' : undefined}
        aria-hidden={hasLabel ? undefined : true}
        className={cn('inline-flex flex-none', className)}
        {...rest}
      >
        {children}
      </svg>
    )
  },
)

Icon.displayName = 'Icon'
