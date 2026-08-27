import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { ChevronRightIcon } from '../Icon'
import { Pulse } from '../Pulse'
import { Text } from '../Text'

export interface ThinkingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * The turn is still producing reasoning. The trace stays open and the
   * header is not a toggle — it's the only sign of progress.
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
 * The thinking disclosure: a Pulse + shimmering-free "Thinking…" label
 * while a turn reasons, folding into "Thought for Ns" with the trace
 * behind it. Behaviour is Zest's; chrome is Ocean.
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

    return (
      <div ref={ref} data-slot="thinking" className={cn('aero-thinking', className)} {...rest}>
        {streaming ? (
          <div className="aero-thinking-trigger" role="status" aria-live="polite" aria-label={label}>
            <Pulse size="sm" active aria-hidden />
            <Text as="span" variant="labelMedium">
              {label}
            </Text>
          </div>
        ) : (
          <button
            type="button"
            className="aero-thinking-trigger"
            aria-expanded={expanded}
            aria-label={expanded ? 'Hide the reasoning' : 'Show the reasoning'}
            disabled={!hasBody}
            onClick={() => {
              if (hasBody) setOpen(!uncontrolledOpen)
            }}
          >
            <Pulse size="sm" aria-hidden />
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
          <div data-slot="thinking-content" className="aero-thinking-content">
            {children}
          </div>
        ) : null}
      </div>
    )
  },
)

Thinking.displayName = 'Thinking'
