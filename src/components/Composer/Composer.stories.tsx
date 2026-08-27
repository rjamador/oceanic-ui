import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { FolderOpenIcon } from '../Icon'
import { Text } from '../Text'
import { Composer, type ComposerAttachmentItem } from './Composer'

const meta = {
  title: 'Components/Composer',
  component: Composer,
} satisfies Meta<typeof Composer>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const [attachments, setAttachments] = useState<ComposerAttachmentItem[]>([
    { id: 'demo-notes', name: 'notes.txt', detail: '12 KB', kind: 'file' },
  ])

  return (
    <div style={{ maxWidth: 560 }}>
      <Composer
        value={value}
        onChange={setValue}
        sending={sending}
        attachments={attachments}
        onRemoveAttachment={(id) => setAttachments((items) => items.filter((item) => item.id !== id))}
        onAttachFiles={() =>
          setAttachments((items) => [
            ...items,
            { id: String(Date.now()), name: 'notes.txt', detail: '12 KB', kind: 'file' },
          ])
        }
        onPasteImages={(files) =>
          setAttachments((items) => [
            ...items,
            ...files.map((file) => ({
              id: `${file.name}-${file.size}`,
              name: file.name,
              kind: 'image' as const,
              previewUrl: URL.createObjectURL(file),
            })),
          ])
        }
        commands={[
          { name: 'plan', description: 'Write a step-by-step plan' },
          { name: 'review', description: 'Review the current file' },
        ]}
        leading={
          <Text as="span" variant="labelSmall" color="muted" className="px-2">
            ocean-4
          </Text>
        }
        footer={
          <>
            <Text as="span" variant="labelMedium" className="inline-flex items-center gap-1.5">
              <FolderOpenIcon size={16} />
              oceanic-ui
            </Text>
            <Text as="span" variant="labelMedium" color="muted">
              Enter to send
            </Text>
          </>
        }
        onSubmit={() => {
          setSending(true)
          window.setTimeout(() => {
            setSending(false)
            setValue('')
            setAttachments([])
          }, 1200)
        }}
        onStop={() => setSending(false)}
      />
    </div>
  )
}

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    onSubmit: () => {},
  },
  render: () => <Demo />,
}
