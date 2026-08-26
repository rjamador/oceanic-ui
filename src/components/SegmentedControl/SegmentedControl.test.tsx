import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SegmentedControl } from './SegmentedControl'

function BasicSegmented(props: Partial<React.ComponentProps<typeof SegmentedControl>> = {}) {
  return (
    <SegmentedControl defaultValue="list" {...props}>
      <SegmentedControl.Option value="list">List</SegmentedControl.Option>
      <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
      <SegmentedControl.Option value="locked" disabled>
        Locked
      </SegmentedControl.Option>
    </SegmentedControl>
  )
}

describe('SegmentedControl', () => {
  it('marks the default value as selected', () => {
    render(<BasicSegmented />)

    expect(screen.getByRole('radio', { name: 'List' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Grid' })).not.toBeChecked()
  })

  it('switches selection when an option is clicked', async () => {
    const user = userEvent.setup()
    render(<BasicSegmented />)

    await user.click(screen.getByRole('radio', { name: 'Grid' }))

    expect(screen.getByRole('radio', { name: 'Grid' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'List' })).not.toBeChecked()
  })

  it('navigates between options with arrow keys (native radio group behavior)', async () => {
    const user = userEvent.setup()
    render(<BasicSegmented />)

    screen.getByRole('radio', { name: 'List' }).focus()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'Grid' })).toBeChecked()
  })

  it('does not select a disabled option', async () => {
    const user = userEvent.setup()
    render(<BasicSegmented />)

    await user.click(screen.getByRole('radio', { name: 'Locked' }))

    expect(screen.getByRole('radio', { name: 'Locked' })).not.toBeChecked()
  })

  it('supports controlled usage via value/onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicSegmented value="list" onValueChange={onValueChange} />)

    await user.click(screen.getByRole('radio', { name: 'Grid' }))

    expect(onValueChange).toHaveBeenCalledWith('grid')
    expect(screen.getByRole('radio', { name: 'List' })).toBeChecked()
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<BasicSegmented className="bg-red-500" />)

    const group = screen.getByRole('radiogroup')
    expect(group.className).toContain('bg-red-500')
    expect(group.className).not.toContain('aero-segmented-root')
  })
})
