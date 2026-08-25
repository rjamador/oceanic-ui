import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'New',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Accent: Story = {
  args: { variant: 'accent' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Expired' },
}

export const Count: Story = {
  args: { variant: 'accent', children: '12' },
}
