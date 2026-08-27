import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Marker } from './Marker'

describe('Marker', () => {
  it('renders separator copy', () => {
    render(
      <Marker variant="separator">
        <Marker.Content>Today</Marker.Content>
      </Marker>,
    )

    expect(screen.getByText('Today')).toBeInTheDocument()
  })
})
