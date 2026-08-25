import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { ChevronLeftIcon, ChevronRightIcon } from '../Icon'
import { IconButton } from '../IconButton'
import styles from './Pagination.module.css'

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** 1-indexed current page. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** How many page numbers to show on each side of the current page. */
  siblingCount?: number
}

function getPageItems(page: number, pageCount: number, siblingCount: number): (number | 'ellipsis')[] {
  // first + last + current + 2 siblings each side + room for both ellipses —
  // below this, showing every page is cheaper than truncating.
  const totalVisible = siblingCount * 2 + 5
  if (pageCount <= totalVisible) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(page - siblingCount, 1)
  const rightSibling = Math.min(page + siblingCount, pageCount)
  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < pageCount - 1

  const items: (number | 'ellipsis')[] = [1]

  if (showLeftEllipsis) {
    items.push('ellipsis')
  } else {
    for (let i = 2; i < leftSibling; i++) items.push(i)
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== pageCount) items.push(i)
  }

  if (showRightEllipsis) {
    items.push('ellipsis')
  } else {
    for (let i = rightSibling + 1; i < pageCount; i++) items.push(i)
  }

  items.push(pageCount)
  return items
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, pageCount, onPageChange, siblingCount = 1, className, ...rest }, ref) => {
    const items = getPageItems(page, pageCount, siblingCount)

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(styles.root, className)} {...rest}>
        <IconButton
          variant="ghost"
          size="sm"
          icon={<ChevronLeftIcon />}
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? 'page' : undefined}
              className={cn(styles.page, item === page && styles.pageSelected)}
              onClick={() => onPageChange(item)}
            >
              {item}
            </button>
          ),
        )}
        <IconButton
          variant="ghost"
          size="sm"
          icon={<ChevronRightIcon />}
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </nav>
    )
  },
)

Pagination.displayName = 'Pagination'
