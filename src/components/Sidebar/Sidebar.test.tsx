import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PencilIcon } from '../Icon'
import { Sidebar } from './Sidebar'

function BasicSidebar(props: Partial<React.ComponentProps<typeof Sidebar>> = {}) {
  return (
    <Sidebar aria-label="Chat history" {...props}>
      <Sidebar.Header />
      <Sidebar.Body>
        <Sidebar.Nav>
          <Sidebar.NavItem icon={<PencilIcon size={16} />}>New chat</Sidebar.NavItem>
        </Sidebar.Nav>
        <Sidebar.Section>
          <Sidebar.SectionHeader count={1}>Projects</Sidebar.SectionHeader>
          <Sidebar.Item>Hi</Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Sidebar.Item>Ada</Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  )
}

describe('Sidebar', () => {
  it('renders nav, section, and footer while open', () => {
    render(<BasicSidebar />)

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New chat' })).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hi' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ada' })).toBeInTheDocument()
  })

  it('collapses to an icon rail and hides section copy', async () => {
    const user = userEvent.setup()
    render(<BasicSidebar />)

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))

    expect(screen.getByRole('button', { name: 'Expand sidebar' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New chat' })).toBeInTheDocument()
    expect(screen.queryByText('New chat')).not.toBeInTheDocument()
  })

  it('supports controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<BasicSidebar open onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('toggles a project group', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Group title="Aero-Webring">
            <Sidebar.Item>No chats yet</Sidebar.Item>
          </Sidebar.Group>
        </Sidebar.Body>
      </Sidebar>,
    )

    expect(screen.queryByRole('button', { name: 'No chats yet' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Aero-Webring' }))
    expect(screen.getByRole('button', { name: 'No chats yet' })).toBeInTheDocument()
  })

  it('lets a consumer className fully override the rail background', () => {
    render(
      <Sidebar className="bg-red-500">
        <Sidebar.Body />
      </Sidebar>,
    )

    const rail = screen.getByRole('complementary')
    expect(rail.className).toContain('bg-red-500')
    expect(rail.className).not.toContain('aero-sidebar')
  })
})
