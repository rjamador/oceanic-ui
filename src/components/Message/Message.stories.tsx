import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '../Avatar'
import { Bubble } from '../Bubble'
import { Message } from './Message'

const meta = {
  title: 'Components/Message',
  component: Message,
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Thread: Story = {
  render: () => (
    <Message.Group style={{ maxWidth: 480 }}>
      <Message>
        <Message.Avatar>
          <Avatar name="Ocean" size="sm" />
        </Message.Avatar>
        <Message.Content>
          <Message.Header>Assistant</Message.Header>
          <Bubble variant="assistant">
            <Bubble.Content>How can I help with this project?</Bubble.Content>
          </Bubble>
        </Message.Content>
      </Message>
      <Message align="end">
        <Message.Avatar>
          <Avatar name="Ada" size="sm" />
        </Message.Avatar>
        <Message.Content>
          <Message.Header>You</Message.Header>
          <Bubble variant="user" align="end">
            <Bubble.Content>Add a composer like zest.</Bubble.Content>
          </Bubble>
        </Message.Content>
      </Message>
    </Message.Group>
  ),
}
