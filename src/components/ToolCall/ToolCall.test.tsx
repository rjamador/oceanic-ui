import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToolCall } from './ToolCall'

describe('ToolCall', () => {
  it('shows the explicit label and target', () => {
    render(
      <ToolCall label="Read" target="src/lib/cn.ts">
        body
      </ToolCall>,
    )

    expect(screen.getByRole('button', { name: /Read/ })).toBeInTheDocument()
    expect(screen.getByText('src/lib/cn.ts')).toBeInTheDocument()
  })

  it('falls back to the tool name with underscores as spaces (no built-in verb map)', () => {
    render(
      <ToolCall name="read_file" target="a.ts">
        body
      </ToolCall>,
    )

    expect(screen.getByRole('button', { name: /read file/ })).toBeInTheDocument()
  })

  it('expands detail on click', async () => {
    const user = userEvent.setup()
    render(
      <ToolCall label="Read" target="src/lib/cn.ts">
        {`export function cn() {}`}
      </ToolCall>,
    )

    expect(screen.queryByText('export function cn() {}')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Read/ }))
    expect(screen.getByText('export function cn() {}')).toBeInTheDocument()
  })

  it('renders a non-interactive row (not a disabled button) when there is nothing to do', () => {
    render(<ToolCall label="Read" target="src/lib/cn.ts" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.getByText('Read')).toBeInTheDocument()
  })

  it('calls onActivate instead of expanding', async () => {
    const user = userEvent.setup()
    const onActivate = vi.fn()
    render(
      <ToolCall label="Edit" target="src/a.ts" onActivate={onActivate}>
        a diff
      </ToolCall>,
    )

    await user.click(screen.getByRole('button', { name: /Edit/ }))
    expect(onActivate).toHaveBeenCalledOnce()
    expect(screen.queryByText('a diff')).not.toBeInTheDocument()
  })

  it('exposes a text status for a failed row', () => {
    render(
      <ToolCall label="Write" target="src/missing.ts" status="error">
        ENOENT
      </ToolCall>,
    )

    expect(screen.getByRole('status')).toHaveTextContent('Failed')
  })

  it('announces a pending approval without wrapping the actions in the live region', () => {
    render(
      <ToolCall
        label="Run"
        target="rm -rf dist"
        status="pending"
        actions={<button type="button">Allow</button>}
      />,
    )

    const status = screen.getByRole('status')
    expect(status).toHaveTextContent('Awaiting approval')
    expect(status).not.toContainElement(screen.getByRole('button', { name: 'Allow' }))
  })

  it('folds the failure count into the group button name', async () => {
    const user = userEvent.setup()
    render(
      <ToolCall.Group label="Ran 2 checks" errors={1}>
        <ToolCall label="Run" target="lint" />
      </ToolCall.Group>,
    )

    expect(
      screen.getByRole('button', { name: 'Ran 2 checks, 1 failed' }),
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Ran 2 checks/ }))
    expect(screen.getByText('lint')).toBeInTheDocument()
  })

  it('lets a consumer bg-* class replace the failure tint without dropping row layout', () => {
    const { container } = render(
      <ToolCall label="Write" target="x" status="error" className="bg-transparent">
        body
      </ToolCall>,
    )

    const root = container.querySelector('[data-slot="tool-call"]')
    expect(root?.className).toContain('aero-tool-call')
    expect(root?.className).toContain('bg-transparent')
    expect(root?.className).not.toContain('aero-tool-call-error')
  })
})
