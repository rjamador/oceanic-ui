/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Attachment.Media/Content/…), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { IconButton, type IconButtonProps } from '../IconButton'
import { Text } from '../Text'

const attachmentVariants = cva('aero-attachment group/attachment', {
  variants: {
    size: {
      sm: 'gap-1.5 text-xs px-2 py-1.5',
      md: 'gap-2 text-sm px-2.5 py-2',
    },
    orientation: {
      horizontal: 'min-w-40 items-center',
      vertical: 'w-24 flex-col',
    },
  },
  defaultVariants: {
    size: 'md',
    orientation: 'horizontal',
  },
})

export type AttachmentSize = NonNullable<VariantProps<typeof attachmentVariants>['size']>
export type AttachmentOrientation = NonNullable<
  VariantProps<typeof attachmentVariants>['orientation']
>
export type AttachmentState = 'idle' | 'uploading' | 'processing' | 'error' | 'done'

export interface AttachmentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof attachmentVariants> {
  /**
   * Upload lifecycle. `error` also turns the chip into a `role="status"`
   * region so a transition into it is announced.
   * @default done
   */
  state?: AttachmentState
  /** @default md */
  size?: AttachmentSize
  /**
   * `vertical` is a fixed-width thumbnail card; `horizontal` is a chip.
   * @default horizontal
   */
  orientation?: AttachmentOrientation
}

/**
 * A file chip — a preview thumbnail (`Attachment.Media`), name + detail
 * (`Attachment.Content` → `Attachment.Title` / `Attachment.Description`),
 * and optional buttons (`Attachment.Actions` → `Attachment.Action`). Row
 * up several with `Attachment.Group`, which scrolls horizontally.
 */
const AttachmentRoot = forwardRef<HTMLDivElement, AttachmentProps>(
  (
    { className, state = 'done', size = 'md', orientation = 'horizontal', ...rest },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="attachment"
        data-state={state}
        data-size={size}
        data-orientation={orientation}
        // Announce a transition into the error state; the failure detail
        // is carried by Attachment.Description.
        role={state === 'error' ? 'status' : undefined}
        className={cn(attachmentVariants({ size, orientation }), className)}
        {...rest}
      />
    )
  },
)
AttachmentRoot.displayName = 'Attachment'

const attachmentMediaVariants = cva('aero-attachment-media', {
  variants: {
    variant: {
      icon: '',
      image: '',
    },
  },
  defaultVariants: {
    variant: 'icon',
  },
})

export interface AttachmentMediaProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof attachmentMediaVariants> {}

const AttachmentMedia = forwardRef<HTMLDivElement, AttachmentMediaProps>(
  ({ className, variant = 'icon', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="attachment-media"
        data-variant={variant}
        className={cn(
          attachmentMediaVariants({ variant }),
          'group-data-[size=sm]/attachment:w-8',
          className,
        )}
        {...rest}
      />
    )
  },
)
AttachmentMedia.displayName = 'Attachment.Media'

export type AttachmentContentProps = HTMLAttributes<HTMLDivElement>

const AttachmentContent = forwardRef<HTMLDivElement, AttachmentContentProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="attachment-content"
        className={cn('max-w-full min-w-0 flex-1 leading-tight', className)}
        {...rest}
      />
    )
  },
)
AttachmentContent.displayName = 'Attachment.Content'

export type AttachmentTitleProps = Omit<HTMLAttributes<HTMLElement>, 'color'>

const AttachmentTitle = forwardRef<HTMLElement, AttachmentTitleProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        as="span"
        variant="labelMedium"
        data-slot="attachment-title"
        className={cn('block max-w-full min-w-0 truncate', className)}
        {...rest}
      />
    )
  },
)
AttachmentTitle.displayName = 'Attachment.Title'

export type AttachmentDescriptionProps = Omit<HTMLAttributes<HTMLElement>, 'color'>

const AttachmentDescription = forwardRef<HTMLElement, AttachmentDescriptionProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Text
        ref={ref}
        as="span"
        variant="labelSmall"
        color="muted"
        data-slot="attachment-description"
        className={cn('mt-0.5 block min-w-0 truncate', className)}
        {...rest}
      />
    )
  },
)
AttachmentDescription.displayName = 'Attachment.Description'

export type AttachmentActionsProps = HTMLAttributes<HTMLDivElement>

const AttachmentActions = forwardRef<HTMLDivElement, AttachmentActionsProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="attachment-actions"
        className={cn('relative z-20 flex shrink-0 items-center', className)}
        {...rest}
      />
    )
  },
)
AttachmentActions.displayName = 'Attachment.Actions'

export type AttachmentActionProps = IconButtonProps

const AttachmentAction = forwardRef<HTMLButtonElement, AttachmentActionProps>(
  ({ className, variant = 'secondary', size = 'sm', ...rest }, ref) => {
    return (
      <IconButton
        ref={ref}
        data-slot="attachment-action"
        variant={variant}
        size={size}
        className={className}
        {...rest}
      />
    )
  },
)
AttachmentAction.displayName = 'Attachment.Action'

export type AttachmentGroupProps = HTMLAttributes<HTMLDivElement>

const AttachmentGroup = forwardRef<HTMLDivElement, AttachmentGroupProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="attachment-group"
        className={cn(
          'flex min-w-0 gap-3 overflow-x-auto overscroll-x-contain py-1',
          className,
        )}
        {...rest}
      />
    )
  },
)
AttachmentGroup.displayName = 'Attachment.Group'

export const Attachment = Object.assign(AttachmentRoot, {
  Media: AttachmentMedia,
  Content: AttachmentContent,
  Title: AttachmentTitle,
  Description: AttachmentDescription,
  Actions: AttachmentActions,
  Action: AttachmentAction,
  Group: AttachmentGroup,
})
