import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders every page number when the total is small', () => {
    render(<Pagination page={1} pageCount={4} onPageChange={vi.fn()} />)

    for (const label of ['1', '2', '3', '4']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
  })

  it('marks the current page with aria-current', () => {
    render(<Pagination page={2} pageCount={5} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: '1' })).not.toHaveAttribute('aria-current')
  })

  it('truncates a long page range with an ellipsis', () => {
    render(<Pagination page={10} pageCount={20} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '5' })).not.toBeInTheDocument()
  })

  it('calls onPageChange when a page number is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: '3' }))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('disables Previous on the first page and Next on the last page', () => {
    render(<Pagination page={1} pageCount={3} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled()
  })

  it('steps forward when Next is clicked', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />)

    await user.click(screen.getByRole('button', { name: 'Next page' }))

    expect(onPageChange).toHaveBeenCalledWith(3)
  })
})
