import type { Meta, StoryObj } from '@storybook/react-vite'

import { Bubble } from './Bubble'

const meta = {
  title: 'Components/Bubble',
  component: Bubble,
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <Bubble.Group>
      <Bubble variant="user" align="end">
        <Bubble.Content>User bubble</Bubble.Content>
      </Bubble>
      <Bubble variant="assistant">
        <Bubble.Content>Assistant bubble</Bubble.Content>
      </Bubble>
      <Bubble variant="outline">
        <Bubble.Content>Outline bubble</Bubble.Content>
      </Bubble>
      <Bubble variant="danger">
        <Bubble.Content>Something went wrong.</Bubble.Content>
      </Bubble>
    </Bubble.Group>
  ),
}
