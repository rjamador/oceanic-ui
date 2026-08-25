import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('associates the label with the field', () => {
    render(<Textarea label="Bio" />)

    expect(screen.getByLabelText('Bio')).toBeInTheDocument()
  })

  it('accepts multi-line typed input', async () => {
    const user = userEvent.setup()
    render(<Textarea label="Bio" />)

    await user.type(screen.getByLabelText('Bio'), 'Line one{enter}Line two')

    expect(screen.getByLabelText('Bio')).toHaveValue('Line one\nLine two')
  })

  it('marks the field invalid and announces the error message', () => {
    render(<Textarea label="Bio" errorMessage="Bio is too long." />)

    const field = screen.getByLabelText('Bio')
    expect(field).toHaveAttribute('aria-invalid', 'true')

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Bio is too long.')
    expect(field).toHaveAttribute('aria-describedby', alert.id)
  })

  it('associates helper text without marking the field invalid', () => {
    render(<Textarea label="Bio" helperText="Max 200 characters." />)

    const field = screen.getByLabelText('Bio')
    expect(field).not.toHaveAttribute('aria-invalid')
    expect(field.getAttribute('aria-describedby')).toBe(
      screen.getByText('Max 200 characters.').id,
    )
  })
})
