import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from './Tabs'

function BasicTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
  return (
    <Tabs defaultValue="general" {...props}>
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="general">General panel</Tabs.Panel>
      <Tabs.Panel value="advanced">Advanced panel</Tabs.Panel>
      <Tabs.Panel value="disabled">Disabled panel</Tabs.Panel>
    </Tabs>
  )
}

describe('Tabs', () => {
  it('only renders the active panel', () => {
    render(<BasicTabs />)

    expect(screen.getByText('General panel')).toBeInTheDocument()
    expect(screen.queryByText('Advanced panel')).not.toBeInTheDocument()
  })

  it('switches panels when a tab is clicked', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    await user.click(screen.getByRole('tab', { name: 'Advanced' }))

    expect(screen.getByText('Advanced panel')).toBeInTheDocument()
    expect(screen.queryByText('General panel')).not.toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Advanced' })).toHaveAttribute('aria-selected', 'true')
  })

  it('navigates and activates tabs with arrow keys, skipping disabled ones', async () => {
    const user = userEvent.setup()
    render(<BasicTabs />)

    screen.getByRole('tab', { name: 'General' }).focus()
    await user.keyboard('{ArrowRight}')

    expect(screen.getByRole('tab', { name: 'Advanced' })).toHaveFocus()
    expect(screen.getByText('Advanced panel')).toBeInTheDocument()

    await user.keyboard('{ArrowRight}')

    // wraps around past the disabled tab back to General
    expect(screen.getByRole('tab', { name: 'General' })).toHaveFocus()
    expect(screen.getByText('General panel')).toBeInTheDocument()
  })

  it('supports controlled usage via value/onValueChange', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<BasicTabs value="general" onValueChange={onValueChange} />)

    await user.click(screen.getByRole('tab', { name: 'Advanced' }))

    expect(onValueChange).toHaveBeenCalledWith('advanced')
    // controlled: panel does not change until the consumer feeds the new value back
    expect(screen.getByText('General panel')).toBeInTheDocument()
  })

  it('lets a consumer className fully override the composed panel background', () => {
    render(
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="general" className="bg-red-500">
          General panel
        </Tabs.Panel>
      </Tabs>,
    )

    const panel = screen.getByRole('tabpanel')
    expect(panel.className).toContain('bg-red-500')
    expect(panel.className).not.toContain('aero-tabs-panel')
  })
})
