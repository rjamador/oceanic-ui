/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Message.Avatar/Content/…), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

export type MessageAlign = 'start' | 'end'

export type MessageGroupProps = HTMLAttributes<HTMLDivElement>

const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message-group"
        className={cn('flex min-w-0 flex-col gap-2', className)}
        {...rest}
      />
    )
  },
)
MessageGroup.displayName = 'Message.Group'

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  align?: MessageAlign
}

const MessageRoot = forwardRef<HTMLDivElement, MessageProps>(
  ({ className, align = 'start', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message"
        data-align={align}
        className={cn(
          'group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse',
          className,
        )}
        {...rest}
      />
    )
  },
)
MessageRoot.displayName = 'Message'

export type MessageAvatarProps = HTMLAttributes<HTMLDivElement>

const MessageAvatar = forwardRef<HTMLDivElement, MessageAvatarProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message-avatar"
        className={cn(
          'flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-[var(--recessed-surface)]',
          className,
        )}
        {...rest}
      />
    )
  },
)
MessageAvatar.displayName = 'Message.Avatar'

export type MessageContentProps = HTMLAttributes<HTMLDivElement>

const MessageContent = forwardRef<HTMLDivElement, MessageContentProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message-content"
        className={cn(
          'flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:self-end',
          className,
        )}
        {...rest}
      />
    )
  },
)
MessageContent.displayName = 'Message.Content'

export type MessageHeaderProps = HTMLAttributes<HTMLDivElement>

const MessageHeader = forwardRef<HTMLDivElement, MessageHeaderProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message-header"
        className={cn(
          'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-[color:var(--text)]',
          className,
        )}
        {...rest}
      />
    )
  },
)
MessageHeader.displayName = 'Message.Header'

export type MessageFooterProps = HTMLAttributes<HTMLDivElement>

const MessageFooter = forwardRef<HTMLDivElement, MessageFooterProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="message-footer"
        className={cn(
          'flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-[color:var(--text-muted)] group-data-[align=end]/message:justify-end',
          className,
        )}
        {...rest}
      />
    )
  },
)
MessageFooter.displayName = 'Message.Footer'

export const Message = Object.assign(MessageRoot, {
  Group: MessageGroup,
  Avatar: MessageAvatar,
  Content: MessageContent,
  Header: MessageHeader,
  Footer: MessageFooter,
})
