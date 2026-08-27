import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '../Avatar'
import { Bubble } from '../Bubble'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FolderIcon,
  FolderOpenIcon,
  NodesIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  SlidersIcon,
  TrashIcon,
} from '../Icon'
import { IconButton } from '../IconButton'
import { Message } from '../Message'
import { Pulse } from '../Pulse'
import { Text } from '../Text'
import { Thinking } from '../Thinking'
import { ToolCall } from '../ToolCall'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function ChatSidebar({
  open,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [active, setActive] = useState('hi')

  return (
    <Sidebar
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen
      style={{ height: 520 }}
      aria-label="Chat history"
    >
      <Sidebar.Header>
        <IconButton type="button" variant="ghost" size="sm" icon={<ChevronLeftIcon />} aria-label="Back" />
        <IconButton
          type="button"
          variant="ghost"
          size="sm"
          icon={<ChevronRightIcon />}
          aria-label="Forward"
          disabled
        />
      </Sidebar.Header>
      <Sidebar.Body>
        <Sidebar.Nav>
          <Sidebar.NavItem icon={<PencilIcon size={16} />} onClick={() => setActive('new')}>
            New chat
          </Sidebar.NavItem>
          <Sidebar.NavItem icon={<SearchIcon size={16} />}>Search</Sidebar.NavItem>
          <Sidebar.NavItem icon={<SlidersIcon size={16} />}>Customize</Sidebar.NavItem>
        </Sidebar.Nav>
        <Sidebar.Section aria-labelledby="projects-heading">
          <Sidebar.SectionHeader
            icon={<FolderIcon size={14} />}
            count={1}
            action={
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                icon={<PlusIcon />}
                aria-label="Open project folder"
                className="size-6"
              />
            }
          >
            <span id="projects-heading">Projects</span>
          </Sidebar.SectionHeader>
          <Sidebar.Group title="Aero-Webring" icon={<FolderOpenIcon size={14} />} defaultOpen>
            <Text as="span" variant="labelSmall" color="muted" className="px-2 py-1">
              No chats yet
            </Text>
          </Sidebar.Group>
        </Sidebar.Section>
        <Sidebar.Section aria-labelledby="recent-heading">
          <Sidebar.SectionHeader icon={<ClockIcon size={14} />}>
            <span id="recent-heading">Recent</span>
          </Sidebar.SectionHeader>
          <Sidebar.Item
            active={active === 'hi'}
            onClick={() => setActive('hi')}
            avatar={<Avatar name="Ocean" size="sm" />}
            meta="8m"
            trailing={
              <IconButton
                type="button"
                variant="ghost"
                size="sm"
                icon={<TrashIcon />}
                aria-label="Delete Hi"
                className="size-6"
              />
            }
          >
            Hi
          </Sidebar.Item>
          <Sidebar.Item
            active={active === 'composer'}
            onClick={() => setActive('composer')}
            avatar={<Avatar name="Ocean" size="sm" />}
            meta={<Pulse size="xs" active aria-hidden />}
            trailing={
              <span className="inline-flex items-center gap-0.5">
                <NodesIcon size={14} />
                <IconButton
                  type="button"
                  variant="ghost"
                  size="sm"
                  icon={<TrashIcon />}
                  aria-label="Delete Wire the composer"
                  className="size-6"
                />
              </span>
            }
          >
            Wire the composer
          </Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Body>
      <Sidebar.Footer>
        <Sidebar.Item
          avatar={<Avatar name="Ada Lovelace" size="sm" />}
          description="Ocean · oceanic-ui"
        >
          Ada Lovelace
        </Sidebar.Item>
      </Sidebar.Footer>
    </Sidebar>
  )
}

export const Open: Story = {
  render: () => <ChatSidebar />,
}

export const Collapsed: Story = {
  render: () => <ChatSidebar open={false} />,
}

export const ChatShell: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        height: 560,
        overflow: 'hidden',
        border: '1px solid var(--hairline)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--panel-surface-strong)',
      }}
    >
      <ChatSidebar />
      <div
        style={{
          display: 'flex',
          minWidth: 0,
          flex: 1,
          flexDirection: 'column',
          gap: 12,
          padding: 16,
        }}
      >
        <Thinking streaming>The composer already owns send and stop.</Thinking>
        <ToolCall name="read_file" target="src/components/Composer/Composer.tsx" defaultOpen>
          export function Composer() {'{'} … {'}'}
        </ToolCall>
        <Message.Group>
          <Message>
            <Message.Avatar>
              <Avatar name="Ocean" size="sm" />
            </Message.Avatar>
            <Message.Content>
              <Bubble variant="assistant">
                <Bubble.Content>How can I help with this project?</Bubble.Content>
              </Bubble>
            </Message.Content>
          </Message>
        </Message.Group>
      </div>
    </div>
  ),
}
