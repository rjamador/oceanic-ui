import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from '../Avatar'
import { Bubble } from '../Bubble'
import { Message } from './Message'

describe('Message', () => {
  it('renders aligned chat content', () => {
    render(
      <Message.Group>
        <Message align="end">
          <Message.Avatar>
            <Avatar name="Ada" size="sm" />
          </Message.Avatar>
          <Message.Content>
            <Message.Header>You</Message.Header>
            <Bubble variant="user" align="end">
              <Bubble.Content>Hello</Bubble.Content>
            </Bubble>
          </Message.Content>
        </Message>
      </Message.Group>,
    )

    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('You')).toBeInTheDocument()
  })
})
