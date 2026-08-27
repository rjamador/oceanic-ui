import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ArrowUpIcon, SquareIcon } from '../Icon'
import { IconSwap } from './IconSwap'

describe('IconSwap', () => {
  it('keeps both icons mounted so a swap never unmounts focus', () => {
    const { container, rerender } = render(
      <IconSwap active={false} initial={<ArrowUpIcon />} swapped={<SquareIcon />} />,
    )

    expect(container.querySelectorAll('svg')).toHaveLength(2)

    rerender(<IconSwap active initial={<ArrowUpIcon />} swapped={<SquareIcon />} />)
    expect(container.querySelectorAll('svg')).toHaveLength(2)
  })
})
