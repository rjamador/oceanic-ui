import type { Meta, StoryObj } from '@storybook/react-vite'

import { FileUpload } from './FileUpload'

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  args: {
    label: 'Drop files here, or click to browse',
    helperText: 'PNG, JPG, or PDF up to 10MB.',
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
