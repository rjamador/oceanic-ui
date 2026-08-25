import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Switch } from './Switch'

describe('Switch', () => {
  it('associates the label with the field and exposes the switch role', () => {
    render(<Switch label="Airplane mode" />)

    expect(screen.getByRole('switch', { name: 'Airplane mode' })).toBeInTheDocument()
  })

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup()
    render(<Switch label="Airplane mode" />)

    const toggle = screen.getByRole('switch', { name: 'Airplane mode' })
    expect(toggle).not.toBeChecked()

    await user.click(screen.getByText('Airplane mode'))
    expect(toggle).toBeChecked()
  })

  it('toggles via the keyboard', async () => {
    const user = userEvent.setup()
    render(<Switch label="Airplane mode" />)

    const toggle = screen.getByRole('switch', { name: 'Airplane mode' })
    await user.tab()
    expect(toggle).toHaveFocus()

    await user.keyboard(' ')
    expect(toggle).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    render(<Switch label="Airplane mode" disabled />)

    const toggle = screen.getByRole('switch', { name: 'Airplane mode' })
    await user.click(toggle)

    expect(toggle).not.toBeChecked()
  })
})
