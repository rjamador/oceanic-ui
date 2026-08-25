import type { Meta, StoryObj } from '@storybook/react-vite'

import { List } from './List'

const meta = {
  title: 'Components/List',
  component: List,
  args: {
    defaultValue: 'doc1',
    'aria-label': 'Files',
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <List {...args} style={{ width: 240 }}>
      <List.Item value="doc1">Document.docx</List.Item>
      <List.Item value="doc2">Photo.png</List.Item>
      <List.Item value="doc3">Budget.xlsx</List.Item>
      <List.Item value="doc4" disabled>
        Locked.zip
      </List.Item>
    </List>
  ),
}
