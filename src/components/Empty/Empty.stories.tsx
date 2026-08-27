import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileIcon } from '../Icon'
import { Empty } from './Empty'

const meta = {
  title: 'Components/Empty',
  component: Empty,
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty>
      <Empty.Header>
        <Empty.Media variant="icon">
          <FileIcon />
        </Empty.Media>
        <Empty.Title>No messages yet</Empty.Title>
        <Empty.Description>Ask about this project to get started.</Empty.Description>
      </Empty.Header>
    </Empty>
  ),
}
