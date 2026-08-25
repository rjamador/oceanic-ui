import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself…',
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'Max 200 characters.' },
}

export const WithError: Story = {
  args: { defaultValue: 'x'.repeat(210), errorMessage: 'Bio is too long.' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
