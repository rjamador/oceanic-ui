import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Pulse } from './Pulse'

describe('Pulse', () => {
  it('has an accessible name', () => {
    render(<Pulse />)

    expect(screen.getByRole('status', { name: 'Working' })).toBeInTheDocument()
  })

  it('accepts a custom label', () => {
    render(<Pulse label="Thinking" />)

    expect(screen.getByRole('status', { name: 'Thinking' })).toBeInTheDocument()
  })

  it('marks itself live while active', () => {
    render(<Pulse active />)

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite')
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<Pulse className="bg-red-500" />)

    const pulse = screen.getByRole('status')
    expect(pulse.className).toContain('bg-red-500')
    expect(pulse.className).not.toContain('aero-pulse')
  })
})
