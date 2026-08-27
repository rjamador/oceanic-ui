import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FileIcon } from '../Icon'
import { Empty } from './Empty'

describe('Empty', () => {
  it('renders title and description', () => {
    render(
      <Empty>
        <Empty.Header>
          <Empty.Media variant="icon">
            <FileIcon />
          </Empty.Media>
          <Empty.Title>No messages</Empty.Title>
          <Empty.Description>Start a conversation below.</Empty.Description>
        </Empty.Header>
      </Empty>,
    )

    expect(screen.getByText('No messages')).toBeInTheDocument()
    expect(screen.getByText('Start a conversation below.')).toBeInTheDocument()
  })
})
