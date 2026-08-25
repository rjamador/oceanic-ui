import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('toggles checked state when the label is clicked', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' })
    expect(checkbox).not.toBeChecked()

    await user.click(screen.getByText('Remember me'))
    expect(checkbox).toBeChecked()
  })

  it('toggles checked state via the keyboard', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' })

    await user.tab()
    expect(checkbox).toHaveFocus()

    await user.keyboard(' ')
    expect(checkbox).toBeChecked()

    await user.keyboard(' ')
    expect(checkbox).not.toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Remember me" disabled />)

    const checkbox = screen.getByRole('checkbox', { name: 'Remember me' })
    await user.click(checkbox)

    expect(checkbox).not.toBeChecked()
  })
})
