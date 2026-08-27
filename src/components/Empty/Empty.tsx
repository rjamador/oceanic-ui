/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Empty.Header/Media/…), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { Text } from '../Text'

export type EmptyProps = HTMLAttributes<HTMLDivElement>

const EmptyRoot = forwardRef<HTMLDivElement, EmptyProps>(({ className, ...rest }, ref) => {
  return <div ref={ref} data-slot="empty" className={cn('aero-empty', className)} {...rest} />
})
EmptyRoot.displayName = 'Empty'

export type EmptyHeaderProps = HTMLAttributes<HTMLDivElement>

const EmptyHeader = forwardRef<HTMLDivElement, EmptyHeaderProps>(({ className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="empty-header"
      className={cn('flex max-w-sm flex-col items-center gap-2', className)}
      {...rest}
    />
  )
})
EmptyHeader.displayName = 'Empty.Header'

const emptyMediaVariants = cva('mb-2 flex shrink-0 items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: 'aero-empty-media',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type EmptyMediaVariant = NonNullable<VariantProps<typeof emptyMediaVariants>['variant']>

export interface EmptyMediaProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyMediaVariants> {}

const EmptyMedia = forwardRef<HTMLDivElement, EmptyMediaProps>(
  ({ className, variant = 'default', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-media"
        data-variant={variant}
        className={cn(emptyMediaVariants({ variant }), className)}
        {...rest}
      />
    )
  },
)
EmptyMedia.displayName = 'Empty.Media'

export interface EmptyTitleProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /** Heading level for the document outline — pick the one that fits where
   *  the empty state sits. Defaults to `h3`. */
  as?: 'h2' | 'h3' | 'h4'
}

const EmptyTitle = forwardRef<HTMLElement, EmptyTitleProps>(
  ({ className, as = 'h3', ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        as={as}
        variant="headingSmall"
        data-slot="empty-title"
        className={className}
        {...rest}
      />
    )
  },
)
EmptyTitle.displayName = 'Empty.Title'

export type EmptyDescriptionProps = Omit<HTMLAttributes<HTMLElement>, 'color'>

const EmptyDescription = forwardRef<HTMLElement, EmptyDescriptionProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        as="p"
        variant="bodySmall"
        color="muted"
        data-slot="empty-description"
        className={cn('leading-relaxed', className)}
        {...rest}
      />
    )
  },
)
EmptyDescription.displayName = 'Empty.Description'

export type EmptyContentProps = HTMLAttributes<HTMLDivElement>

const EmptyContent = forwardRef<HTMLDivElement, EmptyContentProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="empty-content"
        className={cn(
          'flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm',
          className,
        )}
        {...rest}
      />
    )
  },
)
EmptyContent.displayName = 'Empty.Content'

export const Empty = Object.assign(EmptyRoot, {
  Header: EmptyHeader,
  Media: EmptyMedia,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Content: EmptyContent,
})
