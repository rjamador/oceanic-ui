import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { SegmentedControl } from './SegmentedControl'

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    defaultValue: 'list',
  },
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControl.Option value="list">List</SegmentedControl.Option>
      <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
      <SegmentedControl.Option value="details" disabled>
        Details
      </SegmentedControl.Option>
    </SegmentedControl>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('list')
    return (
      <>
        <p style={{ marginTop: 0 }}>View: {value}</p>
        <SegmentedControl value={value} defaultValue="list" onValueChange={setValue}>
          <SegmentedControl.Option value="list">List</SegmentedControl.Option>
          <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
        </SegmentedControl>
      </>
    )
  },
}
