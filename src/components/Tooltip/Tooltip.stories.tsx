import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { GearIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { Tooltip } from './Tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  // `Sides` below renders its own layout via `render` and doesn't need a
  // trigger from args — this placeholder only exists to satisfy the
  // required `children` prop type.
  args: {
    content: 'Settings',
    children: <IconButton variant="ghost" icon={<GearIcon />} aria-label="Settings" />,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 48 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const OnIconButton: Story = {
  args: {
    children: <IconButton variant="ghost" icon={<GearIcon />} aria-label="Settings" />,
  },
}

export const OnButton: Story = {
  args: {
    content: "You don't have permission to do this",
    children: (
      <Button variant="primary" disabled>
        Publish
      </Button>
    ),
  },
}

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 64, padding: 32 }}>
      <Tooltip content="Top" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" side="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  ),
}
