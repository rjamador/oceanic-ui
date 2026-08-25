import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
  it('associates the label with the field', () => {
    render(<Input label="Email" />)

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('accepts typed input', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)

    await user.type(screen.getByLabelText('Email'), 'ada@example.com')

    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com')
  })

  it('marks the field invalid and announces the error message', () => {
    render(<Input label="Username" errorMessage="That username is already taken." />)

    const field = screen.getByLabelText('Username')
    expect(field).toHaveAttribute('aria-invalid', 'true')

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('That username is already taken.')
    expect(field).toHaveAttribute('aria-describedby', alert.id)
  })

  it('associates helper text without marking the field invalid', () => {
    render(<Input label="Email" helperText="We'll never share your email." />)

    const field = screen.getByLabelText('Email')
    expect(field).not.toHaveAttribute('aria-invalid')
    expect(field.getAttribute('aria-describedby')).toBe(
      screen.getByText("We'll never share your email.").id,
    )
  })
})
