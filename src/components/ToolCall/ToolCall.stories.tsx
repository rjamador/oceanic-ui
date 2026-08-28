import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { FileTextIcon, GearIcon } from '../Icon'
import { ToolCall } from './ToolCall'

const meta = {
  title: 'Components/ToolCall',
  component: ToolCall,
} satisfies Meta<typeof ToolCall>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Read',
    name: 'read_file',
    target: 'src/lib/cn.ts',
    children: 'export function cn() { … }',
  },
}

// No `label` — the verb falls back to `name` with underscores as spaces.
export const NameOnly: Story = {
  args: {
    name: 'fetch_url',
    target: 'https://example.com/a/very/long/path/that/should/ellipsize/cleanly',
  },
}

export const Running: Story = {
  args: {
    label: 'Run',
    target: 'npm run test',
    status: 'running',
    icon: <GearIcon size={14} />,
  },
}

export const ErrorRow: Story = {
  args: {
    label: 'Write',
    target: 'src/missing.ts',
    status: 'error',
    children: 'ENOENT: no such file or directory',
    defaultOpen: true,
  },
}

export const NonInteractive: Story = {
  args: { label: 'Read', target: 'package.json' },
}

export const Pending: Story = {
  args: {
    label: 'Run',
    target: 'rm -rf dist',
    status: 'pending',
    icon: <GearIcon size={14} />,
    actions: (
      <>
        <Button variant="ghost" size="sm">
          Deny
        </Button>
        <Button variant="primary" size="sm">
          Allow once
        </Button>
      </>
    ),
  },
}

export const PendingNarrow: Story = {
  ...Pending,
  parameters: { viewport: { defaultViewport: 'narrow' } },
}

export const Group: Story = {
  render: () => (
    <ToolCall.Group label="Inspected 3 files" defaultOpen>
      <ToolCall label="Read" target="src/components/Avatar/Avatar.tsx" />
      <ToolCall label="Read" target="src/components/Composer/Composer.tsx" />
      <ToolCall label="Search" target="ocean swing look and feel" icon={<FileTextIcon size={14} />} />
    </ToolCall.Group>
  ),
}

export const GroupWithDiff: Story = {
  render: () => (
    <ToolCall.Group label="Edited 2 files" added={14} removed={6} defaultOpen>
      <ToolCall label="Edit" target="src/index.ts" icon={<FileTextIcon size={14} />} />
      <ToolCall label="Edit" target="docs/roadmap.md" />
    </ToolCall.Group>
  ),
}

export const GroupWithErrors: Story = {
  render: () => (
    <ToolCall.Group label="Ran 4 checks" errors={2} defaultOpen>
      <ToolCall label="Run" target="lint" />
      <ToolCall label="Run" target="typecheck" status="error" />
    </ToolCall.Group>
  ),
}
