import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToolCall } from './ToolCall'

describe('ToolCall', () => {
  it('derives a verb from the tool name and shows the target', () => {
    render(<ToolCall name="read_file" target="src/lib/cn.ts" />)

    expect(screen.getByRole('button', { name: /Read/ })).toBeInTheDocument()
    expect(screen.getByText('src/lib/cn.ts')).toBeInTheDocument()
  })

  it('expands detail on click', async () => {
    const user = userEvent.setup()
    render(
      <ToolCall name="read_file" target="src/lib/cn.ts">
        {`export function cn() {}`}
      </ToolCall>,
    )

    expect(screen.queryByText('export function cn() {}')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Read/ }))
    expect(screen.getByText('export function cn() {}')).toBeInTheDocument()
  })

  it('does not expand when there is no body', () => {
    render(<ToolCall name="read_file" target="src/lib/cn.ts" />)

    expect(screen.getByRole('button', { name: /Read/ })).toBeDisabled()
  })

  it('calls onActivate instead of expanding', async () => {
    const user = userEvent.setup()
    const onActivate = vi.fn()
    render(
      <ToolCall name="edit_file" target="src/a.ts" onActivate={onActivate}>
        a diff
      </ToolCall>,
    )

    await user.click(screen.getByRole('button', { name: /Edit/ }))
    expect(onActivate).toHaveBeenCalledOnce()
    expect(screen.queryByText('a diff')).not.toBeInTheDocument()
  })

  it('announces a pending approval', () => {
    render(<ToolCall name="bash" target="rm -rf dist" status="pending" />)

    expect(screen.getByRole('status')).toHaveTextContent('Awaiting approval')
  })

  it('toggles a group of rows', async () => {
    const user = userEvent.setup()
    render(
      <ToolCall.Group label="Inspected 2 files">
        <ToolCall name="read_file" target="a.ts" />
        <ToolCall name="read_file" target="b.ts" />
      </ToolCall.Group>,
    )

    expect(screen.queryByText('a.ts')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Inspected 2 files' }))
    expect(screen.getByText('a.ts')).toBeInTheDocument()
    expect(screen.getByText('b.ts')).toBeInTheDocument()
  })

  it('lets a consumer className fully override a pending surface', () => {
    render(<ToolCall name="bash" status="pending" className="bg-red-500" />)

    const row = screen.getByRole('status')
    expect(row.className).toContain('bg-red-500')
    expect(row.className).not.toContain('aero-tool-call-pending')
  })
})
