import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Card } from './Card'

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: 'var(--bg)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    padding: 'md',
    children: <p style={{ margin: 0 }}>Compact padding variant.</p>,
  },
}

export const WithContent: Story = {
  args: {
    padding: 'lg',
    children: (
      <>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
          Glass panel
        </h2>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
          A frosted surface with a soft specular highlight across the top.
        </p>
        <Button variant="primary" size="sm">
          Action
        </Button>
      </>
    ),
  },
}
