import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Sidebar, useSidebar } from './index'

function Nav({ children }: { children?: React.ReactNode }) {
  return (
    <Sidebar.Provider>
      <Sidebar aria-label="Main">
        <Sidebar.Body>
          <Sidebar.Group label="Navigation">
            <Sidebar.Menu>
              <Sidebar.Item active>Home</Sidebar.Item>
              <Sidebar.Item>Projects</Sidebar.Item>
              <Sidebar.Item>Settings</Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Group>
          {children}
        </Sidebar.Body>
      </Sidebar>
      <Sidebar.Trigger />
      <Sidebar.Main>content</Sidebar.Main>
    </Sidebar.Provider>
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Sidebar', () => {
  it('throws when useSidebar is used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useSidebar())).toThrow(/Sidebar.Provider/)
    spy.mockRestore()
  })

  it('renders an aside landmark with an accessible name', () => {
    render(<Nav />)
    expect(screen.getByRole('complementary', { name: 'Main' })).toBeInTheDocument()
  })

  it('toggles the collapsed state from the trigger', async () => {
    const user = userEvent.setup()
    render(<Nav />)

    const trigger = screen.getByRole('button', { name: 'Toggle sidebar' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('sets aria-current="page" on an active item, and respects an explicit value', () => {
    render(
      <Sidebar.Provider>
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item active>Home</Sidebar.Item>
              <Sidebar.Item active aria-current="true">
                Chat
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Chat' })).toHaveAttribute('aria-current', 'true')
  })

  it('renders an item as a link with asChild', () => {
    render(
      <Sidebar.Provider>
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item asChild>
                <a href="/home">Home</a>
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    const link = screen.getByRole('link', { name: 'Home' })
    expect(link).toHaveAttribute('href', '/home')
    expect(link.className).toContain('aero-sidebar-item')
  })

  it('moves focus between items with the arrow keys', async () => {
    const user = userEvent.setup()
    render(<Nav />)

    await user.tab()
    // first focusable inside is the first menu item
    const [home, projects] = screen.getAllByRole('button').filter((b) => b.dataset.sidebarItem === '')
    home.focus()
    await user.keyboard('{ArrowDown}')
    expect(projects).toHaveFocus()
    await user.keyboard('{ArrowUp}')
    expect(home).toHaveFocus()
  })

  it('lays a badge and a hover action side by side, not stacked', () => {
    const { container } = render(
      <Sidebar.Provider>
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item
                badge="8m"
                action={
                  <button type="button" aria-label="Delete">
                    x
                  </button>
                }
              >
                Thread A
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    // both are present
    expect(screen.getByText('8m')).toBeInTheDocument()
    const del = screen.getByRole('button', { name: 'Delete' })

    // the action wrapper is a flow sibling of the item button inside the row,
    // so it can't be an absolute overlay on top of the badge
    const row = container.querySelector<HTMLElement>('.aero-sidebar-item-row')
    expect(row).toBeInTheDocument()
    const button = container.querySelector<HTMLElement>('[data-sidebar-item]')
    const actionWrap = del.closest<HTMLElement>('.aero-sidebar-item-action')
    expect(row).toContainElement(button)
    expect(row).toContainElement(actionWrap)
    expect(actionWrap?.previousElementSibling).toBe(button)
    // the badge is inside the button, i.e. to the left of the action
    expect(button).toContainElement(screen.getByText('8m'))
  })

  it('collapses a group section', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Provider>
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Group label="Recent" collapsible defaultOpen>
              <Sidebar.Menu>
                <Sidebar.Item>Thread A</Sidebar.Item>
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    expect(screen.getByText('Thread A')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Recent/ }))
    expect(screen.queryByText('Thread A')).not.toBeInTheDocument()
  })

  it('expands a nested submenu from the parent item', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Provider>
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item
                subMenu={
                  <Sidebar.Menu>
                    <Sidebar.Item>Project A</Sidebar.Item>
                  </Sidebar.Menu>
                }
              >
                Projects
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    const parent = screen.getByRole('button', { name: 'Projects' })
    expect(parent).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Project A')).not.toBeInTheDocument()

    await user.click(parent)
    expect(parent).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Project A')).toBeInTheDocument()
  })

  it('hides labels and names items via a tooltip when collapsed to icons', () => {
    render(
      <Sidebar.Provider defaultOpen={false} collapsible="icon">
        <Sidebar aria-label="Main">
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item icon={<span data-testid="icon" />} label="Home">
                Home
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Body>
        </Sidebar>
      </Sidebar.Provider>,
    )

    const item = screen.getByRole('button', { name: 'Home' })
    expect(item).toHaveAttribute('aria-label', 'Home')
    // the visible text node is not rendered in the icon rail
    expect(item).not.toHaveTextContent('Home')
    expect(screen.getByRole('tooltip')).toHaveTextContent('Home')
  })

  it('does not toggle when collapsible="none"', async () => {
    const user = userEvent.setup()
    render(
      <Sidebar.Provider collapsible="none">
        <Sidebar aria-label="Main">
          <Sidebar.Body>x</Sidebar.Body>
        </Sidebar>
        <Sidebar.Trigger />
      </Sidebar.Provider>,
    )

    const trigger = screen.getByRole('button', { name: 'Toggle sidebar' })
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.queryByRole('button', { name: 'Toggle sidebar' })).toBeInTheDocument()
  })

  it('renders a modal drawer on mobile and closes it on Escape', async () => {
    vi.stubGlobal('matchMedia', ((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia)

    const user = userEvent.setup()
    render(<Nav />)

    const dialog = document.querySelector('dialog') as HTMLDialogElement
    expect(dialog).toBeInTheDocument()
    expect(dialog.open).toBe(false)

    await user.click(screen.getByRole('button', { name: 'Toggle sidebar' }))
    expect(dialog.open).toBe(true)

    await user.keyboard('{Escape}')
    expect(dialog.open).toBe(false)
  })
})
