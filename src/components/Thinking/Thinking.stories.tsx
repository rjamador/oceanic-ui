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

const TRACE = `The composer already owns send/stop.
A sidebar is layout, not state.
Keep the pulse as glow, not gloss.`

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
