import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToastProvider, useToast } from './Toast'

function Demo() {
  const toast = useToast()
  return <button onClick={() => toast({ description: 'Saved!' })}>Notify</button>
}

describe('ToastProvider / useToast', () => {
  it('shows a toast when triggered and dismisses it on click', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Notify' }))
    expect(screen.getByText('Saved!')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument()
  })

  it('auto-dismisses after the given duration', () => {
    vi.useFakeTimers()
    try {
      render(
        <ToastProvider>
          <Demo />
        </ToastProvider>,
      )

      act(() => {
        screen.getByRole('button', { name: 'Notify' }).click()
      })
      expect(screen.getByText('Saved!')).toBeInTheDocument()

      act(() => {
        vi.advanceTimersByTime(4000)
      })
      expect(screen.queryByText('Saved!')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('throws when used outside a provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    function Bad() {
      useToast()
      return null
    }

    expect(() => render(<Bad />)).toThrow('useToast must be used inside a <ToastProvider>')

    consoleError.mockRestore()
  })
})
