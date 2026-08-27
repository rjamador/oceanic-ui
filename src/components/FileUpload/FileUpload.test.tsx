import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { FileUpload } from './FileUpload'

describe('FileUpload', () => {
  it('associates the dropzone with the file input', () => {
    render(<FileUpload label="Drop files here" />)

    expect(screen.getByLabelText('Drop files here')).toBeInTheDocument()
  })

  it('does not open a picker when disabled', () => {
    const onFiles = vi.fn()
    render(<FileUpload label="Drop files here" disabled onFiles={onFiles} />)

    expect(screen.getByLabelText('Drop files here')).toBeDisabled()
  })
})
