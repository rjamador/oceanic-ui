/* eslint-disable react-refresh/only-export-components -- reason: this file is a
   registry of demo scenes — the scene components and the ENTRIES array that
   indexes them belong together to stay readable. Fast-refresh degrades to a
   full reload for this one site file, which is fine. */
import { useState, type ReactNode } from 'react'
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Bubble,
  Button,
  Card,
  Checkbox,
  CodeBlock,
  Composer,
  Dialog,
  Divider,
  Empty,
  FileIcon,
  FileUpload,
  FolderOpenIcon,
  HomeIcon,
  IconButton,
  Input,
  List,
  Marker,
  Menu,
  Message,
  Pagination,
  Popover,
  Progress,
  Pulse,
  Radio,
  SearchIcon,
  SegmentedControl,
  Select,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Text,
  Thinking,
  ToolCall,
  Tooltip,
  TrashIcon,
  useToast,
} from 'oceanic-ui'

export interface Entry {
  id: string
  label: string
  group: string
  Scene: () => ReactNode
  code: string
}

/* ─── Chat ───────────────────────────────────────────────────────────── */

function AssistantThread() {
  return (
    <div className="ws-canvas">
      <Message.Group>
        <Marker variant="separator">
          <Marker.Content>Today</Marker.Content>
        </Marker>
        <Message>
          <Message.Avatar>
            <Avatar name="Ocean" size="sm" />
          </Message.Avatar>
          <Message.Content>
            <Bubble variant="assistant">
              <Bubble.Content>Looking at the two demo layouts now.</Bubble.Content>
            </Bubble>
          </Message.Content>
        </Message>
        <Thinking duration={7} defaultOpen>
          Both fit the constraints. The rail-and-stage split scales as we add components; the tab
          grid doesn&rsquo;t &mdash; every new one just fights for a cell. Going with the rail.
        </Thinking>
        <ToolCall.Group label="Read 3 files" defaultOpen>
          <ToolCall label="Read" target="src/sections/Showcase.tsx" />
          <ToolCall label="Read" target="src/components/Demo.tsx" />
          <ToolCall label="Read" target="src/styles/landing.css" />
        </ToolCall.Group>
        <ToolCall label="Edit" target="src/sections/Showcase.tsx" status="running" />
        <Message>
          <Message.Avatar>
            <Avatar name="Ocean" size="sm" />
          </Message.Avatar>
          <Message.Content>
            <Bubble variant="assistant">
              <Bubble.Content>Rebuilt it as a workspace &mdash; rail on the left, stage here.</Bubble.Content>
            </Bubble>
          </Message.Content>
        </Message>
        <Message align="end">
          <Message.Avatar>
            <Avatar name="Denis Martínez" size="sm" />
          </Message.Avatar>
          <Message.Content>
            <Bubble variant="user" align="end">
              <Bubble.Content>Ship it.</Bubble.Content>
            </Bubble>
          </Message.Content>
        </Message>
      </Message.Group>
      <ThreadComposer />
    </div>
  )
}

function ThreadComposer() {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  return (
    <Composer
      className="w-full"
      value={value}
      onChange={setValue}
      sending={sending}
      commands={[
        { name: 'plan', description: 'Write a step-by-step plan' },
        { name: 'review', description: 'Review the current file' },
      ]}
      footer={
        <>
          <Text as="span" variant="labelMedium" className="inline-flex items-center gap-1.5">
            <FolderOpenIcon size={16} />
            oceanic-ui
          </Text>
          <Text as="span" variant="labelMedium" color="muted">
            Enter to send
          </Text>
        </>
      }
      onSubmit={() => {
        if (!value.trim()) return
        setSending(true)
        window.setTimeout(() => {
          setSending(false)
          setValue('')
        }, 1200)
      }}
      onStop={() => setSending(false)}
    />
  )
}

function ReasoningAndTools() {
  return (
    <div className="ws-canvas">
      <Thinking streaming>Weighing the rail against the grid, then committing.</Thinking>
      <Thinking duration={12} defaultOpen>
        The grid caps every demo at ~300px. Complex components never had room. A stage gives them the
        full width and the list scales by row, not cell.
      </Thinking>
      <Divider />
      <div className="flex flex-col gap-2">
        <ToolCall label="Read" target="src/lib/cn.ts" defaultOpen>
          {`export function cn(...values) {\n  return twMerge(clsx(values))\n}`}
        </ToolCall>
        <ToolCall label="Run" target="npm run test" status="running" />
        <ToolCall label="Write" target="src/missing.ts" status="error" defaultOpen>
          ENOENT: no such file or directory
        </ToolCall>
        <ToolCall
          label="Run"
          target="rm -rf dist"
          status="pending"
          actions={
            <>
              <Button variant="ghost" size="sm">
                Deny
              </Button>
              <Button variant="primary" size="sm">
                Allow once
              </Button>
            </>
          }
        />
        <ToolCall.Group label="Edited 2 files" added={14} removed={6} defaultOpen>
          <ToolCall label="Edit" target="src/index.ts" />
          <ToolCall label="Edit" target="docs/roadmap.md" />
        </ToolCall.Group>
      </div>
      <Divider />
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center gap-2">
          <Pulse />
          <Text as="span" variant="labelMedium" color="muted">
            idle
          </Text>
        </span>
        <span className="inline-flex items-center gap-2">
          <Pulse active />
          <Text as="span" variant="labelMedium">
            working
          </Text>
        </span>
        <span className="inline-flex items-center gap-2">
          <Pulse size="lg" active />
          <Text as="span" variant="labelMedium">
            lg
          </Text>
        </span>
      </div>
    </div>
  )
}

/* ─── Navigation ─────────────────────────────────────────────────────── */

function SidebarPlayground() {
  const [mode, setMode] = useState<'icon' | 'offcanvas' | 'none'>('icon')
  const [side, setSide] = useState<'left' | 'right'>('left')

  return (
    <div className="ws-canvas ws-canvas--wide">
      <div className="ws-playground flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <SegmentedControl
            defaultValue="icon"
            aria-label="Collapsible mode"
            onValueChange={(v) => setMode(v as typeof mode)}
          >
            <SegmentedControl.Option value="icon">icon</SegmentedControl.Option>
            <SegmentedControl.Option value="offcanvas">offcanvas</SegmentedControl.Option>
            <SegmentedControl.Option value="none">none</SegmentedControl.Option>
          </SegmentedControl>
          <SegmentedControl
            defaultValue="left"
            aria-label="Side"
            onValueChange={(v) => setSide(v as typeof side)}
          >
            <SegmentedControl.Option value="left">left</SegmentedControl.Option>
            <SegmentedControl.Option value="right">right</SegmentedControl.Option>
          </SegmentedControl>
        </div>
        <div className="ws-frame" style={{ height: 320 }}>
        <Sidebar.Provider key={`${mode}-${side}`} collapsible={mode} side={side} mobileBreakpoint={0}>
          <Sidebar aria-label="Demo navigation">
            <Sidebar.Rail />
            <Sidebar.Body>
              <Sidebar.Group label="Workspace">
                <Sidebar.Menu>
                  <Sidebar.Item icon={<HomeIcon size={16} />} active label="Overview">
                    Overview
                  </Sidebar.Item>
                  <Sidebar.Item icon={<SearchIcon size={16} />} label="Search">
                    Search
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
              <Sidebar.Group label="Recent" collapsible defaultOpen>
                <Sidebar.Menu>
                  <Sidebar.Item
                    badge="2m"
                    label="Rework the demo section"
                    action={
                      <IconButton
                        variant="ghost"
                        size="sm"
                        icon={<TrashIcon />}
                        aria-label="Delete"
                        className="size-6"
                      />
                    }
                  >
                    Rework the demo section
                  </Sidebar.Item>
                </Sidebar.Menu>
              </Sidebar.Group>
            </Sidebar.Body>
              <Sidebar.Footer>
                <Sidebar.Item icon={<Avatar name="Denis Martínez" size="sm" />} label="Denis Martínez">
                  Denis Martínez
                </Sidebar.Item>
              </Sidebar.Footer>
            </Sidebar>
            <Sidebar.Main>
              <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-3 py-2">
                <Sidebar.Trigger />
                <Text as="span" variant="labelMedium">
                  Overview
                </Text>
              </div>
              <div className="p-4">
                <Text variant="bodySmall" color="muted">
                  The rail on the left of this whole section is the same component.
                </Text>
              </div>
            </Sidebar.Main>
          </Sidebar.Provider>
        </div>
      </div>
      <Text as="p" variant="bodyMedium" color="muted" className="ws-playground-hint">
        A collapsible side panel — <code>icon</code> / <code>offcanvas</code> / <code>none</code>{' '}
        collapse modes, either side, a modal drawer below the breakpoint. It&rsquo;s the rail on this
        very section — open it on a wider screen to try the modes.
      </Text>
    </div>
  )
}

function NavPieces() {
  const [page, setPage] = useState(3)
  return (
    <div className="ws-canvas">
      <Breadcrumb>
        <Breadcrumb.Item href="#top">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#components">Components</Breadcrumb.Item>
        <Breadcrumb.Item current>Navigation</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="activity">Activity</Tabs.Tab>
          <Tabs.Tab value="settings">Settings</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <Text variant="bodyMedium" color="muted" className="m-0">
            Roving arrow keys, real <code>role=&quot;tab&quot;</code> semantics.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="activity">
          <Text variant="bodyMedium" color="muted" className="m-0">
            Panel two.
          </Text>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Text variant="bodyMedium" color="muted" className="m-0">
            Panel three.
          </Text>
        </Tabs.Panel>
      </Tabs>
      <div className="flex flex-wrap items-center gap-4">
        <Menu>
          <Menu.Trigger>
            <Button variant="secondary">Add context</Button>
          </Menu.Trigger>
          <Menu.Content>
            <Menu.Item>
              <FileIcon size={16} />
              Upload files
            </Menu.Item>
            <Menu.Item>
              <FolderOpenIcon size={16} />
              Open folder
            </Menu.Item>
            <Menu.Item disabled>Paste from clipboard</Menu.Item>
          </Menu.Content>
        </Menu>
        <SegmentedControl defaultValue="grid" aria-label="View">
          <SegmentedControl.Option value="list">List</SegmentedControl.Option>
          <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
          <SegmentedControl.Option value="cols">Columns</SegmentedControl.Option>
        </SegmentedControl>
      </div>
      <Pagination page={page} pageCount={9} onPageChange={setPage} />
    </div>
  )
}

/* ─── Forms ──────────────────────────────────────────────────────────── */

function AccountSettings() {
  return (
    <form className="ws-canvas" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" defaultValue="Denis Martínez" />
        <Input label="Email" type="email" defaultValue="denis@oceanic.dev" />
      </div>
      <Select label="Region" defaultValue="ni">
        <option value="ni">Nicaragua</option>
        <option value="mx">M&eacute;xico</option>
        <option value="es">Espa&ntilde;a</option>
      </Select>
      <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
        <Text as="legend" variant="labelLarge" className="mb-1 p-0">
          Plan
        </Text>
        <Radio name="plan" label="Free" defaultChecked />
        <Radio name="plan" label="Pro" />
        <Radio name="plan" label="Team" />
      </fieldset>
      <Slider label="Monthly cap" defaultValue={62} className="w-full" />
      <div className="flex flex-col gap-2">
        <Checkbox label="Email me about releases" defaultChecked />
        <Switch label="Two-factor authentication" defaultChecked />
      </div>
      <FileUpload helperText="A square PNG or JPG, up to 2MB." />
      <div className="flex gap-3">
        <Button type="submit">Save changes</Button>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  )
}

/* ─── Feedback ───────────────────────────────────────────────────────── */

function AlertsAndStatus() {
  const toast = useToast()
  return (
    <div className="ws-canvas">
      <div className="flex flex-col gap-3">
        <Alert variant="info" title="Heads up" className="w-full">
          The stylesheet ships precompiled.
        </Alert>
        <Alert variant="warning" title="Unsaved changes" className="w-full">
          Your last edit hasn&rsquo;t been written to disk.
        </Alert>
        <Alert variant="danger" title="Build failed" className="w-full">
          <code>tsc</code> exited with 2 errors.
        </Alert>
      </div>
      <Progress value={64} label="Syncing" className="w-full" />
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Stable</Badge>
        <Badge variant="accent">Beta</Badge>
        <Badge variant="danger">Deprecated</Badge>
        <Spinner />
        <Tooltip content="Anchored, dismissible, keyboard-safe">
          <Button variant="secondary">Hover me</Button>
        </Tooltip>
        <Button
          onClick={() => toast({ title: 'Saved', description: 'Written to disk.' })}
        >
          Toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({ title: 'Upload failed', description: 'Over 10MB.', variant: 'danger' })
          }
        >
          Error toast
        </Button>
      </div>
      <Card>
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="size-10" />
          <div className="flex-1">
            <Skeleton className="h-3 w-2/5" />
            <Skeleton className="mt-2 h-3 w-4/5" />
          </div>
        </div>
      </Card>
      <Empty>
        <Empty.Header>
          <Empty.Media variant="icon">
            <FileIcon />
          </Empty.Media>
          <Empty.Title>No results</Empty.Title>
          <Empty.Description>Try a broader search.</Empty.Description>
        </Empty.Header>
      </Empty>
    </div>
  )
}

/* ─── Overlays ───────────────────────────────────────────────────────── */

function LayeredSurfaces() {
  const [open, setOpen] = useState(false)
  return (
    <div className="ws-canvas">
      <Text variant="bodyMedium" color="muted" className="m-0">
        Both portal out, trap focus, and dismiss on Escape or outside click.
      </Text>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Popover>
          <Popover.Trigger>
            <Button variant="secondary">Open popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <p style={{ margin: 8, width: 200 }}>Portalled, collision-aware, focus-managed.</p>
          </Popover.Content>
        </Popover>
        <Tooltip content="Shows on hover and on keyboard focus">
          <Button variant="ghost">Tooltip</Button>
        </Tooltip>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="Delete workspace?">
        <p style={{ margin: '0 0 16px' }}>
          This removes the workspace and its history. It cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Delete</Button>
        </div>
      </Dialog>
    </div>
  )
}

/* ─── Display ────────────────────────────────────────────────────────── */

function CardsAndContent() {
  return (
    <div className="ws-canvas">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <Text variant="labelLarge" as="h4" className="mb-1">
            Opaque by rule
          </Text>
          <Text variant="bodySmall" color="muted" className="m-0">
            No <code>backdrop-filter</code> anywhere.
          </Text>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Avatar name="Grace Hopper" size="md" />
            <div>
              <Text variant="labelLarge" as="p" className="m-0">
                Grace Hopper
              </Text>
              <Text variant="bodySmall" color="muted" className="m-0">
                Maintainer
              </Text>
            </div>
          </div>
        </Card>
      </div>
      <Accordion className="w-full">
        <Accordion.Item title="What ships in the box" defaultOpen>
          ESM, types, and one precompiled stylesheet.
        </Accordion.Item>
        <Accordion.Item title="Do I need Tailwind">
          Only to override with utilities. Otherwise no.
        </Accordion.Item>
      </Accordion>
      <List defaultValue="a" aria-label="Files">
        <List.Item value="a">components.tsx</List.Item>
        <List.Item value="b">landing.css</List.Item>
        <List.Item value="c" disabled>
          .env.local
        </List.Item>
      </List>
      <CodeBlock
        className="w-full"
        title="Example.tsx"
        language="tsx"
        showLineNumbers
        highlightedLines="3"
        code={`import { Button } from 'oceanic-ui'

export const Example = () => (
  <Button variant="primary">Send</Button>
)
`}
      />
    </div>
  )
}

/* ─── Registry ───────────────────────────────────────────────────────── */

export const ENTRIES: Entry[] = [
  {
    id: 'assistant-thread',
    label: 'Assistant thread',
    group: 'Chat',
    Scene: AssistantThread,
    code: `<Message.Group>
  <Marker variant="separator">
    <Marker.Content>Today</Marker.Content>
  </Marker>

  <Message>
    <Message.Avatar><Avatar name="Ocean" size="sm" /></Message.Avatar>
    <Message.Content>
      <Bubble variant="assistant">
        <Bubble.Content>Looking at the two demo layouts now.</Bubble.Content>
      </Bubble>
    </Message.Content>
  </Message>

  <Thinking duration={7} defaultOpen>
    …the rail-and-stage split scales; the tab grid doesn't.
  </Thinking>

  <ToolCall.Group label="Read 3 files" defaultOpen>
    <ToolCall label="Read" target="src/sections/Showcase.tsx" />
  </ToolCall.Group>
  <ToolCall label="Edit" target="src/sections/Showcase.tsx" status="running" />
</Message.Group>

<Composer value={value} onChange={setValue} onSubmit={send} />`,
  },
  {
    id: 'reasoning-tools',
    label: 'Thinking & tools',
    group: 'Chat',
    Scene: ReasoningAndTools,
    code: `<Thinking streaming>Weighing the options…</Thinking>
<Thinking duration={12} defaultOpen>The grid caps every demo at ~300px…</Thinking>

<ToolCall label="Read" target="src/lib/cn.ts" defaultOpen>{source}</ToolCall>
<ToolCall label="Run"  target="npm run test" status="running" />
<ToolCall label="Write" target="src/missing.ts" status="error" defaultOpen>
  ENOENT: no such file or directory
</ToolCall>
<ToolCall
  label="Run" target="rm -rf dist" status="pending"
  actions={<><Button variant="ghost" size="sm">Deny</Button>
             <Button variant="primary" size="sm">Allow once</Button></>}
/>

<ToolCall.Group label="Edited 2 files" added={14} removed={6} defaultOpen>
  <ToolCall label="Edit" target="src/index.ts" />
</ToolCall.Group>

<Pulse />           {/* idle */}
<Pulse active />    {/* working */}`,
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    group: 'Navigation',
    Scene: SidebarPlayground,
    code: `<Sidebar.Provider collapsible="icon" side="left">
  <Sidebar aria-label="Navigation">
    <Sidebar.Rail />
    <Sidebar.Body>
      <Sidebar.Group label="Workspace">
        <Sidebar.Menu>
          <Sidebar.Item icon={<HomeIcon />} active label="Overview">Overview</Sidebar.Item>
          <Sidebar.Item icon={<SearchIcon />} label="Search">Search</Sidebar.Item>
          <Sidebar.Item
            icon={<FolderOpenIcon />} label="Projects"
            subMenu={
              <Sidebar.Menu>
                <Sidebar.Item asChild><a href="/aurora">Aurora</a></Sidebar.Item>
              </Sidebar.Menu>
            }
          >
            Projects
          </Sidebar.Item>
        </Sidebar.Menu>
      </Sidebar.Group>
      <Sidebar.Group label="Recent" collapsible>…</Sidebar.Group>
    </Sidebar.Body>
    <Sidebar.Footer>…</Sidebar.Footer>
  </Sidebar>
  <Sidebar.Main>
    <Sidebar.Trigger />
    {children}
  </Sidebar.Main>
</Sidebar.Provider>`,
  },
  {
    id: 'nav-pieces',
    label: 'Breadcrumb · Tabs · Menu',
    group: 'Navigation',
    Scene: NavPieces,
    code: `<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item current>Navigation</Breadcrumb.Item>
</Breadcrumb>

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="activity">Activity</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">…</Tabs.Panel>
</Tabs>

<Menu>
  <Menu.Trigger><Button variant="secondary">Add context</Button></Menu.Trigger>
  <Menu.Content>
    <Menu.Item><FileIcon size={16} /> Upload files</Menu.Item>
  </Menu.Content>
</Menu>

<Pagination page={page} pageCount={9} onPageChange={setPage} />`,
  },
  {
    id: 'account-settings',
    label: 'Account settings',
    group: 'Forms',
    Scene: AccountSettings,
    code: `<form onSubmit={save}>
  <Input label="Full name" defaultValue="Denis Martínez" />
  <Input label="Email" type="email" defaultValue="denis@oceanic.dev" />
  <Select label="Region" defaultValue="ni">
    <option value="ni">Nicaragua</option>
  </Select>

  <Radio name="plan" label="Free" defaultChecked />
  <Radio name="plan" label="Pro" />

  <Slider label="Monthly cap" defaultValue={62} />
  <Checkbox label="Email me about releases" defaultChecked />
  <Switch label="Two-factor authentication" defaultChecked />
  <FileUpload helperText="A square PNG or JPG, up to 2MB." />

  <Button type="submit">Save changes</Button>
</form>`,
  },
  {
    id: 'alerts-status',
    label: 'Alerts & status',
    group: 'Feedback',
    Scene: AlertsAndStatus,
    code: `<Alert variant="warning" title="Unsaved changes">
  Your last edit hasn't been written to disk.
</Alert>

<Progress value={64} label="Syncing" />

<Badge variant="accent">Beta</Badge>
<Spinner />
<Tooltip content="Anchored, dismissible"><Button>Hover me</Button></Tooltip>

const toast = useToast()
<Button onClick={() => toast({ title: 'Saved', description: 'Written to disk.' })}>
  Toast
</Button>

<Skeleton variant="circular" className="size-10" />
<Empty>
  <Empty.Header>
    <Empty.Media variant="icon"><FileIcon /></Empty.Media>
    <Empty.Title>No results</Empty.Title>
  </Empty.Header>
</Empty>`,
  },
  {
    id: 'overlays',
    label: 'Dialog · Popover',
    group: 'Overlays',
    Scene: LayeredSurfaces,
    code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)} title="Delete workspace?">
  <p>This cannot be undone.</p>
  <Button onClick={() => setOpen(false)}>Delete</Button>
</Dialog>

<Popover>
  <Popover.Trigger><Button variant="secondary">Open popover</Button></Popover.Trigger>
  <Popover.Content>Portalled, collision-aware, focus-managed.</Popover.Content>
</Popover>`,
  },
  {
    id: 'cards-content',
    label: 'Cards & content',
    group: 'Display',
    Scene: CardsAndContent,
    code: `<Card>
  <Text variant="labelLarge" as="h4">Opaque by rule</Text>
  <Text variant="bodySmall" color="muted">No backdrop-filter anywhere.</Text>
</Card>

<Accordion>
  <Accordion.Item title="What ships in the box" defaultOpen>
    ESM, types, and one precompiled stylesheet.
  </Accordion.Item>
</Accordion>

<List defaultValue="a" aria-label="Files">
  <List.Item value="a">components.tsx</List.Item>
  <List.Item value="c" disabled>.env.local</List.Item>
</List>

<CodeBlock title="Example.tsx" language="tsx" showLineNumbers code={source} />`,
  },
]

export const GROUPS = ['Chat', 'Navigation', 'Forms', 'Feedback', 'Overlays', 'Display'] as const
