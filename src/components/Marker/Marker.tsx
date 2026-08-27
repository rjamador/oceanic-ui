/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Marker.Icon/Content), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const markerVariants = cva(
  'group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm font-medium text-[color:var(--text)]',
  {
    variants: {
      variant: {
        default: '',
        separator:
          'before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-[var(--control-secondary-border)] after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-[var(--control-secondary-border)]',
        border: 'border-b border-[var(--control-secondary-border)] pb-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type MarkerVariant = NonNullable<VariantProps<typeof markerVariants>['variant']>

export interface MarkerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof markerVariants> {}

const MarkerRoot = forwardRef<HTMLDivElement, MarkerProps>(
  ({ className, variant = 'default', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="marker"
        data-variant={variant}
        className={cn(markerVariants({ variant }), className)}
        {...rest}
      />
    )
  },
)
MarkerRoot.displayName = 'Marker'

export type MarkerIconProps = HTMLAttributes<HTMLSpanElement>

const MarkerIcon = forwardRef<HTMLSpanElement, MarkerIconProps>(({ className, ...rest }, ref) => {
  return (
    <span
      ref={ref}
      data-slot="marker-icon"
      aria-hidden="true"
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center leading-none',
        className,
      )}
      {...rest}
    />
  )
})
MarkerIcon.displayName = 'Marker.Icon'

export type MarkerContentProps = HTMLAttributes<HTMLSpanElement>

const MarkerContent = forwardRef<HTMLSpanElement, MarkerContentProps>(
  ({ className, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="marker-content"
        className={cn(
          'min-w-0 max-w-full wrap-break-word group-data-[variant=separator]/marker:shrink group-data-[variant=separator]/marker:text-center',
          className,
        )}
        {...rest}
      />
    )
  },
)
MarkerContent.displayName = 'Marker.Content'

export const Marker = Object.assign(MarkerRoot, {
  Icon: MarkerIcon,
  Content: MarkerContent,
})
