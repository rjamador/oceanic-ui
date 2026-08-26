import { forwardRef, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const textVariants = cva('m-0 font-[family-name:var(--font-body)]', {
  variants: {
    variant: {
      displayLarge:
        'font-[family-name:var(--font-display)] text-[length:var(--type-display-lg)] font-bold leading-[1.15] tracking-[-0.02em]',
      displayMedium:
        'font-[family-name:var(--font-display)] text-[length:var(--type-display-md)] font-bold leading-[1.15] tracking-[-0.02em]',
      displaySmall:
        'font-[family-name:var(--font-display)] text-[length:var(--type-display-sm)] font-semibold leading-[1.15] tracking-[-0.01em]',
      headingLarge:
        'font-[family-name:var(--font-display)] text-[length:var(--type-heading-lg)] font-semibold leading-[1.15]',
      headingMedium:
        'font-[family-name:var(--font-display)] text-[length:var(--type-heading-md)] font-semibold leading-[1.15]',
      headingSmall:
        'font-[family-name:var(--font-display)] text-[length:var(--type-heading-sm)] font-semibold leading-[1.15]',
      bodyLarge: 'text-[length:var(--type-body-lg)] font-normal leading-normal',
      bodyMedium: 'text-[length:var(--type-body-md)] font-normal leading-normal',
      bodySmall: 'text-[length:var(--type-body-sm)] font-normal leading-normal',
      labelLarge: 'text-[length:var(--type-label-lg)] font-medium leading-[1.15]',
      labelMedium: 'text-[length:var(--type-label-md)] font-medium leading-[1.15]',
      labelSmall: 'text-[length:var(--type-label-sm)] font-medium leading-[1.15]',
    },
    color: {
      default: 'text-[color:var(--text)]',
      muted: 'text-[color:var(--text-muted)]',
      accent: 'text-[color:var(--sky-700)]',
      danger: 'text-[color:var(--danger)]',
    },
  },
  defaultVariants: {
    variant: 'bodyMedium',
    color: 'default',
  },
})

export type TextVariant = NonNullable<VariantProps<typeof textVariants>['variant']>
export type TextColor = NonNullable<VariantProps<typeof textVariants>['color']>

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
        className={cn(textVariants({ variant, color }), className)}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'
