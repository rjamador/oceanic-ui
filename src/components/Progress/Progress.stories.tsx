import type { Meta, StoryObj } from '@storybook/react-vite'

import { Progress } from './Progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    label: 'Progress',
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Determinate: Story = {
  args: { value: 62 },
}

export const Indeterminate: Story = {
  args: {},
}

export const Complete: Story = {
  args: { value: 100 },
}

export const Steps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      <Progress value={0} label="0%" />
      <Progress value={25} label="25%" />
      <Progress value={62} label="62%" />
      <Progress value={100} label="100%" />
    </div>
  ),
}
