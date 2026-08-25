import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email',
    placeholder: 'ada@example.com',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: "We'll never share your email." },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    defaultValue: 'already taken',
    errorMessage: 'That username is already taken.',
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}
