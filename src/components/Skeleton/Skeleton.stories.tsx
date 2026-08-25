import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 240 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
}

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={80} height={40} />
    </div>
  ),
}

export const CardPlaceholder: Story = {
  render: () => (
    <Card padding="lg" style={{ width: 280 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" style={{ marginTop: 8 }} />
    </Card>
  ),
}
