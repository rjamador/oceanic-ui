import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { List } from './List'

function BasicList(props: Partial<React.ComponentProps<typeof List>> = {}) {
  return (
    <List defaultValue="doc1" aria-label="Files" {...props}>
      <List.Item value="doc1">Document.docx</List.Item>
      <List.Item value="doc2">Photo.png</List.Item>
      <List.Item value="doc3" disabled>
        Locked.zip
      </List.Item>
    </List>
  )
}

describe('List', () => {
  it('marks the default value as selected', () => {
    render(<BasicList />)

    expect(screen.getByRole('option', { name: 'Document.docx' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('selects an item on click', async () => {
    const user = userEvent.setup()
    render(<BasicList />)

    await user.click(screen.getByRole('option', { name: 'Photo.png' }))

    expect(screen.getByRole('option', { name: 'Photo.png' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('option', { name: 'Document.docx' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
  })

  it('navigates and selects with arrow keys, skipping disabled items', async () => {
    const user = userEvent.setup()
    render(<BasicList />)

    screen.getByRole('option', { name: 'Document.docx' }).focus()
    await user.keyboard('{ArrowDown}')

    expect(screen.getByRole('option', { name: 'Photo.png' })).toHaveFocus()
    expect(screen.getByRole('option', { name: 'Photo.png' })).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{ArrowDown}')

    // wraps around past the disabled item back to Document.docx
    expect(screen.getByRole('option', { name: 'Document.docx' })).toHaveFocus()
  })

  it('supports controlled usage via value/onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicList value="doc1" onValueChange={onValueChange} />)

    await user.click(screen.getByRole('option', { name: 'Photo.png' }))

    expect(onValueChange).toHaveBeenCalledWith('doc2')
    expect(screen.getByRole('option', { name: 'Document.docx' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<BasicList className="bg-red-500" />)

    const list = screen.getByRole('listbox')
    expect(list.className).toContain('bg-red-500')
    expect(list.className).not.toContain('aero-list-root')
  })
})
