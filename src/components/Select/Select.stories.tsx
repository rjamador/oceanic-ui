import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Country',
    defaultValue: 'ar',
    children: (
      <>
        <option value="ar">Argentina</option>
        <option value="mx">México</option>
        <option value="es">España</option>
        <option value="us">United States</option>
      </>
    ),
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'We ship to select countries only.' },
}

export const WithError: Story = {
  args: { errorMessage: 'Please pick a country.' },
}

export const Disabled: Story = {
  args: { disabled: true },
}
