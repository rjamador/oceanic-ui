import type { Meta, StoryObj } from '@storybook/react-vite'

import { Accordion } from './Accordion'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} style={{ width: 360 }}>
      <Accordion.Item title="Shipping" defaultOpen>
        Ships in 3-5 business days via standard courier.
      </Accordion.Item>
      <Accordion.Item title="Returns">
        Returns are accepted within 30 days of delivery.
      </Accordion.Item>
      <Accordion.Item title="Warranty">Covered for 1 year against manufacturing defects.</Accordion.Item>
    </Accordion>
  ),
}

export const Exclusive: Story = {
  args: { exclusive: true },
  render: (args) => (
    <Accordion {...args} style={{ width: 360 }}>
      <Accordion.Item title="Shipping" defaultOpen>
        Ships in 3-5 business days via standard courier.
      </Accordion.Item>
      <Accordion.Item title="Returns">
        Returns are accepted within 30 days of delivery.
      </Accordion.Item>
      <Accordion.Item title="Warranty">Covered for 1 year against manufacturing defects.</Accordion.Item>
    </Accordion>
  ),
}
