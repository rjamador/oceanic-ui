import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Alert } from './Alert'

describe('Alert', () => {
  it('announces its title and body', () => {
    render(
      <Alert title="Saved">Your changes were written to disk.</Alert>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Saved')
    expect(screen.getByRole('status')).toHaveTextContent('Your changes were written to disk.')
  })

  it('announces a danger alert assertively', () => {
    render(
      <Alert variant="danger" title="Upload failed">
        The file exceeds the 10MB limit.
      </Alert>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed')
  })

  it('dismisses from the keyboard', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(
      <Alert title="Notice" onDismiss={onDismiss}>
        Something happened.
      </Alert>,
    )

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
