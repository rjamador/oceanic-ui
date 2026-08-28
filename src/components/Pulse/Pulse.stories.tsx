import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { Pulse } from './Pulse'

const meta = {
  title: 'Components/Pulse',
  component: Pulse,
} satisfies Meta<typeof Pulse>

export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {}

export const Active: Story = {
  args: { active: true },
}

// Standalone mark a screen reader should announce (no visible label of its own).
export const Announced: Story = {
  args: { active: true, announce: true, label: 'Saving' },
}

// The usual case: next to its own visible label, so it stays decorative.
export const WithLabel: Story = {
  render: () => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Pulse active />
      <Text as="span" variant="labelMedium">
        Recording
      </Text>
    </span>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Pulse size="xs" active />
      <Pulse size="sm" active />
      <Pulse size="md" active />
      <Pulse size="lg" active />
    </div>
  ),
}
