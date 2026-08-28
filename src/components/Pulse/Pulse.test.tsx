import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Pulse } from './Pulse'

describe('Pulse', () => {
  it('is decorative by default — no status role', () => {
    const { container } = render(<Pulse />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('exposes a live status region with an off-screen name when announce is set', () => {
    render(<Pulse announce label="Saving" />)

    expect(screen.getByRole('status', { name: 'Saving' })).toBeInTheDocument()
  })

  it('marks the announced region live only while active', () => {
    const { rerender } = render(<Pulse announce label="Saving" />)
    expect(screen.getByRole('status')).not.toHaveAttribute('aria-live')

    rerender(<Pulse announce active label="Saving" />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })

  it('keeps its base class alongside a consumer className', () => {
    const { container } = render(<Pulse className="mt-4" />)

    expect(container.firstElementChild?.className).toContain('aero-pulse')
    expect(container.firstElementChild?.className).toContain('mt-4')
  })
})
