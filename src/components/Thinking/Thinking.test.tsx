import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Thinking } from './Thinking'

describe('Thinking', () => {
  it('announces itself while streaming and keeps the trace open', () => {
    render(
      <Thinking streaming label="Thinking…">
        looking at the composer
      </Thinking>,
    )

    expect(screen.getByRole('status', { name: 'Thinking…' })).toBeInTheDocument()
    expect(screen.getByText('looking at the composer')).toBeInTheDocument()
  })

  it('collapses into a toggle once settled', async () => {
    const user = userEvent.setup()
    render(
      <Thinking duration={8} defaultOpen={false}>
        looking at the composer
      </Thinking>,
    )

    expect(screen.getByRole('button', { name: 'Show the reasoning' })).toBeInTheDocument()
    expect(screen.queryByText('looking at the composer')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show the reasoning' }))

    expect(screen.getByText('looking at the composer')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hide the reasoning' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('does not toggle when there is no trace', async () => {
    const user = userEvent.setup()
    render(<Thinking duration={3} />)

    const trigger = screen.getByRole('button', { name: 'Show the reasoning' })
    expect(trigger).toBeDisabled()
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })
})
