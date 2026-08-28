import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { ChevronRightIcon } from '../Icon'
import { Pulse } from '../Pulse'
import { Text } from '../Text'

export interface ThinkingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The turn is still producing reasoning. The trace stays open and the
   * header is a live status line, not a toggle.
   * @default false
   */
  streaming?: boolean
  /**
   * Seconds spent thinking, shown once streaming stops. Omit (or pass
   * `null`) for a bare "Thought" label.
   */
  duration?: number | null
  /** Header copy while streaming. @default Thinking… */
  label?: string
  open?: boolean
  /**
   * Uncontrolled initial open state. Ignored while `streaming`.
   * @default false
   */
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Reasoning trace. Hidden when collapsed and not streaming. */
  children?: ReactNode
}

function thoughtForLabel(seconds: number | null | undefined): string {
  if (seconds == null || seconds < 1) return 'Thought'
  return `Thought for ${seconds}s`
}

/**
 * A disclosure for a reasoning trace: a live "Thinking…" line while a turn
 * reasons, folding into "Thought for Ns" with the trace tucked behind it.
 */
export const Thinking = forwardRef<HTMLDivElement, ThinkingProps>(
  (
    {
      streaming = false,
      duration = null,
      label = 'Thinking…',
      open,
      defaultOpen = false,
      onOpenChange,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const [uncontrolledOpen, setOpen] = useControllableState({
      value: open,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    })
    const expanded = streaming || uncontrolledOpen
    const hasBody = children != null && children !== false
    const summary = thoughtForLabel(duration)
    const contentId = useId()

    // Announce the settled summary once, only on the streaming → done edge —
    // not on a mount that starts already settled.
    const [settledMessage, setSettledMessage] = useState('')
    const wasStreaming = useRef(streaming)
    useEffect(() => {
      if (wasStreaming.current && !streaming) setSettledMessage(summary)
      wasStreaming.current = streaming
    }, [streaming, summary])

    return (
      <div ref={ref} data-slot="thinking" className={cn('aero-thinking', className)} {...rest}>
        {streaming ? (
          <div
            className="inline-flex max-w-full items-center gap-2 border border-transparent p-1"
            role="status"
            aria-live="polite"
            aria-label={label}
          >
            <Pulse size="sm" active />
            <Text as="span" variant="labelMedium">
              {label}
            </Text>
          </div>
        ) : (
          <button
            type="button"
            className="aero-thinking-trigger"
            aria-expanded={hasBody ? expanded : undefined}
            aria-controls={hasBody && expanded ? contentId : undefined}
            disabled={!hasBody}
            onClick={() => {
              if (hasBody) setOpen(!uncontrolledOpen)
            }}
          >
            <Pulse size="sm" />
            <Text as="span" variant="labelMedium">
              {summary}
            </Text>
            {hasBody ? (
              <span
                className={cn(
                  'inline-flex text-[var(--text-muted)] transition-transform duration-150',
                  expanded && 'rotate-90',
                )}
                aria-hidden="true"
              >
                <ChevronRightIcon size={12} />
              </span>
            ) : null}
          </button>
        )}
        {expanded && hasBody ? (
          <div id={contentId} data-slot="thinking-content" className="aero-thinking-content">
            {children}
          </div>
        ) : null}
        <span className="sr-only" role="status" aria-live="polite">
          {settledMessage}
        </span>
      </div>
    )
  },
)

Thinking.displayName = 'Thinking'
