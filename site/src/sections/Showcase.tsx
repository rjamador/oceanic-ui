import {
  Accordion,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  GearIcon,
  IconButton,
  Input,
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
        <Tabs defaultValue="actions" className="demo-tabs">
          <Tabs.List>
            <Tabs.Tab value="actions">Actions</Tabs.Tab>
            <Tabs.Tab value="forms">Forms</Tabs.Tab>
            <Tabs.Tab value="feedback">Feedback</Tabs.Tab>
            <Tabs.Tab value="display">Display</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="actions">
            <div className="grid">
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
            <div className="grid">
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
            <div className="grid">
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
                  <Button variant="secondary">Hover or focus me</Button>
                </Tooltip>
              </Demo>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="display">
            <div className="grid">
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
                <Accordion className="demo-accordion">
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
