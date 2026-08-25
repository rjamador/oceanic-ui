import type { Meta, StoryObj } from '@storybook/react-vite'

import { Switch } from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Airplane mode',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}
