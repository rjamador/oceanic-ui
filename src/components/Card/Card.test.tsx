import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './Card'

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <p>Glass panel</p>
      </Card>,
    )

    expect(screen.getByText('Glass panel')).toBeInTheDocument()
  })

  it('spreads extra props onto the root element', () => {
    render(<Card data-testid="card">content</Card>)

    expect(screen.getByTestId('card')).toBeInTheDocument()
  })

  it('lets a consumer className fully override the composed glass background', () => {
    render(<Card className="bg-red-500">content</Card>)

    const card = screen.getByText('content').parentElement
    expect(card?.className).toContain('bg-red-500')
    expect(card?.className).not.toContain('aero-panel')
  })

  it('renders the sheen and content layers', () => {
    render(<Card data-testid="card">content</Card>)

    const card = screen.getByTestId('card')
    expect(card.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
