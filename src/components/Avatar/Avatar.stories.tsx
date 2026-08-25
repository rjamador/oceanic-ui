import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Initials: Story = {
  args: { name: 'Ada Lovelace' },
}

export const FallbackIcon: Story = {
  args: {},
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" />
    </div>
  ),
}
