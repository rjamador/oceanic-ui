import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    title: 'Heads up',
    children: 'This is a persistent inline message.',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = { args: { variant: 'info' } }
export const Success: Story = { args: { variant: 'success', title: 'Saved' } }
export const Warning: Story = { args: { variant: 'warning', title: 'Unsaved changes' } }
export const Danger: Story = { args: { variant: 'danger', title: 'Upload failed' } }
export const Dismissible: Story = { args: { onDismiss: () => {} } }
