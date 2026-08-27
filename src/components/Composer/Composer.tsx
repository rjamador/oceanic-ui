import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/cn'

import { Attachment } from '../Attachment'
import { Button } from '../Button'
import {
  ArrowUpIcon,
  CheckIcon,
  CloseIcon,
  FileIcon,
  FileTextIcon,
  ImageIcon,
  PencilIcon,
  PlusIcon,
  SquareIcon,
  TrashIcon,
} from '../Icon'
import { IconButton } from '../IconButton'
import { IconSwap } from '../IconSwap'
import { Menu } from '../Menu'
import { Text } from '../Text'

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

export interface ComposerQueuedMessage {
  id: string
  text: string
  attachments?: number
}

export interface ComposerAddMenuItem {
  label: string
  icon?: ReactNode
  onSelect: () => void
}

export interface ComposerProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onStop?: () => void
  sending?: boolean
  placeholder?: string
  disabled?: boolean
  compacting?: boolean
  attachments?: ComposerAttachmentItem[]
  onRemoveAttachment?: (id: string) => void
  onAttachFiles?: () => void
  onPasteImages?: (files: File[]) => void
  commands?: ComposerCommand[]
  queuedMessages?: ReadonlyArray<ComposerQueuedMessage>
  onUpdateQueuedMessage?: (id: string, text: string) => void
  onRemoveQueuedMessage?: (id: string) => void
  onResumeQueuedMessages?: () => void
  resumingQueuedMessages?: boolean
  addMenu?: ComposerAddMenuItem[]
  leading?: ReactNode
  footer?: ReactNode
  above?: ReactNode
  className?: string
  /** Accessible name for the textarea. */
  inputLabel?: string
  addContextLabel?: string
  sendLabel?: string
  stopLabel?: string
  queueLabel?: string
  uploadFilesLabel?: string
  commandsLabel?: string
}

export function Composer({
  value,
  onChange,
  onSubmit,
  onStop,
  sending = false,
  placeholder = 'Ask anything — / for commands, paste or attach files',
  disabled = false,
  compacting = false,
  attachments = [],
  onRemoveAttachment,
  onAttachFiles,
  onPasteImages,
  commands = [],
  queuedMessages = [],
  onUpdateQueuedMessage,
  onRemoveQueuedMessage,
  onResumeQueuedMessages,
  resumingQueuedMessages = false,
  addMenu,
  leading,
  footer,
  above,
  className,
  inputLabel = 'Message',
  addContextLabel = 'Add context',
  sendLabel = 'Send',
  stopLabel = 'Stop',
  queueLabel = 'Queued messages',
  uploadFilesLabel = 'Upload files',
  commandsLabel = 'Commands',
}: ComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const inputId = useId()
  const [palette, setPalette] = useState({ token: '', index: 0, dismissed: false })
  const [editingQueuedId, setEditingQueuedId] = useState<string | null>(null)
  const [editingQueuedText, setEditingQueuedText] = useState('')

  const typedCommand = /^\/([a-z0-9-_]*)$/i.exec(value.trimStart())?.[1]
  const commandsDismissed =
    typedCommand !== undefined && palette.token === typedCommand && palette.dismissed
  const commandIndex = palette.token === (typedCommand ?? '') ? palette.index : 0
  const commandMatches =
    typedCommand === undefined || commandsDismissed
      ? []
      : commands.filter((command) =>
          command.name.toLowerCase().startsWith(typedCommand.toLowerCase()),
        )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`
  }, [value])

  const hasOkAttachment = attachments.some(
    (item) =>
      (item.status ?? 'done') !== 'error' &&
      (Boolean(item.previewUrl) || Boolean(item.name)),
  )
  const canSend = !compacting && !disabled && (value.trim().length > 0 || hasOkAttachment)

  function applyCommand(name: string) {
    onChange(`/${name} `)
    setPalette({ token: typedCommand ?? '', index: 0, dismissed: true })
    ref.current?.focus()
  }

  function beginQueuedEdit(turn: ComposerQueuedMessage) {
    setEditingQueuedId(turn.id)
    setEditingQueuedText(turn.text)
  }

  function cancelQueuedEdit() {
    setEditingQueuedId(null)
    setEditingQueuedText('')
  }

  function saveQueuedEdit() {
    if (!editingQueuedId) return
    const current = queuedMessages.find((turn) => turn.id === editingQueuedId)
    if (!current) {
      cancelQueuedEdit()
      return
    }
    const text = editingQueuedText.trim()
    if (!text && !current.attachments) return
    onUpdateQueuedMessage?.(editingQueuedId, text)
    cancelQueuedEdit()
  }

  const resolvedAddMenu: ComposerAddMenuItem[] =
    addMenu ??
    (onAttachFiles
      ? [{ label: uploadFilesLabel, icon: <FileIcon size={16} />, onSelect: onAttachFiles }]
      : [])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (commandMatches.length > 0) {
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
    <div className={cn('flex w-full flex-col', className)}>
      {above}
      {queuedMessages.length > 0 ? (
          <div
          className="mb-2 rounded-[var(--radius-lg)] border border-[var(--control-secondary-border)] bg-[var(--recessed-surface)] p-2"
          aria-live="polite"
        >
          <div className="flex items-center justify-between gap-2 px-1 pb-1.5">
            <Text as="span" variant="labelSmall" color="muted" className="uppercase tracking-wide">
              {queueLabel}
            </Text>
            <div className="flex items-center gap-2">
              <Text as="span" variant="labelSmall" color="muted" className="tabular-nums">
                {queuedMessages.length}
              </Text>
              {onResumeQueuedMessages ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  disabled={sending || compacting || resumingQueuedMessages}
                  onClick={onResumeQueuedMessages}
                >
                  {resumingQueuedMessages ? 'Resuming…' : 'Resume queued'}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {queuedMessages.map((turn, index) => {
              const editing = editingQueuedId === turn.id
              return (
                <div
                  key={turn.id}
                  className="rounded-[var(--radius-md)] border border-[var(--control-secondary-border)] bg-[var(--control-secondary-top)] p-1.5"
                >
                  {editing ? (
                    <div className="flex items-end gap-1.5">
                      <textarea
                        rows={2}
                        value={editingQueuedText}
                        aria-label={`Edit queued message ${index + 1}`}
                        className="aero-composer-input min-h-10 flex-1 px-2 py-1.5"
                        onChange={(event) => setEditingQueuedText(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Escape') {
                            event.preventDefault()
                            cancelQueuedEdit()
                          } else if (
                            event.key === 'Enter' &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                          ) {
                            event.preventDefault()
                            saveQueuedEdit()
                          }
                        }}
                      />
                      <IconButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`Save queued message ${index + 1}`}
                        icon={<CheckIcon />}
                        onClick={saveQueuedEdit}
                      />
                      <IconButton
                        type="button"
                        variant="ghost"
                        size="sm"
                        aria-label={`Cancel editing queued message ${index + 1}`}
                        icon={<CloseIcon />}
                        onClick={cancelQueuedEdit}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <div
                        className="min-w-0 flex-1 truncate text-xs text-[color:var(--text)]"
                        title={turn.text || 'Attachment-only message'}
                      >
                        <span className="mr-1 text-[color:var(--text-muted)]">{index + 1}.</span>
                        {turn.text || 'Attachment-only message'}
                        {turn.attachments ? (
                          <span className="ml-1 text-[10px] text-[color:var(--text-muted)]">
                            · {turn.attachments} attachment{turn.attachments === 1 ? '' : 's'}
                          </span>
                        ) : null}
                      </div>
                      {onUpdateQueuedMessage ? (
                        <IconButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Edit queued message ${index + 1}`}
                          icon={<PencilIcon />}
                          onClick={() => beginQueuedEdit(turn)}
                        />
                      ) : null}
                      {onRemoveQueuedMessage ? (
                        <IconButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove queued message ${index + 1}`}
                          icon={<TrashIcon />}
                          onClick={() => onRemoveQueuedMessage(turn.id)}
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      <div
        className="aero-composer-frame"
        role="group"
        aria-label={inputLabel}
        aria-busy={sending || compacting || undefined}
      >
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

        {commandMatches.length > 0 ? (
          <div
            className="aero-popover-panel relative mx-2 mt-2 w-auto min-w-0"
            role="listbox"
            aria-label={commandsLabel}
          >
            {commandMatches.map((command, index) => (
              <button
                key={command.name}
                type="button"
                role="option"
                aria-selected={index === commandIndex}
                data-active={index === commandIndex}
                className="aero-composer-command"
                onMouseEnter={() =>
                  setPalette({ token: typedCommand ?? '', index, dismissed: false })
                }
                onClick={() => applyCommand(command.name)}
              >
                <span className="shrink-0 font-[family-name:var(--font-mono)] text-xs text-[color:var(--text)]">
                  /{command.name}
                </span>
                {command.description ? (
                  <span className="min-w-0 flex-1 truncate text-[11px] text-[color:var(--text-muted)]">
                    {command.description}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ) : null}

        <textarea
          ref={ref}
          id={inputId}
          rows={1}
          value={value}
          placeholder={placeholder}
          disabled={disabled || compacting}
          autoComplete="off"
          aria-label={inputLabel}
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
        <div className="mt-2 flex items-center justify-between gap-2 px-1 font-[family-name:var(--font-body)] text-[length:var(--type-label-md)] text-[color:var(--text)]">
          {footer}
        </div>
      ) : null}
    </div>
  )
}

Composer.displayName = 'Composer'
