import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Slider } from './Slider'

// Arrow-key stepping on <input type="range"> is native browser behavior —
// this component doesn't implement it and jsdom doesn't simulate it, so
// that path is verified manually in the browser, not here (same category
// of gap as <dialog>'s showModal()/Escape; see vitest.setup.ts).

describe('Slider', () => {
  it('associates the label with the field', () => {
    render(<Slider label="Volume" defaultValue={50} />)

    expect(screen.getByLabelText('Volume')).toBeInTheDocument()
  })

  it('updates its value when changed', () => {
    render(<Slider label="Volume" defaultValue={50} min={0} max={100} />)

    const slider = screen.getByLabelText('Volume')
    fireEvent.change(slider, { target: { value: '75' } })

    expect(slider).toHaveValue('75')
  })

  it('renders as disabled', () => {
    render(<Slider label="Volume" defaultValue={50} disabled />)

    expect(screen.getByLabelText('Volume')).toBeDisabled()
  })
})
