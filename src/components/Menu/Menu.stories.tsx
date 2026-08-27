import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { FileIcon, FolderOpenIcon } from '../Icon'
import { Menu } from './Menu'

const meta = {
  title: 'Components/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: null },
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button variant="secondary">Add context</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>
          <FileIcon size={16} />
          Upload files
        </Menu.Item>
        <Menu.Item>
          <FolderOpenIcon size={16} />
          Open folder
        </Menu.Item>
      </Menu.Content>
    </Menu>
  ),
}
