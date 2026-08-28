import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Thinking } from './Thinking'

const meta = {
  title: 'Components/Thinking',
  component: Thinking,
} satisfies Meta<typeof Thinking>

export default meta
type Story = StoryObj<typeof meta>

const TRACE = `Weigh the two layouts against the constraints.
The disclosure is behaviour, the chrome is the design system.
Keep the mark as glow, not gloss.`

export const Streaming: Story = {
  args: {
    streaming: true,
    children: TRACE,
  },
}

export const Settled: Story = {
  args: {
    duration: 8,
    defaultOpen: true,
    children: TRACE,
  },
}

// No children — the header is a plain label, the toggle is disabled.
export const NoTrace: Story = {
  args: { duration: 3 },
}

// A long unbroken token must wrap, not push the page wider.
export const NarrowWithLongToken: Story = {
  args: {
    duration: 6,
    defaultOpen: true,
    children:
      'Considered https://example.com/a/deeply/nested/path/no/spaces/anywhere/in/this/string and rejected it.',
  },
  parameters: { viewport: { defaultViewport: 'narrow' } },
}

export const Toggle: Story = {
  render: function ToggleDemo() {
    const [streaming, setStreaming] = useState(true)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
        <Thinking streaming={streaming} duration={streaming ? null : 5}>
          {TRACE}
        </Thinking>
        <Button variant="secondary" size="sm" onClick={() => setStreaming((value) => !value)}>
          {streaming ? 'Finish thinking' : 'Think again'}
        </Button>
      </div>
    )
  },
}
