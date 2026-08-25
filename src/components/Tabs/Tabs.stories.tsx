import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Tabs } from './Tabs'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    defaultValue: 'general',
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Disabled
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="general">
        <p style={{ margin: 0 }}>General settings go here.</p>
      </Tabs.Panel>
      <Tabs.Panel value="advanced">
        <p style={{ margin: 0 }}>Advanced settings go here.</p>
      </Tabs.Panel>
      <Tabs.Panel value="disabled">
        <p style={{ margin: 0 }}>Unreachable.</p>
      </Tabs.Panel>
    </Tabs>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('general')
    return (
      <>
        <p style={{ marginTop: 0 }}>Active tab: {value}</p>
        <Tabs value={value} defaultValue="general" onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Tab value="general">General</Tabs.Tab>
            <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="general">
            <p style={{ margin: 0 }}>General settings go here.</p>
          </Tabs.Panel>
          <Tabs.Panel value="advanced">
            <p style={{ margin: 0 }}>Advanced settings go here.</p>
          </Tabs.Panel>
        </Tabs>
      </>
    )
  },
}
