import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Composer } from './Composer'

describe('Composer', () => {
  it('associates the message field for assistive tech', () => {
    render(<Composer value="" onChange={vi.fn()} onSubmit={vi.fn()} />)

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument()
  })

  it('submits on Enter and not on Shift+Enter', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onChange = vi.fn()
    render(<Composer value="hello" onChange={onChange} onSubmit={onSubmit} />)

    const field = screen.getByRole('textbox', { name: 'Message' })
    field.focus()
    await user.keyboard('{Enter}')
    expect(onSubmit).toHaveBeenCalledOnce()

    onSubmit.mockClear()
    await user.keyboard('{Shift>}{Enter}{/Shift}')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('blocks send when the field is empty', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<Composer value="   " onChange={vi.fn()} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('completes a slash command from the palette', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Composer
        value="/pl"
        onChange={onChange}
        onSubmit={vi.fn()}
        commands={[{ name: 'plan', description: 'Write a plan' }]}
      />,
    )

    expect(screen.getByRole('option', { name: /plan/ })).toBeInTheDocument()
    await user.click(screen.getByRole('option', { name: /plan/ }))
    expect(onChange).toHaveBeenCalledWith('/plan ')
  })

  it('stops an in-flight send instead of submitting again', async () => {
    const user = userEvent.setup()
    const onStop = vi.fn()
    const onSubmit = vi.fn()
    render(
      <Composer value="hello" sending onChange={vi.fn()} onSubmit={onSubmit} onStop={onStop} />,
    )

    await user.click(screen.getByRole('button', { name: 'Stop' }))
    expect(onStop).toHaveBeenCalledOnce()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('marks the frame busy while sending', () => {
    render(
      <Composer value="hello" sending onChange={vi.fn()} onSubmit={vi.fn()} onStop={vi.fn()} />,
    )

    expect(screen.getByRole('group', { name: 'Message' })).toHaveAttribute('aria-busy', 'true')
  })
})
