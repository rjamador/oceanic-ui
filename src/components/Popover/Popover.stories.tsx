import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Popover, type PopoverSide } from './Popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button variant="secondary">Open popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <p style={{ margin: 8, width: 180 }}>An opaque Ocean panel, not glass.</p>
      </Popover.Content>
    </Popover>
  ),
}

export const Sides: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', gap: 40, padding: 80 }}>
      {(['top', 'right', 'bottom', 'left'] as PopoverSide[]).map((side) => (
        <Popover key={side} side={side}>
          <Popover.Trigger>
            <Button variant="secondary">{side}</Button>
          </Popover.Trigger>
          <Popover.Content>
            <p style={{ margin: 8, width: 140 }}>Opens on the {side}.</p>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
}

/** Trigger pinned to the right edge — the panel shifts/flips to stay on screen. */
export const NearEdge: Story = {
  args: { children: null },
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Popover>
        <Popover.Trigger>
          <Button variant="secondary">Open popover</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p style={{ margin: 8, width: 220 }}>
            This panel is wider than the space to the right of its trigger.
          </p>
        </Popover.Content>
      </Popover>
    </div>
  ),
}
