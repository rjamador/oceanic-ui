import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Accordion } from './Accordion'

describe('Accordion', () => {
  it('starts closed and reveals content when toggled', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <Accordion.Item title="Shipping">Ships in 3-5 days.</Accordion.Item>
      </Accordion>,
    )

    expect(screen.queryByText('Ships in 3-5 days.')).not.toBeVisible()

    await user.click(screen.getByText('Shipping'))

    expect(screen.getByText('Ships in 3-5 days.')).toBeVisible()
  })

  it('honors defaultOpen', () => {
    render(
      <Accordion>
        <Accordion.Item title="Shipping" defaultOpen>
          Ships in 3-5 days.
        </Accordion.Item>
      </Accordion>,
    )

    expect(screen.getByText('Ships in 3-5 days.')).toBeVisible()
  })

  it('gives items in an exclusive group the same details name', () => {
    render(
      <Accordion exclusive>
        <Accordion.Item title="First">One</Accordion.Item>
        <Accordion.Item title="Second">Two</Accordion.Item>
      </Accordion>,
    )

    const [first, second] = screen.getAllByText(/First|Second/).map((el) => el.closest('details'))
    expect(first).toHaveAttribute('name')
    expect(first?.getAttribute('name')).toBe(second?.getAttribute('name'))
  })

  it('does not set a details name when not exclusive', () => {
    render(
      <Accordion>
        <Accordion.Item title="First">One</Accordion.Item>
      </Accordion>,
    )

    expect(screen.getByText('First').closest('details')).not.toHaveAttribute('name')
  })
})
