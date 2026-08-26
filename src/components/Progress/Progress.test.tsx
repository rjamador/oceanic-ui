import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Progress } from './Progress'

describe('Progress', () => {
  it('exposes value/min/max for a determinate progress bar', () => {
    render(<Progress value={40} label="Copying files" />)

    const bar = screen.getByRole('progressbar', { name: 'Copying files' })
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('clamps value within [0, max]', () => {
    render(<Progress value={150} max={100} label="Uploading" />)

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })

  it('omits aria-valuenow when indeterminate', () => {
    render(<Progress label="Loading" />)

    expect(screen.getByRole('progressbar', { name: 'Loading' })).not.toHaveAttribute(
      'aria-valuenow',
    )
  })

  it('respects a custom max when computing the clamped value', () => {
    render(<Progress value={5} max={10} label="Steps" />)

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '10')
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '5')
  })

  it('lets a consumer className fully override the composed background', () => {
    render(<Progress value={40} label="Copying files" className="bg-red-500" />)

    const bar = screen.getByRole('progressbar', { name: 'Copying files' })
    expect(bar.className).toContain('bg-red-500')
    expect(bar.className).not.toContain('aero-progress-track')
  })
})
