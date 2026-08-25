import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from './Divider'

describe('Divider', () => {
  it('renders as a horizontal separator by default', () => {
    render(<Divider />)

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders as a vertical separator', () => {
    render(<Divider orientation="vertical" />)

    expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders a label between two lines when given one', () => {
    render(<Divider label="OR" />)

    expect(screen.getByText('OR')).toBeInTheDocument()
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
