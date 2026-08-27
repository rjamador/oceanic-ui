/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (ToolCall.Group), which by convention (see "Compound
   components" in docs/creating-components.md) lives in one file per
   component folder. */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { ChevronRightIcon, CloseIcon, FileTextIcon, WarningIcon } from '../Icon'
import { Pulse } from '../Pulse'
import { Text } from '../Text'

const DEFAULT_LABELS: Record<string, string> = {
  bash: 'Run',
  edit_file: 'Edit',
  glob: 'Find',
  grep: 'Search',
  list_dir: 'List',
  read_file: 'Read',
  web_search: 'Search web',
  write_file: 'Write',
}

export type ToolCallStatus = 'idle' | 'running' | 'complete' | 'error' | 'pending'

const toolCallVariants = cva('aero-tool-call', {
  variants: {
    status: {
      idle: '',
      running: '',
      complete: '',
      error: 'aero-tool-call-error',
      pending: '',
    },
  },
  defaultVariants: {
    status: 'complete',
  },
})

export interface ToolCallProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof toolCallVariants> {
  /**
   * Tool identifier. Used to pick a default verb (`read_file` → "Read")
   * when `label` is omitted.
   */
  name?: string
  /** Visible verb. Falls back to a title-cased `name`. */
  label?: string
  /** Path, command, or other target — the recessed mono chip. */
  target?: string
  /**
   * Lifecycle. `pending` renders the approval strip; `running` swaps the
   * leading icon for a Pulse; `error` tints the row.
   * @default complete
   */
  status?: ToolCallStatus
  /** Leading glyph. Ignored while `status="running"` (Pulse takes its place). */
  icon?: ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /**
   * When set, clicking the row calls this instead of expanding — e.g. to
   * open a full diff.
   */
  onActivate?: () => void
  /** Extra copy shown at the end of a pending row. @default Awaiting approval */
  pendingLabel?: string
  /** Action slot for a pending row (Deny / Allow). */
  actions?: ReactNode
  /** Expandable detail (summary, preview). */
  children?: ReactNode
}

function defaultLabel(name: string | undefined, fallback: string): string {
  if (!name) return fallback
  return DEFAULT_LABELS[name] ?? name.replaceAll('_', ' ')
}

/**
 * Compact tool row — quiet chrome, expands for detail. Zest's tool-call
 * row, restyled as Ocean: recessed target chip, glow on focus, danger
 * tint on failure. Approval decisions stay with the consumer (`actions`).
 */
const ToolCallRoot = forwardRef<HTMLDivElement, ToolCallProps>(
  (
    {
      name,
      label,
      target,
      status = 'complete',
      icon,
      open,
      defaultOpen = false,
      onOpenChange,
      onActivate,
      pendingLabel = 'Awaiting approval',
      actions,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const verb = label ?? defaultLabel(name, 'Tool')
    const hasBody = children != null && children !== false
    const expandable = hasBody && !onActivate
    const clickable = Boolean(onActivate) || expandable

    if (status === 'pending') {
      return (
        <div
          ref={ref}
          data-slot="tool-call"
          data-status={status}
          role="status"
          className={cn('aero-tool-call-pending', className)}
          {...rest}
        >
          <span className="inline-flex size-5 shrink-0 items-center justify-center text-[var(--sky-700)]">
            {icon ?? <FileTextIcon size={14} />}
          </span>
          <span className="aero-tool-call-target" title={target}>
            {target ?? verb}
          </span>
          <Text as="span" variant="labelSmall" color="muted" className="shrink-0">
            {pendingLabel}
          </Text>
          {actions}
        </div>
      )
    }

    const leading =
      status === 'running' ? (
        <Pulse size="xs" active aria-hidden />
      ) : status === 'error' ? (
        <CloseIcon size={14} className="text-[var(--danger)]" />
      ) : (
        (icon ?? <FileTextIcon size={14} />)
      )

    return (
      <div
        ref={ref}
        data-slot="tool-call"
        data-status={status}
        className={cn(toolCallVariants({ status }), className)}
        {...rest}
      >
        <button
          type="button"
          className="aero-tool-call-row"
          disabled={!clickable}
          aria-expanded={expandable ? expanded : undefined}
          onClick={() => {
            if (onActivate) {
              onActivate()
              return
            }
            if (expandable) setExpanded(!expanded)
          }}
        >
          <span className="relative inline-flex size-4 shrink-0 items-center justify-center text-[var(--text-muted)]">
            {leading}
          </span>
          <Text as="span" variant="labelMedium" className="shrink-0">
            {verb}
          </Text>
          {target ? (
            <span className="aero-tool-call-target" title={target}>
              {target}
            </span>
          ) : (
            <span className="min-w-0 flex-1" />
          )}
          {expandable ? (
            <span
              className={cn(
                'inline-flex shrink-0 text-[var(--text-muted)] transition-transform duration-150',
                expanded && 'rotate-90',
              )}
              aria-hidden="true"
            >
              <ChevronRightIcon size={12} />
            </span>
          ) : null}
        </button>
        {expanded && hasBody ? (
          <div
            data-slot="tool-call-detail"
            className="mt-0.5 mb-1 ml-2 border-l border-[var(--control-secondary-border)] py-0.5 pl-3.5 pr-2"
          >
            {typeof children === 'string' ? (
              <pre className="m-0 max-h-48 overflow-auto [font-family:var(--font-mono)] text-[length:var(--text-xs)] leading-relaxed text-[var(--text-muted)] whitespace-pre-wrap">
                {children}
              </pre>
            ) : (
              children
            )}
          </div>
        ) : null}
      </div>
    )
  },
)
ToolCallRoot.displayName = 'ToolCall'

export interface ToolCallGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Collapsed-row copy, e.g. "Inspected 4 files". */
  label: string
  added?: number
  removed?: number
  errors?: number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const ToolCallGroup = forwardRef<HTMLDivElement, ToolCallGroupProps>(
  (
    {
      label,
      added = 0,
      removed = 0,
      errors = 0,
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const hasChanges = added > 0 || removed > 0

    return (
      <div
        ref={ref}
        data-slot="tool-call-group"
        className={cn('flex w-full min-w-0 flex-col gap-0.5', className)}
        {...rest}
      >
        <button
          type="button"
          aria-expanded={expanded}
          aria-label={label}
          className="aero-tool-call-row w-fit max-w-full"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="inline-flex size-4 shrink-0 items-center justify-center">
            {errors > 0 && !hasChanges ? (
              <CloseIcon size={12} className="text-[var(--danger)]" />
            ) : errors > 0 ? (
              <WarningIcon size={12} className="text-[var(--sky-700)]" />
            ) : (
              <span
                className={cn(
                  'inline-flex text-[var(--text-muted)] transition-transform duration-150',
                  expanded && 'rotate-90',
                )}
                aria-hidden="true"
              >
                <ChevronRightIcon size={12} />
              </span>
            )}
          </span>
          <Text as="span" variant="labelMedium" color="muted" className="min-w-0 truncate">
            {label}
          </Text>
          {added > 0 ? (
            <span className="shrink-0 [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--sky-700)]">
              +{added}
            </span>
          ) : null}
          {removed > 0 ? (
            <span className="shrink-0 [font-family:var(--font-mono)] text-[length:var(--text-xs)] text-[var(--danger)]">
              -{removed}
            </span>
          ) : null}
          {errors > 0 ? (
            <Text as="span" variant="labelSmall" color="danger" className="shrink-0">
              {errors} failed
            </Text>
          ) : null}
        </button>
        {expanded ? children : null}
      </div>
    )
  },
)
ToolCallGroup.displayName = 'ToolCall.Group'

export const ToolCall = Object.assign(ToolCallRoot, { Group: ToolCallGroup })
