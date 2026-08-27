import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { CloseIcon, InfoIcon, WarningIcon, CheckIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { Text } from '../Text'

const alertVariants = cva('aero-alert', {
  variants: {
    variant: {
      info: 'aero-alert-info',
      success: 'aero-alert-success',
      warning: 'aero-alert-warning',
      danger: 'aero-alert-danger',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

export type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /**
   * Tone of the message. `danger` renders as an assertive live region
   * (`role="alert"`); the rest are polite (`role="status"`).
   * @default info
   */
  variant?: AlertVariant
  /** Bold lead line above the body. */
  title?: ReactNode
  /** When provided, a dismiss button is shown that calls this on click. */
  onDismiss?: () => void
  /**
   * Accessible name for the dismiss button.
   * @default Dismiss
   */
  dismissLabel?: string
}

function defaultIcon(variant: AlertVariant) {
  if (variant === 'success') return <CheckIcon size={18} />
  if (variant === 'warning' || variant === 'danger') return <WarningIcon size={18} />
  return <InfoIcon size={18} />
}

/**
 * A persistent inline message — a banner that stays on the page, as opposed
 * to a `Toast` that appears and leaves. Carries a status icon for its
 * `variant`, an optional `title`, body `children`, and an optional dismiss
 * button. It announces itself to assistive tech (politely, or assertively
 * for `danger`).
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, onDismiss, dismissLabel = 'Dismiss', className, children, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        // `danger` interrupts (assertive); `warning`/`info`/`success` are
        // polite. Pass `role` yourself to override for a specific case.
        role={variant === 'danger' ? 'alert' : 'status'}
        className={cn(alertVariants({ variant }), className)}
        {...rest}
      >
        <span className="mt-0.5 inline-flex shrink-0" aria-hidden>
          {defaultIcon(variant ?? 'info')}
        </span>
        <div className="min-w-0 flex-1">
          {title ? (
            <Text as="div" variant="labelLarge" className="mb-1">
              {title}
            </Text>
          ) : null}
          {children ? (
            <Text as="div" variant="bodySmall">
              {children}
            </Text>
          ) : null}
        </div>
        {onDismiss ? (
          <IconButton
            type="button"
            variant="ghost"
            size="sm"
            icon={<CloseIcon />}
            aria-label={dismissLabel}
            onClick={onDismiss}
            className="-mr-1 self-start"
          />
        ) : null}
      </div>
    )
  },
)

Alert.displayName = 'Alert'
