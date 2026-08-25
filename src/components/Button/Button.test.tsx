import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('calls onClick when activated via keyboard', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save</Button>)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('blocks activation when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards a ref to the underlying button element', () => {
    let node: HTMLButtonElement | null = null
    render(
      <Button
        ref={(el) => {
          node = el
        }}
      >
        Save
      </Button>,
    )

    expect(node).toBeInstanceOf(HTMLButtonElement)
  })
})
