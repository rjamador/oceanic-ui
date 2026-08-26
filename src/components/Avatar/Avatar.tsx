import { forwardRef, useState, type HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/cn'

import { UserIcon } from '../Icon'

const avatarVariants = cva(
  'relative inline-flex flex-none items-center justify-center overflow-hidden rounded-full border border-[var(--hairline)] bg-[var(--control-secondary-mid)] text-[var(--text-muted)]',
  {
    variants: {
      size: {
        sm: 'size-6 text-xs',
        md: 'size-8 text-sm',
        lg: 'size-10 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>

const FALLBACK_ICON_SIZE: Record<AvatarSize, number> = { sm: 14, md: 18, lg: 22 }

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  src?: string
  /** The person/entity this avatar represents — sets the accessible name.
   *  Omit for a purely decorative avatar (e.g. next to a name already
   *  shown as text). */
  name?: string
  size?: AvatarSize
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name, size = 'md', className, ...rest }, ref) => {
    const [errored, setErrored] = useState(false)
    const showImage = Boolean(src) && !errored

    return (
      <span
        ref={ref}
        role={name ? 'img' : undefined}
        aria-label={name}
        className={cn(avatarVariants({ size }), className)}
        {...rest}
      >
        <span aria-hidden="true" style={{ display: 'contents' }}>
          {showImage ? (
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              onError={() => setErrored(true)}
            />
          ) : name ? (
            getInitials(name)
          ) : (
            <UserIcon size={FALLBACK_ICON_SIZE[size]} />
          )}
        </span>
      </span>
    )
  },
)

Avatar.displayName = 'Avatar'
