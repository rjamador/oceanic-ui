import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { FolderOpenIcon, TrashIcon } from '../Icon'
import { IconButton } from '../IconButton'
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

/**
 * A queued-message list is not built into Composer — a host that needs one
 * renders it themselves in the `above` slot. This is that pattern.
 */
function QueueDemo() {
  const [value, setValue] = useState('')
  const [queue, setQueue] = useState(['Draft the migration guide', 'Then run the benchmarks'])

  return (
    <div style={{ maxWidth: 560 }}>
      <Composer
        value={value}
        onChange={setValue}
        onSubmit={() => {
          if (value.trim()) setQueue((q) => [...q, value.trim()])
          setValue('')
        }}
        above={
          queue.length > 0 ? (
            <div
              className="mb-2 rounded-[var(--radius-lg)] border border-[var(--control-secondary-border)] bg-[var(--recessed-surface)] p-2"
            >
              <div className="flex items-center justify-between px-1 pb-1.5">
                <Text as="span" variant="labelSmall" color="muted">
                  {queue.length} queued
                </Text>
                <Button variant="secondary" size="sm" onClick={() => setQueue([])}>
                  Send all
                </Button>
              </div>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {queue.map((text, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--control-secondary-top)] p-1.5"
                  >
                    <Text as="span" variant="labelSmall" className="min-w-0 flex-1 truncate">
                      {text}
                    </Text>
                    <IconButton
                      type="button"
                      variant="ghost"
                      size="sm"
                      aria-label={`Remove "${text}" from the queue`}
                      icon={<TrashIcon />}
                      onClick={() => setQueue((q) => q.filter((_, i) => i !== index))}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        }
      />
    </div>
  )
}

export const WithQueuedMessages: Story = {
  args: { value: '', onChange: () => {}, onSubmit: () => {} },
  render: () => <QueueDemo />,
}
