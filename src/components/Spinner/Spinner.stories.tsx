import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Spinner } from './Spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Spinner size={14} />
      <Spinner size={20} />
      <Spinner size={32} />
      <Spinner size={48} />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button variant="primary" disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Spinner size={14} label="Saving" />
      Saving…
    </Button>
  ),
}
