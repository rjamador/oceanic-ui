import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Popover } from './Popover'

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
