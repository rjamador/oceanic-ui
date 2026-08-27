import type { Meta, StoryObj } from '@storybook/react-vite'

import { Marker } from './Marker'

const meta = {
  title: 'Components/Marker',
  component: Marker,
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Separator: Story = {
  render: () => (
    <Marker variant="separator">
      <Marker.Content>Today</Marker.Content>
    </Marker>
  ),
}
