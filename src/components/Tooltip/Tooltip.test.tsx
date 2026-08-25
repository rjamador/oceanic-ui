import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../Button'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('associates the trigger with the tooltip via aria-describedby', () => {
    render(
      <Tooltip content="Save your changes">
        <Button>Save</Button>
      </Tooltip>,
    )

    const trigger = screen.getByRole('button', { name: 'Save' })
    const tooltip = screen.getByRole('tooltip')

    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id)
    expect(tooltip).toHaveTextContent('Save your changes')
  })

  it('preserves the trigger element and its own props', () => {
    render(
      <Tooltip content="Delete">
        <Button variant="ghost">Remove</Button>
      </Tooltip>,
    )

    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument()
  })
})
