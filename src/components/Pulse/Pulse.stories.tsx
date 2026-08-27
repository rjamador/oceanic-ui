import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pulse } from './Pulse'

const meta = {
  title: 'Components/Pulse',
  component: Pulse,
} satisfies Meta<typeof Pulse>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: { label: 'Idle' },
}

export const Thinking: Story = {
  args: { active: true, label: 'Thinking' },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Pulse size="xs" active label="xs" />
      <Pulse size="sm" active label="sm" />
      <Pulse size="md" active label="md" />
      <Pulse size="lg" active label="lg" />
    </div>
  ),
}
