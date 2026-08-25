import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('has an accessible name', () => {
    render(<Spinner />)

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('accepts a custom label', () => {
    render(<Spinner label="Saving changes" />)

    expect(screen.getByRole('status', { name: 'Saving changes' })).toBeInTheDocument()
  })

  it('applies a custom size', () => {
    render(<Spinner size={32} data-testid="spinner" />)

    const el = screen.getByTestId('spinner')
    expect(el.style.width).toBe('32px')
    expect(el.style.height).toBe('32px')
  })
})
