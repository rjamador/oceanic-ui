import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Bubble } from './Bubble'

describe('Bubble', () => {
  it('renders content', () => {
    render(
      <Bubble variant="user">
        <Bubble.Content>Hi</Bubble.Content>
      </Bubble>,
    )

    expect(screen.getByText('Hi')).toBeInTheDocument()
  })
})
