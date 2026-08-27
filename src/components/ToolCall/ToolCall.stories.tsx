import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { FileTextIcon, GlobeIcon, TerminalIcon } from '../Icon'
import { ToolCall } from './ToolCall'

const meta = {
  title: 'Components/ToolCall',
  component: ToolCall,
} satisfies Meta<typeof ToolCall>

export default meta
type Story = StoryObj<typeof meta>

export const Read: Story = {
  args: {
    name: 'read_file',
    target: 'src/lib/cn.ts',
    children: 'export function cn() { … }',
  },
}

export const Running: Story = {
  args: {
    name: 'bash',
    target: 'bun run test',
    status: 'running',
    icon: <TerminalIcon size={14} />,
  },
}

export const ErrorRow: Story = {
  args: {
    name: 'write_file',
    target: 'src/missing.ts',
    status: 'error',
    children: 'ENOENT: no such file or directory',
    defaultOpen: true,
  },
}

export const Pending: Story = {
  args: {
    name: 'bash',
    target: 'rm -rf dist',
    status: 'pending',
    icon: <TerminalIcon size={14} />,
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

export const Group: Story = {
  render: () => (
    <ToolCall.Group label="Inspected 3 files" defaultOpen>
      <ToolCall name="read_file" target="src/components/Avatar/Avatar.tsx" />
      <ToolCall name="read_file" target="src/components/Composer/Composer.tsx" />
      <ToolCall
        name="web_search"
        target="ocean swing look and feel"
        icon={<GlobeIcon size={14} />}
      />
    </ToolCall.Group>
  ),
}

export const GroupWithDiff: Story = {
  render: () => (
    <ToolCall.Group label="Edited 2 files" added={14} removed={6} defaultOpen>
      <ToolCall name="edit_file" target="src/index.ts" icon={<FileTextIcon size={14} />} />
      <ToolCall name="edit_file" target="docs/roadmap.md" />
    </ToolCall.Group>
  ),
}
