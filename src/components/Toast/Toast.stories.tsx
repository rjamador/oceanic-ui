import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { ToastProvider, useToast } from './Toast'

const meta = {
  title: 'Components/Toast',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const toast = useToast()

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button
        variant="primary"
        onClick={() => toast({ title: 'Saved', description: 'Your changes were saved.' })}
      >
        Trigger success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Upload failed',
            description: 'The file exceeds the 10MB limit.',
            variant: 'danger',
          })
        }
      >
        Trigger error
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}
