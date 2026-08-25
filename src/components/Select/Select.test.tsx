import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Select } from './Select'

describe('Select', () => {
  it('associates the label and selects an option', async () => {
    const user = userEvent.setup()
    render(
      <Select label="Country" defaultValue="ar">
        <option value="ar">Argentina</option>
        <option value="mx">México</option>
      </Select>,
    )

    const select = screen.getByLabelText('Country')
    await user.selectOptions(select, 'mx')

    expect(select).toHaveValue('mx')
  })

  it('marks the field invalid and announces the error message', () => {
    render(
      <Select label="Country" errorMessage="Pick a country.">
        <option value="ar">Argentina</option>
      </Select>,
    )

    const select = screen.getByLabelText('Country')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Pick a country.')
  })
})
