import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Button } from '../Button'
import { Popover } from './Popover'

describe('Popover', () => {
  it('opens from the trigger and closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content>Panel</Popover.Content>
      </Popover>,
    )

    expect(screen.queryByText('Panel')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Panel')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByText('Panel')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus()
  })

  it('moves focus into the panel when it opens', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content>Panel</Popover.Content>
      </Popover>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('region', { name: 'Open' })).toHaveFocus()
  })
})
