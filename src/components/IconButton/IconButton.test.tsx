import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { IconButton } from './IconButton'

const icon = <svg data-testid="icon" />

describe('IconButton', () => {
  it('exposes its accessible name via aria-label', () => {
    render(<IconButton icon={icon} aria-label="Close" />)

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<IconButton icon={icon} aria-label="Close" onClick={onClick} />)

    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<IconButton icon={icon} aria-label="Close" variant="primary" className="bg-red-500" />)

    const button = screen.getByRole('button', { name: 'Close' })
    expect(button.className).toContain('bg-red-500')
    expect(button.className).not.toContain('aero-icon-button-primary')
  })
})
