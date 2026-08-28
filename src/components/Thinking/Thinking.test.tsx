import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Thinking } from './Thinking'

describe('Thinking', () => {
  it('announces itself while streaming and keeps the trace open', () => {
    render(
      <Thinking streaming label="Thinking…">
        looking at the layout
      </Thinking>,
    )

    expect(screen.getByRole('status', { name: 'Thinking…' })).toBeInTheDocument()
    expect(screen.getByText('looking at the layout')).toBeInTheDocument()
  })

  it('collapses into a toggle named by its visible text once settled', async () => {
    const user = userEvent.setup()
    render(
      <Thinking duration={8} defaultOpen={false}>
        looking at the layout
      </Thinking>,
    )

    const trigger = screen.getByRole('button', { name: 'Thought for 8s' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('looking at the layout')).not.toBeInTheDocument()

    await user.click(trigger)

    expect(screen.getByText('looking at the layout')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('disables the toggle when there is no trace', async () => {
    const user = userEvent.setup()
    render(<Thinking duration={3} />)

    const trigger = screen.getByRole('button', { name: 'Thought for 3s' })
    expect(trigger).toBeDisabled()
    expect(trigger).not.toHaveAttribute('aria-expanded')
    await user.click(trigger)
    expect(screen.queryByText(/looking/)).not.toBeInTheDocument()
  })

  it('announces the settled summary on the streaming → done edge', () => {
    const { rerender, container } = render(
      <Thinking streaming>looking at the layout</Thinking>,
    )

    const liveRegions = () =>
      Array.from(container.querySelectorAll('.sr-only[role="status"]'))
    expect(liveRegions()[0]).toHaveTextContent('')

    rerender(<Thinking duration={5}>looking at the layout</Thinking>)
    expect(liveRegions()[0]).toHaveTextContent('Thought for 5s')
  })
})
