import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Text } from './Text'

describe('Text', () => {
  it('renders its children', () => {
    render(<Text>Hello</Text>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders the default element for each variant', () => {
    render(<Text variant="displayLarge">Title</Text>)
    expect(screen.getByText('Title').tagName).toBe('H1')

    render(<Text variant="bodySmall">Copy</Text>)
    expect(screen.getByText('Copy').tagName).toBe('P')

    render(<Text variant="labelSmall">Caption</Text>)
    expect(screen.getByText('Caption').tagName).toBe('SPAN')
  })

  it('overrides the element via the as prop without changing the variant styling class', () => {
    render(
      <Text variant="headingSmall" as="div">
        Card title
      </Text>,
    )

    const el = screen.getByText('Card title')
    expect(el.tagName).toBe('DIV')
  })

  it('forwards a ref to the underlying element', () => {
    let node: HTMLElement | null = null
    render(
      <Text
        ref={(el) => {
          node = el
        }}
      >
        Ref me
      </Text>,
    )

    expect(node).toBeInstanceOf(HTMLParagraphElement)
  })
})
