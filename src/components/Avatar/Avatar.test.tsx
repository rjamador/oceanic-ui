import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Avatar } from './Avatar'

describe('Avatar', () => {
  it('renders initials from a name when there is no image', () => {
    render(<Avatar name="Ada Lovelace" />)

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL')
  })

  it('renders a single initial for a one-word name', () => {
    render(<Avatar name="Ada" />)

    expect(screen.getByRole('img', { name: 'Ada' })).toHaveTextContent('A')
  })

  it('renders an image when src is provided', () => {
    const { container } = render(<Avatar src="/ada.png" name="Ada Lovelace" />)

    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', '/ada.png')
  })

  it('has no accessible name when purely decorative', () => {
    render(<Avatar data-testid="avatar" />)

    expect(screen.getByTestId('avatar')).not.toHaveAttribute('role')
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<Avatar name="Ada Lovelace" className="bg-red-500" />)

    const avatar = screen.getByRole('img', { name: 'Ada Lovelace' })
    expect(avatar.className).toContain('bg-red-500')
    expect(avatar.className).not.toContain('bg-[var(--control-secondary-mid)]')
  })
})
