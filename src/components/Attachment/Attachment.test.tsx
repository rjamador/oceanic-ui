import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CloseIcon, FileIcon } from '../Icon'
import { Attachment } from './Attachment'

describe('Attachment', () => {
  it('renders the file name', () => {
    render(
      <Attachment>
        <Attachment.Media>
          <FileIcon />
        </Attachment.Media>
        <Attachment.Content>
          <Attachment.Title>notes.txt</Attachment.Title>
        </Attachment.Content>
      </Attachment>,
    )

    expect(screen.getByText('notes.txt')).toBeInTheDocument()
  })

  it('announces the error state', () => {
    render(
      <Attachment state="error">
        <Attachment.Content>
          <Attachment.Title>photo.png</Attachment.Title>
          <Attachment.Description>Upload failed</Attachment.Description>
        </Attachment.Content>
      </Attachment>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Upload failed')
  })

  it('invokes the remove action from the keyboard', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(
      <Attachment>
        <Attachment.Content>
          <Attachment.Title>notes.txt</Attachment.Title>
        </Attachment.Content>
        <Attachment.Actions>
          <Attachment.Action aria-label="Remove notes.txt" icon={<CloseIcon />} onClick={onRemove} />
        </Attachment.Actions>
      </Attachment>,
    )

    await user.tab()
    await user.keyboard('{Enter}')
    expect(onRemove).toHaveBeenCalledOnce()
  })
})
