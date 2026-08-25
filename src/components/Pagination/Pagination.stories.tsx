import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  // Every story below drives page/onPageChange via its own `render` and
  // local state — this placeholder only exists to satisfy the required prop types.
  args: { page: 1, pageCount: 1, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination page={page} pageCount={5} onPageChange={setPage} />
  },
}

export const LongRange: Story = {
  render: () => {
    const [page, setPage] = useState(10)
    return <Pagination page={page} pageCount={20} onPageChange={setPage} />
  },
}

export const Edges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination page={1} pageCount={8} onPageChange={() => {}} />
      <Pagination page={8} pageCount={8} onPageChange={() => {}} />
    </div>
  ),
}
