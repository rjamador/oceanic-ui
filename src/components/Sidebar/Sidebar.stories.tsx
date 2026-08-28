import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '../Avatar'
import {
  FileTextIcon,
  FolderOpenIcon,
  GearIcon,
  HomeIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  UserIcon,
} from '../Icon'
import { IconButton } from '../IconButton'
import { Text } from '../Text'
import { Sidebar } from './index'
import type { SidebarCollapsible, SidebarSide, SidebarVariant } from './context'

const meta = {
  title: 'Components/Sidebar',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '560px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function TopBar() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        height: 'var(--space-12)',
        padding: '0 var(--space-3)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <Sidebar.Trigger />
      <Text as="span" variant="labelLarge">
        Dashboard
      </Text>
    </header>
  )
}

/* ─── Navigation ─────────────────────────────────────────────────────── */

function NavExample({
  side = 'left',
  collapsible = 'icon',
  variant = 'plain',
}: {
  side?: SidebarSide
  collapsible?: SidebarCollapsible
  variant?: SidebarVariant
}) {
  return (
    <Sidebar.Provider side={side} collapsible={collapsible} variant={variant}>
      <Sidebar aria-label="Primary">
        <Sidebar.Header>
          <Avatar name="Acme Inc" size="sm" />
          <Text as="span" variant="labelLarge" className="min-w-0 flex-1 truncate">
            Acme Inc
          </Text>
        </Sidebar.Header>
        <Sidebar.Rail />
        <Sidebar.Body>
          <Sidebar.Group label="Workspace">
            <Sidebar.Menu>
              <Sidebar.Item icon={<HomeIcon size={16} />} active label="Overview">
                Overview
              </Sidebar.Item>
              <Sidebar.Item icon={<FileTextIcon size={16} />} label="Documents" badge="24">
                Documents
              </Sidebar.Item>
              <Sidebar.Item
                icon={<FolderOpenIcon size={16} />}
                label="Projects"
                subMenu={
                  <Sidebar.Menu>
                    <Sidebar.Item asChild>
                      <a href="#aurora">Aurora</a>
                    </Sidebar.Item>
                    <Sidebar.Item asChild>
                      <a href="#borealis">Borealis</a>
                    </Sidebar.Item>
                  </Sidebar.Menu>
                }
              >
                Projects
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Group label="Account" collapsible defaultOpen>
            <Sidebar.Menu>
              <Sidebar.Item icon={<GearIcon size={16} />} label="Settings">
                Settings
              </Sidebar.Item>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<UserIcon size={16} />} label="Ada Lovelace">
            Ada Lovelace
          </Sidebar.Item>
        </Sidebar.Footer>
      </Sidebar>
      <Sidebar.Main>
        <TopBar />
        <div style={{ padding: 'var(--space-4)' }}>
          <Text variant="bodyMedium" color="muted">
            The same panel — nav here, chat history in the next story. Toggle it from the top bar or
            the rail on the panel edge.
          </Text>
        </div>
      </Sidebar.Main>
    </Sidebar.Provider>
  )
}

export const Navigation: Story = { render: () => <NavExample /> }

export const Inset: Story = { render: () => <NavExample variant="inset" /> }

export const RightSide: Story = { render: () => <NavExample side="right" /> }

export const Offcanvas: Story = { render: () => <NavExample collapsible="offcanvas" /> }

export const NonCollapsible: Story = { render: () => <NavExample collapsible="none" /> }

export const CollapsedToIcons: Story = {
  render: () => (
    <Sidebar.Provider defaultOpen={false} collapsible="icon">
      <NavIconRail />
    </Sidebar.Provider>
  ),
}

function NavIconRail() {
  return (
    <>
      <Sidebar aria-label="Primary">
        <Sidebar.Header>
          <Avatar name="Acme Inc" size="sm" />
        </Sidebar.Header>
        <Sidebar.Rail />
        <Sidebar.Body>
          <Sidebar.Menu>
            <Sidebar.Item icon={<HomeIcon size={16} />} active label="Overview">
              Overview
            </Sidebar.Item>
            <Sidebar.Item icon={<FileTextIcon size={16} />} label="Documents">
              Documents
            </Sidebar.Item>
            <Sidebar.Item icon={<GearIcon size={16} />} label="Settings">
              Settings
            </Sidebar.Item>
          </Sidebar.Menu>
        </Sidebar.Body>
      </Sidebar>
      <Sidebar.Main>
        <TopBar />
      </Sidebar.Main>
    </>
  )
}

/* ─── Chat history ───────────────────────────────────────────────────── */

const THREADS = [
  { id: 't1', title: 'Ocean gradient tokens', at: '2m' },
  { id: 't2', title: 'Composer send/stop swap', at: '1h' },
  { id: 't3', title: 'Sidebar drawer on mobile', at: 'Yesterday' },
]

export const ChatHistory: Story = {
  render: function ChatHistoryStory() {
    return (
      <Sidebar.Provider>
        <Sidebar aria-label="Chat history">
          <Sidebar.Header>
            <IconButton variant="ghost" size="sm" icon={<PencilIcon />} aria-label="New chat" />
            <Text as="span" variant="labelLarge" className="min-w-0 flex-1 truncate">
              Chats
            </Text>
            <Sidebar.Trigger aria-label="Collapse" />
          </Sidebar.Header>
          <Sidebar.Rail />
          <Sidebar.Body>
            <Sidebar.Menu>
              <Sidebar.Item icon={<PlusIcon size={16} />} label="New chat">
                New chat
              </Sidebar.Item>
              <Sidebar.Item icon={<SearchIcon size={16} />} label="Search">
                Search
              </Sidebar.Item>
            </Sidebar.Menu>
            <Sidebar.Group label="Recent">
              <Sidebar.Menu>
                {THREADS.map((thread, i) => (
                  <Sidebar.Item
                    key={thread.id}
                    active={i === 0}
                    aria-current={i === 0 ? 'true' : undefined}
                    badge={thread.at}
                    label={thread.title}
                    action={
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<TrashIcon />}
                        aria-label={`Delete ${thread.title}`}
                        className="size-6"
                      />
                    }
                  >
                    {thread.title}
                  </Sidebar.Item>
                ))}
              </Sidebar.Menu>
            </Sidebar.Group>
          </Sidebar.Body>
          <Sidebar.Footer>
            <Sidebar.Item icon={<Avatar name="Ada" size="sm" />} label="Ada Lovelace">
              Ada Lovelace
            </Sidebar.Item>
          </Sidebar.Footer>
        </Sidebar>
        <Sidebar.Main>
          <TopBar />
          <div style={{ padding: 'var(--space-4)' }}>
            <Text variant="bodyMedium" color="muted">
              Hover a thread to reveal its delete action.
            </Text>
          </div>
        </Sidebar.Main>
      </Sidebar.Provider>
    )
  },
}

export const MobileDrawer: Story = {
  parameters: { viewport: { defaultViewport: 'mobile' } },
  render: () => <NavExample />,
}
