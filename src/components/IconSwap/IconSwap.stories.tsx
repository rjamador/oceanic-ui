import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowUpIcon, SquareIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { IconSwap } from './IconSwap'

const meta = {
  title: 'Components/IconSwap',
  component: IconSwap,
} satisfies Meta<typeof IconSwap>

export default meta
type Story = StoryObj<typeof meta>

export const SendAndStop: Story = {
  args: {
    active: false,
    initial: <ArrowUpIcon size={14} />,
    swapped: <SquareIcon size={14} />,
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <IconButton aria-label="Send" variant="primary" icon={<IconSwap {...args} active={false} />} />
      <IconButton aria-label="Stop" variant="primary" icon={<IconSwap {...args} active />} />
    </div>
  ),
}
