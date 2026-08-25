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
})
