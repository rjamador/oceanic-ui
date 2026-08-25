import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Radio } from './Radio'

describe('Radio', () => {
  it('only allows one option per group to be selected', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Radio name="plan" label="Free plan" />
        <Radio name="plan" label="Pro plan" />
      </>,
    )

    const free = screen.getByRole('radio', { name: 'Free plan' })
    const pro = screen.getByRole('radio', { name: 'Pro plan' })

    await user.click(screen.getByText('Free plan'))
    expect(free).toBeChecked()
    expect(pro).not.toBeChecked()

    await user.click(screen.getByText('Pro plan'))
    expect(free).not.toBeChecked()
    expect(pro).toBeChecked()
  })
})
