import type { Meta, StoryObj } from '@storybook/react-vite'

import { Divider } from './Divider'

const meta = {
  title: 'Components/Divider',
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0 }}>Above</p>
      <Divider style={{ margin: '12px 0' }} />
      <p style={{ margin: 0 }}>Below</p>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0 }}>Sign in with email</p>
      <Divider label="OR" style={{ margin: '16px 0' }} />
      <p style={{ margin: 0 }}>Sign in with Google</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 32 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
}
