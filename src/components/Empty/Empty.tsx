/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Empty.Header/Media/…), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

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

export type EmptyTitleProps = HTMLAttributes<HTMLDivElement>

const EmptyTitle = forwardRef<HTMLDivElement, EmptyTitleProps>(({ className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="empty-title"
      className={cn(
        'font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[color:var(--text)]',
        className,
      )}
      {...rest}
    />
  )
})
EmptyTitle.displayName = 'Empty.Title'

export type EmptyDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const EmptyDescription = forwardRef<HTMLParagraphElement, EmptyDescriptionProps>(
  ({ className, ...rest }, ref) => {
    return (
      <p
        ref={ref}
        data-slot="empty-description"
        className={cn('m-0 text-sm leading-relaxed text-[color:var(--text-muted)]', className)}
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
