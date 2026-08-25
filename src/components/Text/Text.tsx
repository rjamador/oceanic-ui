import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import styles from './Text.module.css'

export type TextVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headingLarge'
  | 'headingMedium'
  | 'headingSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'

export type TextColor = 'default' | 'muted' | 'accent' | 'danger'

/** Elements a Text variant is allowed to render as — kept to a fixed set
 *  rather than full polymorphic typing (any ElementType), which balloons
 *  ref-forwarding complexity for a text component that only ever needs
 *  headings, paragraphs, spans, and labels. */
export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'div'

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant
  color?: TextColor
  /** Overrides the variant's default element — style and semantics are
   *  independent (e.g. a card title styled `headingSmall` that should not
   *  be an actual heading for the surrounding document outline). */
  as?: TextAs
  /** Only meaningful when `as="label"` — `HTMLAttributes` doesn't include
   *  it since it's `LabelHTMLAttributes`-specific. */
  htmlFor?: string
}

const DEFAULT_ELEMENT: Record<TextVariant, TextAs> = {
  displayLarge: 'h1',
  displayMedium: 'h1',
  displaySmall: 'h2',
  headingLarge: 'h2',
  headingMedium: 'h3',
  headingSmall: 'h4',
  bodyLarge: 'p',
  bodyMedium: 'p',
  bodySmall: 'p',
  labelLarge: 'span',
  labelMedium: 'span',
  labelSmall: 'span',
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ variant = 'bodyMedium', color = 'default', as, className, children, ...rest }, ref) => {
    const Component = as ?? DEFAULT_ELEMENT[variant]

    return (
      <Component
        ref={ref as never}
        className={cn(styles.text, styles[variant], styles[color], className)}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'
