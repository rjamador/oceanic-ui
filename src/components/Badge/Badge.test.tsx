import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('spreads extra props onto the root element', () => {
    render(<Badge data-testid="badge">3</Badge>)

    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<Badge className="bg-red-500">New</Badge>)

    const badge = screen.getByText('New')
    expect(badge.className).toContain('bg-red-500')
    expect(badge.className).not.toContain('bg-[var(--control-secondary-mid)]')
  })
})
