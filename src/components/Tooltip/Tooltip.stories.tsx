import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { IconButton } from '../IconButton'
import { Tooltip } from './Tooltip'

const GearIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  // `Sides` below renders its own layout via `render` and doesn't need a
  // trigger from args — this placeholder only exists to satisfy the
  // required `children` prop type.
  args: {
    content: 'Settings',
    children: <IconButton variant="ghost" icon={GearIcon} aria-label="Settings" />,
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
    children: <IconButton variant="ghost" icon={GearIcon} aria-label="Settings" />,
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
