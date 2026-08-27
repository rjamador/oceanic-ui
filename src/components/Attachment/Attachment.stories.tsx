import type { Meta, StoryObj } from '@storybook/react-vite'

import { CloseIcon, FileIcon, ImageIcon } from '../Icon'
import { Attachment } from './Attachment'

const meta = {
  title: 'Components/Attachment',
  component: Attachment,
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="aero-composer-frame p-3" style={{ maxWidth: 420 }}>
      <Attachment.Group>
        <Attachment size="sm">
          <Attachment.Media>
            <FileIcon size={16} />
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>readme.md</Attachment.Title>
            <Attachment.Description>4 KB</Attachment.Description>
          </Attachment.Content>
          <Attachment.Actions>
            <Attachment.Action aria-label="Remove readme.md" icon={<CloseIcon />} />
          </Attachment.Actions>
        </Attachment>
        <Attachment size="sm" state="error">
          <Attachment.Media>
            <ImageIcon size={16} />
          </Attachment.Media>
          <Attachment.Content>
            <Attachment.Title>photo.png</Attachment.Title>
            <Attachment.Description>Upload failed</Attachment.Description>
          </Attachment.Content>
        </Attachment>
      </Attachment.Group>
    </div>
  ),
}
