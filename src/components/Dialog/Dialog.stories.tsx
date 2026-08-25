import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../Button'
import { Dialog } from './Dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  // Both stories drive `open`/`onClose` from local state via `render`
  // instead of static `args` — Dialog has no sensible default open/onClose,
  // so these placeholders only exist to satisfy the required prop types.
  args: { open: false, onClose: () => {}, children: null },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)} title="Delete file">
          <p style={{ margin: '0 0 16px' }}>
            Are you sure you want to delete this file? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </div>
        </Dialog>
      </>
    )
  },
}

export const WithoutTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open untitled dialog</Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <p style={{ margin: 0 }}>A dialog with no header/close button.</p>
        </Dialog>
      </>
    )
  },
}
