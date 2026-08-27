import { useState } from 'react'
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
  Empty,
  FileIcon,
  FileUpload,
  FolderOpenIcon,
  GearIcon,
  IconButton,
  Input,
  Marker,
  Menu,
  Message,
  Popover,
  Progress,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  Tabs,
  Text,
  Tooltip,
  useToast,
} from 'oceanic-ui'
import { Window } from '../components/Window'
import { SectionHead } from '../components/SectionHead'
import { Demo } from '../components/Demo'

export function Showcase() {
  return (
    <section className="section showcase">
      <SectionHead n="01" title="Live components" note="every demo below is the real package" />
      <Window title="oceanic-ui — components.tsx">
        <Tabs defaultValue="chat" className="demo-tabs">
          <Tabs.List>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
            <Tabs.Tab value="actions">Actions</Tabs.Tab>
            <Tabs.Tab value="forms">Forms</Tabs.Tab>
            <Tabs.Tab value="feedback">Feedback</Tabs.Tab>
            <Tabs.Tab value="display">Display</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="chat">
            <div className="demo-grid">
              <Demo code='<Message> · <Bubble> · <Marker>'>
                <Message.Group className="w-full">
                  <Marker variant="separator">
                    <Marker.Content>Today</Marker.Content>
                  </Marker>
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
                  <Message align="end">
                    <Message.Avatar>
                      <Avatar name="Ada" size="sm" />
                    </Message.Avatar>
                    <Message.Content>
                      <Bubble variant="user" align="end">
                        <Bubble.Content>Wire up the composer.</Bubble.Content>
                      </Bubble>
                    </Message.Content>
                  </Message>
                </Message.Group>
              </Demo>
              <Demo code='<Composer value onChange onSubmit commands={…} />'>
                <ComposerDemo />
              </Demo>
              <Demo code='<CodeBlock code language showLineNumbers />'>
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
              </Demo>
              <Demo code='<Empty> — placeholder for an unfilled view'>
                <Empty>
                  <Empty.Header>
                    <Empty.Media variant="icon">
                      <FileIcon />
                    </Empty.Media>
                    <Empty.Title>No messages yet</Empty.Title>
                    <Empty.Description>Ask about this project to get started.</Empty.Description>
                  </Empty.Header>
                </Empty>
              </Demo>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="actions">
            <div className="demo-grid">
              <Demo code='<Button variant="primary | secondary | ghost" />'>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button disabled>Disabled</Button>
              </Demo>
              <Demo code='<IconButton icon={<GearIcon />} aria-label="Settings" />'>
                <IconButton icon={<GearIcon />} aria-label="Settings" />
                <IconButton variant="primary" icon={<GearIcon />} aria-label="Settings" />
                <IconButton variant="secondary" icon={<GearIcon />} aria-label="Settings" />
              </Demo>
              <Demo code='<Menu> · <Menu.Item>'>
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
              </Demo>
              <Demo code='<Breadcrumb> · <Breadcrumb.Item>'>
                <Breadcrumb>
                  <Breadcrumb.Item href="#top">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="#components">Components</Breadcrumb.Item>
                  <Breadcrumb.Item current>Menu</Breadcrumb.Item>
                </Breadcrumb>
              </Demo>
              <Demo code='<SegmentedControl defaultValue="grid" />'>
                <SegmentedControl defaultValue="grid" aria-label="View">
                  <SegmentedControl.Option value="list">List</SegmentedControl.Option>
                  <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
                  <SegmentedControl.Option value="cols">Columns</SegmentedControl.Option>
                </SegmentedControl>
              </Demo>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="forms">
            <div className="demo-grid">
              <Demo code='<Input label="Email" />'>
                <Input label="Email" type="email" placeholder="ada@oceanic.dev" />
              </Demo>
              <Demo code='<Select label="Region" />'>
                <Select label="Region" defaultValue="ni">
                  <option value="ni">Nicaragua</option>
                  <option value="mx">M&eacute;xico</option>
                  <option value="es">Espa&ntilde;a</option>
                </Select>
              </Demo>
              <Demo code='<FileUpload onFiles={…} />'>
                <FileUpload helperText="PNG, JPG, or PDF up to 10MB." />
              </Demo>
              <Demo code='<Slider label="Depth" />'>
                <Slider label="Depth" defaultValue={62} className="w-full" />
              </Demo>
              <Demo code='<Checkbox /> · <Switch />'>
                <Checkbox label="Remember me" defaultChecked />
                <Switch label="Sonar ping" defaultChecked />
              </Demo>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="feedback">
            <div className="demo-grid">
              <Demo code='<Alert variant="info | success | warning | danger" />'>
                <Alert variant="warning" title="Unsaved changes" className="w-full">
                  Your last edit hasn&rsquo;t been written to disk.
                </Alert>
              </Demo>
              <Demo code='<Popover> · <Popover.Content>'>
                <Popover>
                  <Popover.Trigger>
                    <Button variant="secondary">Open popover</Button>
                  </Popover.Trigger>
                  <Popover.Content>
                    <p style={{ margin: 8, width: 180 }}>
                      Portalled, collision-aware, focus-managed.
                    </p>
                  </Popover.Content>
                </Popover>
              </Demo>
              <Demo code='<Progress value={64} label="Sync" />'>
                <Progress value={64} label="Sync" className="w-full" />
              </Demo>
              <Demo code='<Badge variant="default | accent | danger" />'>
                <Badge>Stable</Badge>
                <Badge variant="accent">Beta</Badge>
                <Badge variant="danger">Deprecated</Badge>
              </Demo>
              <Demo code='useToast().toast({ ... })'>
                <ToastDemo />
              </Demo>
              <Demo code='<Tooltip content="…" />'>
                <Tooltip content="Anchored, dismissible, keyboard-safe">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
              </Demo>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="display">
            <div className="demo-grid">
              <Demo code='<Avatar name="Ada Lovelace" />'>
                <Avatar name="Ada Lovelace" size="sm" />
                <Avatar name="Grace Hopper" size="md" />
                <Avatar name="Radia Perlman" size="lg" />
              </Demo>
              <Demo code='<Card padding="md" />'>
                <Card>
                  <Text variant="labelLarge" as="h4">
                    Opaque by rule
                  </Text>
                  <Text variant="bodySmall" color="muted">
                    No backdrop-filter anywhere &mdash; same as real Ocean.
                  </Text>
                </Card>
              </Demo>
              <Demo code='<Accordion.Item title="…" />'>
                <Accordion className="w-full">
                  <Accordion.Item title="What ships in the box" defaultOpen>
                    ESM, types, and one precompiled stylesheet.
                  </Accordion.Item>
                  <Accordion.Item title="Do I need Tailwind">
                    Only if you want to override with utilities. Otherwise no.
                  </Accordion.Item>
                </Accordion>
              </Demo>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Window>
    </section>
  )
}

function ComposerDemo() {
  const [value, setValue] = useState('')
  const [sending, setSending] = useState(false)
  const [attachments, setAttachments] = useState([
    { id: 'notes', name: 'notes.txt', detail: '12 KB', kind: 'file' as const },
  ])
  const toast = useToast()

  return (
    <Composer
      className="w-full"
      value={value}
      onChange={setValue}
      sending={sending}
      attachments={attachments}
      onRemoveAttachment={(id) => setAttachments((a) => a.filter((x) => x.id !== id))}
      commands={[
        { name: 'plan', description: 'Write a step-by-step plan' },
        { name: 'review', description: 'Review the current file' },
      ]}
      onAttachFiles={() => toast({ title: 'Attach', description: 'Wire this to a file picker.' })}
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

function ToastDemo() {
  const toast = useToast()
  return (
    <>
      <Button
        onClick={() => toast({ title: 'Saved', description: 'Your changes were written to disk.' })}
      >
        Show toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ title: 'Upload failed', description: 'File exceeds 10MB.', variant: 'danger' })
        }
      >
        Error toast
      </Button>
    </>
  )
}
