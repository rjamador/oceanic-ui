import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckIcon } from '../Icon'
import { IconButton } from './IconButton'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    icon: <CheckIcon />,
    'aria-label': 'Accept',
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
}
