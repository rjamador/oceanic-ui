import {
  forwardRef,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { Attachment } from '../Attachment'
import {
  ArrowUpIcon,
  CloseIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PlusIcon,
  SquareIcon,
} from '../Icon'
import { IconButton } from '../IconButton'
import { IconSwap } from '../IconSwap'
import { Menu } from '../Menu'

export type ComposerAttachmentKind = 'file' | 'image' | 'pdf'
export type ComposerAttachmentStatus = 'idle' | 'uploading' | 'processing' | 'error' | 'done'

export interface ComposerAttachmentItem {
  id: string
  name: string
  detail?: string
  kind?: ComposerAttachmentKind
  previewUrl?: string | null
  status?: ComposerAttachmentStatus
}

export interface ComposerCommand {
  name: string
  description?: string
}

export interface ComposerAddMenuItem {
  label: string
  icon?: ReactNode
  onSelect: () => void
}

export interface ComposerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSubmit'> {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  sending?: boolean
  placeholder?: string
  disabled?: boolean
  attachments?: ComposerAttachmentItem[]
  onRemoveAttachment?: (id: string) => void
  onAttachFiles?: () => void
  onPasteImages?: (files: File[]) => void
  commands?: ComposerCommand[]
  addMenu?: ComposerAddMenuItem[]
  /** Slot rendered above the input frame — e.g. a consumer-owned queued-message list. */
  above?: ReactNode
  /** Slot at the start of the toolbar row, after the add-context menu. */
  leading?: ReactNode
  /** Slot rendered below the frame — e.g. a model badge / keyboard hint. */
  footer?: ReactNode
  /** Accessible name for the textarea and the surrounding group. */
  inputLabel?: string
  addContextLabel?: string
  sendLabel?: string
  stopLabel?: string
  /** Announced politely to assistive tech while `sending` is true. */
  busyLabel?: string
  uploadFilesLabel?: string
  commandsLabel?: string
}

/**
 * Presentational chat input: a growing textarea, an attachment strip, an
 * optional slash-command palette, and a send/stop control. Fully controlled
 * (`value` / `onChange` / `onSubmit`). Anything stateful a specific host
 * needs around it — a queued-message list, a "compacting" lock — is the
 * consumer's job; render it through `above` / `footer`.
 *
 * The forwarded ref points at the textarea (the element a host wants to
 * focus after a send); `...rest` spreads onto the outer wrapper `<div>`.
 */
export const Composer = forwardRef<HTMLTextAreaElement, ComposerProps>(function Composer(
  {
    value,
    onChange,
    onSubmit,
    onStop,
    sending = false,
    placeholder = 'Write a message…',
    disabled = false,
    attachments = [],
    onRemoveAttachment,
    onAttachFiles,
    onPasteImages,
    commands = [],
    addMenu,
    above,
    leading,
    footer,
    className,
    inputLabel = 'Message',
    addContextLabel = 'Add context',
    sendLabel = 'Send',
    stopLabel = 'Stop',
    busyLabel = 'Sending…',
    uploadFilesLabel = 'Upload files',
    commandsLabel = 'Commands',
    ...rest
  },
  forwardedRef,
) {
  const innerRef = useRef<HTMLTextAreaElement | null>(null)
  const setRef = useCallback(
    (node: HTMLTextAreaElement | null) => {
      innerRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    },
    [forwardedRef],
  )

  const inputId = useId()
  const listboxId = useId()
  const optionId = (index: number) => `${listboxId}-opt-${index}`

  const [palette, setPalette] = useState({ token: '', index: 0, dismissed: false })

  const typedCommand = /^\/([a-z0-9-_]*)$/i.exec(value.trimStart())?.[1]
  const commandsDismissed =
    typedCommand !== undefined && palette.token === typedCommand && palette.dismissed
  const rawIndex = palette.token === (typedCommand ?? '') ? palette.index : 0

  const commandMatches = useMemo(() => {
    if (typedCommand === undefined || commandsDismissed) return []
    const query = typedCommand.toLowerCase()
    return commands.filter((command) => command.name.toLowerCase().startsWith(query))
  }, [typedCommand, commandsDismissed, commands])

  const showPalette = commandMatches.length > 0
  const commandIndex = Math.max(0, Math.min(rawIndex, commandMatches.length - 1))

  useLayoutEffect(() => {
    const el = innerRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }, [value])

  const hasOkAttachment = attachments.some(
    (item) =>
      (item.status ?? 'done') !== 'error' && (Boolean(item.previewUrl) || Boolean(item.name)),
  )
  const canSend = !disabled && (value.trim().length > 0 || hasOkAttachment)

  function applyCommand(name: string) {
    onChange(`/${name} `)
    setPalette({ token: typedCommand ?? '', index: 0, dismissed: true })
    innerRef.current?.focus()
  }

  const resolvedAddMenu: ComposerAddMenuItem[] =
    addMenu ??
    (onAttachFiles
      ? [{ label: uploadFilesLabel, icon: <FileIcon size={16} />, onSelect: onAttachFiles }]
      : [])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (showPalette) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        const step = event.key === 'ArrowDown' ? 1 : -1
        setPalette({
          token: typedCommand ?? '',
          index: (commandIndex + step + commandMatches.length) % commandMatches.length,
          dismissed: false,
        })
        return
      }
      if (event.key === 'Tab' || (event.key === 'Enter' && !event.shiftKey)) {
        event.preventDefault()
        applyCommand(commandMatches[commandIndex].name)
        return
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        setPalette({ token: typedCommand ?? '', index: commandIndex, dismissed: true })
        return
      }
    }
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (canSend) onSubmit()
    }
  }

  return (
    <div className={cn('flex w-full flex-col', className)} {...rest}>
      {above}

      <div
        className="aero-composer-frame"
        role="group"
        aria-label={inputLabel}
        aria-busy={sending || undefined}
      >
        <span role="status" aria-live="polite" className="sr-only">
          {sending ? busyLabel : ''}
        </span>

        {attachments.length > 0 ? (
          <Attachment.Group className="px-3 pt-3">
            {attachments.map((item) => (
              <Attachment key={item.id} size="sm" state={item.status ?? 'done'}>
                <Attachment.Media variant={item.previewUrl ? 'image' : 'icon'}>
                  {item.previewUrl ? (
                    <img src={item.previewUrl} alt="" />
                  ) : item.kind === 'pdf' ? (
                    <FileTextIcon size={16} />
                  ) : item.kind === 'image' ? (
                    <ImageIcon size={16} />
                  ) : (
                    <FileIcon size={16} />
                  )}
                </Attachment.Media>
                <Attachment.Content>
                  <Attachment.Title>{item.name}</Attachment.Title>
                  {item.detail ? (
                    <Attachment.Description>{item.detail}</Attachment.Description>
                  ) : null}
                </Attachment.Content>
                {onRemoveAttachment ? (
                  <Attachment.Actions>
                    <Attachment.Action
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      icon={<CloseIcon />}
                      onClick={() => onRemoveAttachment(item.id)}
                    />
                  </Attachment.Actions>
                ) : null}
              </Attachment>
            ))}
          </Attachment.Group>
        ) : null}

        {showPalette ? (
          <div
            id={listboxId}
            className="aero-popover-panel relative mx-2 mt-2 w-auto min-w-0"
            role="listbox"
            aria-label={commandsLabel}
          >
            {commandMatches.map((command, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- listbox options in an aria-activedescendant combobox are managed from the textarea, not individually focusable; the click handler is a pointer convenience on top of the textarea's arrow/Enter keyboard handling.
              <div
                key={command.name}
                id={optionId(index)}
                role="option"
                aria-selected={index === commandIndex}
                data-active={index === commandIndex}
                className="aero-composer-command"
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() =>
                  setPalette({ token: typedCommand ?? '', index, dismissed: false })
                }
                onClick={() => applyCommand(command.name)}
              >
                <span className="shrink-0 [font-family:var(--font-mono)] text-xs text-[color:var(--text)]">
                  /{command.name}
                </span>
                {command.description ? (
                  <span className="min-w-0 flex-1 truncate text-[11px] text-[color:var(--text-muted)]">
                    {command.description}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        <textarea
          ref={setRef}
          id={inputId}
          rows={1}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          aria-label={inputLabel}
          role={showPalette ? 'combobox' : undefined}
          aria-expanded={showPalette || undefined}
          aria-controls={showPalette ? listboxId : undefined}
          aria-activedescendant={showPalette ? optionId(commandIndex) : undefined}
          aria-autocomplete={showPalette ? 'list' : undefined}
          className="aero-composer-input px-4 pt-3.5 pb-2"
          onChange={(event) => onChange(event.target.value)}
          onPaste={(event) => {
            const items = Array.from(event.clipboardData?.items ?? [])
            const imageFiles = items
              .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
              .map((item) => item.getAsFile())
              .filter((file): file is File => Boolean(file))
            if (imageFiles.length === 0) return
            event.preventDefault()
            onPasteImages?.(imageFiles)
          }}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center justify-between gap-2 px-2.5 pb-2.5">
          <div className="relative z-20 flex min-w-0 items-center gap-1 overflow-visible">
            {resolvedAddMenu.length > 0 ? (
              <Menu>
                <Menu.Trigger>
                  <IconButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    aria-label={addContextLabel}
                    icon={<PlusIcon />}
                  />
                </Menu.Trigger>
                <Menu.Content side="top" align="start">
                  {resolvedAddMenu.map((item) => (
                    <Menu.Item key={item.label} onSelect={item.onSelect}>
                      {item.icon}
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu>
            ) : null}
            {leading}
          </div>
          <IconButton
            type="button"
            variant="primary"
            size="sm"
            disabled={!sending && !canSend}
            aria-label={sending ? stopLabel : sendLabel}
            icon={
              <IconSwap
                className="size-3.5"
                active={sending}
                initial={<ArrowUpIcon size={14} />}
                swapped={<SquareIcon size={14} />}
              />
            }
            onClick={() => {
              if (sending) {
                onStop?.()
                return
              }
              if (canSend) onSubmit()
            }}
          />
        </div>
      </div>

      {footer ? (
        <div className="mt-2 flex items-center justify-between gap-2 px-1 [font-family:var(--font-body)] text-[length:var(--type-label-md)] text-[color:var(--text)]">
          {footer}
        </div>
      ) : null}
    </div>
  )
})

Composer.displayName = 'Composer'
