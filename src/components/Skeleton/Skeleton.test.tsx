import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('is hidden from the accessibility tree', () => {
    const { container } = render(<Skeleton data-testid="skeleton" />)

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies custom width/height', () => {
    const { container } = render(<Skeleton width={120} height={16} />)

    const el = container.firstChild as HTMLElement
    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('16px')
  })
})
