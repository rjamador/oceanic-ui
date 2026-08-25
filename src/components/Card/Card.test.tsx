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
})
