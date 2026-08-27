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

  it('styles the content surface from the bubble variant', () => {
    render(
      <Bubble variant="danger">
        <Bubble.Content>Nope</Bubble.Content>
      </Bubble>,
    )

    expect(screen.getByText('Nope')).toHaveClass('aero-bubble-content-danger')
  })

  it('lets a className on Content replace the variant surface', () => {
    render(
      <Bubble variant="user">
        <Bubble.Content className="bg-red-500">Hi</Bubble.Content>
      </Bubble>,
    )

    const content = screen.getByText('Hi')
    expect(content).toHaveClass('bg-red-500')
    expect(content).not.toHaveClass('aero-bubble-content-user')
    expect(content).toHaveClass('aero-bubble-content')
  })
})
