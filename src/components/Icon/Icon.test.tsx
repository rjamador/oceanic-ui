import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CheckIcon, Icon } from './index'

describe('Icon', () => {
  it('is hidden from the accessibility tree by default', () => {
    const { container } = render(<Icon data-testid="icon" />)

    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('becomes an accessible image when given an aria-label', () => {
    render(<Icon aria-label="Loading" data-testid="icon" />)

    expect(screen.getByRole('img', { name: 'Loading' })).toBeInTheDocument()
  })

  it('applies a custom size', () => {
    const { container } = render(<Icon size={32} />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('width', '32')
    expect(svg).toHaveAttribute('height', '32')
  })

  it('lets a pre-built icon override its default strokeWidth', () => {
    const { container } = render(<CheckIcon strokeWidth={1} />)

    expect(container.querySelector('svg')).toHaveAttribute('stroke-width', '1')
  })
})
