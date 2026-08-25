import type { Meta, StoryObj } from '@storybook/react-vite'

import { Radio } from './Radio'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: {
    name: 'plan',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Free plan' },
}

export const Checked: Story = {
  args: { label: 'Free plan', defaultChecked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
}

export const Group: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio {...args} label="Free plan" defaultChecked />
      <Radio {...args} label="Pro plan" />
      <Radio {...args} label="Disabled" disabled />
    </div>
  ),
}
