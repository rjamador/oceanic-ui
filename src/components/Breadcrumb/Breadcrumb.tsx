/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (Breadcrumb.Item), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { ChevronRightIcon } from '../Icon'
import { Text } from '../Text'

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  label?: string
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, label = 'Breadcrumb', children, ...rest }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={label}
        className={cn('flex min-w-0 items-center', className)}
        {...rest}
      >
        <ol className="m-0 flex min-w-0 list-none items-center gap-1 overflow-x-auto p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </ol>
      </nav>
    )
  },
)
BreadcrumbRoot.displayName = 'Breadcrumb'

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  href?: string
  current?: boolean
}

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, href, current, children, ...rest }, ref) => {
    return (
      <li
        ref={ref}
        className={cn('flex shrink-0 items-center gap-1', className)}
        {...rest}
      >
        {href && !current ? (
          <a
            href={href}
            className="-my-1 inline-flex items-center py-1 text-sm whitespace-nowrap text-[color:var(--sky-700)] underline-offset-2 hover:underline"
          >
            {children}
          </a>
        ) : (
          <Text
            as="span"
            variant="labelMedium"
            color={current ? 'default' : 'muted'}
            aria-current={current ? 'page' : undefined}
            className="whitespace-nowrap"
          >
            {children}
          </Text>
        )}
        {!current ? (
          <ChevronRightIcon size={14} className="text-[color:var(--text-muted)]" />
        ) : null}
      </li>
    )
  },
)
BreadcrumbItem.displayName = 'Breadcrumb.Item'

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
})
