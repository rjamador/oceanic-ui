import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../Button'
import { Menu } from './Menu'

describe('Menu', () => {
  it('selects an item and closes', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <Menu>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={onSelect}>Upload files</Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('menuitem', { name: 'Upload files' }))
    expect(onSelect).toHaveBeenCalledOnce()
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus()
  })

  it('moves focus to the first item and restores the trigger on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Upload files</Menu.Item>
          <Menu.Item>Open folder</Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menuitem', { name: 'Upload files' })).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Open folder' })).toHaveFocus()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus()
  })

  it('closes on Tab and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Upload files</Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.keyboard('{Tab}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus()
  })

  it('jumps to a matching item on type-ahead', async () => {
    const user = userEvent.setup()
    render(
      <Menu>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>Alpha</Menu.Item>
          <Menu.Item>Bravo</Menu.Item>
          <Menu.Item>Charlie</Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.keyboard('c')
    expect(screen.getByRole('menuitem', { name: 'Charlie' })).toHaveFocus()
  })

  it('does not select a disabled item', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <Menu defaultOpen>
        <Menu.Trigger>
          <Button>Open</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item disabled onSelect={onSelect}>
            Locked
          </Menu.Item>
        </Menu.Content>
      </Menu>,
    )

    await user.click(screen.getByRole('menuitem', { name: 'Locked' }))
    expect(onSelect).not.toHaveBeenCalled()
  })
})
