/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Bubble.Content/Reactions), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { createContext, forwardRef, useContext, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

const bubbleContentVariants = cva('aero-bubble-content', {
  variants: {
    variant: {
      user: 'aero-bubble-content-user',
      assistant: 'aero-bubble-content-assistant',
      outline: 'aero-bubble-content-outline',
      ghost: 'aero-bubble-content-ghost',
      danger: 'aero-bubble-content-danger',
    },
  },
  defaultVariants: {
    variant: 'assistant',
  },
})

export type BubbleVariant = NonNullable<VariantProps<typeof bubbleContentVariants>['variant']>
export type BubbleAlign = 'start' | 'end'

// The variant surface is styled on Bubble.Content itself (not via a
// descendant selector from the root) so a consumer's className on Content
// still wins through tailwind-merge.
const BubbleVariantContext = createContext<BubbleVariant>('assistant')

export type BubbleGroupProps = HTMLAttributes<HTMLDivElement>

const BubbleGroup = forwardRef<HTMLDivElement, BubbleGroupProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="bubble-group"
        className={cn('flex min-w-0 flex-col gap-2', className)}
        {...rest}
      />
    )
  },
)
BubbleGroup.displayName = 'Bubble.Group'

export interface BubbleProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BubbleVariant
  align?: BubbleAlign
}

const BubbleRoot = forwardRef<HTMLDivElement, BubbleProps>(
  ({ variant = 'assistant', align = 'start', className, ...rest }, ref) => {
    return (
      <BubbleVariantContext.Provider value={variant}>
        <div
          ref={ref}
          data-slot="bubble"
          data-variant={variant}
          data-align={align}
          className={cn(
            'group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 data-[align=end]:self-end',
            className,
          )}
          {...rest}
        />
      </BubbleVariantContext.Provider>
    )
  },
)
BubbleRoot.displayName = 'Bubble'

export type BubbleContentProps = HTMLAttributes<HTMLDivElement>

const BubbleContent = forwardRef<HTMLDivElement, BubbleContentProps>(
  ({ className, ...rest }, ref) => {
    const variant = useContext(BubbleVariantContext)
    return (
      <div
        ref={ref}
        data-slot="bubble-content"
        className={cn(
          bubbleContentVariants({ variant }),
          'group-data-[align=end]/bubble:self-end',
          className,
        )}
        {...rest}
      />
    )
  },
)
BubbleContent.displayName = 'Bubble.Content'

const bubbleReactionsVariants = cva(
  'absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-[var(--panel-surface-strong)] px-1.5 py-0.5 text-sm border border-[var(--hairline)]',
  {
    variants: {
      side: {
        top: 'top-0 -translate-y-3/4',
        bottom: 'bottom-0 translate-y-3/4',
      },
      align: {
        start: 'left-3',
        end: 'right-3',
      },
    },
    defaultVariants: {
      side: 'bottom',
      align: 'end',
    },
  },
)

export interface BubbleReactionsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleReactionsVariants> {}

const BubbleReactions = forwardRef<HTMLDivElement, BubbleReactionsProps>(
  ({ side = 'bottom', align = 'end', className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="bubble-reactions"
        data-align={align}
        data-side={side}
        className={cn(bubbleReactionsVariants({ side, align }), className)}
        {...rest}
      />
    )
  },
)
BubbleReactions.displayName = 'Bubble.Reactions'

export const Bubble = Object.assign(BubbleRoot, {
  Group: BubbleGroup,
  Content: BubbleContent,
  Reactions: BubbleReactions,
})
