import { useState } from 'react'

import { Accordion } from './components/Accordion'
import { Avatar } from './components/Avatar'
import { Badge } from './components/Badge'
import { Button } from './components/Button'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { Dialog } from './components/Dialog'
import { Divider } from './components/Divider'
import { CheckIcon, CloseIcon, GearIcon } from './components/Icon'
import { IconButton } from './components/IconButton'
import { Input } from './components/Input'
import { List } from './components/List'
import { Pagination } from './components/Pagination'
import { Progress } from './components/Progress'
import { Radio } from './components/Radio'
import { SegmentedControl } from './components/SegmentedControl'
import { Select } from './components/Select'
import { Skeleton } from './components/Skeleton'
import { Slider } from './components/Slider'
import { Spinner } from './components/Spinner'
import { Switch } from './components/Switch'
import { Tabs } from './components/Tabs'
import { Text, type TextVariant } from './components/Text'
import { Textarea } from './components/Textarea'
import { Tooltip } from './components/Tooltip'
import { useToast } from './components/Toast'

const TEXT_VARIANTS: TextVariant[] = [
  'displayMedium',
  'displaySmall',
  'headingLarge',
  'headingMedium',
  'headingSmall',
  'bodyLarge',
  'bodyMedium',
  'bodySmall',
  'labelLarge',
  'labelMedium',
  'labelSmall',
]

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [page, setPage] = useState(4)
  const toast = useToast()

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100svh',
        overflow: 'hidden',
      }}
    >
      {/* decorative bokeh orbs so the glass blur has something to catch */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -80,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--sky-300), transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 120,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--aero-accent), transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-10)',
          maxWidth: 720,
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}
      >
        <Text
          variant="displayLarge"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
        >
          aero-ui <Badge variant="accent">Beta</Badge>
        </Text>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {TEXT_VARIANTS.map((variant) => (
            <Text key={variant} variant={variant}>
              {variant} — the quick brown fox
            </Text>
          ))}
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <Badge>Default</Badge>
          <Badge variant="accent">12</Badge>
          <Badge variant="danger">Expired</Badge>
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </section>

        <section style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </section>

        <section style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Tooltip content="Accept">
            <IconButton variant="primary" icon={<CheckIcon />} aria-label="Accept" />
          </Tooltip>
          <Tooltip content="Decline">
            <IconButton variant="secondary" icon={<CloseIcon />} aria-label="Decline" />
          </Tooltip>
          <Tooltip content="Settings">
            <IconButton variant="ghost" icon={<GearIcon />} aria-label="Settings" />
          </Tooltip>
          <IconButton variant="primary" size="sm" icon={<CheckIcon />} aria-label="Accept (small)" />
          <IconButton variant="primary" size="lg" icon={<CheckIcon />} aria-label="Accept (large)" />
          <IconButton variant="primary" icon={<CheckIcon />} aria-label="Accept (disabled)" disabled />
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
          <Card padding="lg" style={{ flex: '1 1 280px' }}>
            <Text variant="headingSmall" style={{ marginBottom: 'var(--space-2)' }}>
              Glass panel
            </Text>
            <Text variant="bodyMedium" color="muted" style={{ margin: '0 0 var(--space-4)' }}>
              A frosted surface with a soft specular highlight across the top —
              the same gloss language as the buttons, scaled up.
            </Text>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Card>

          <Card padding="sm" style={{ flex: '1 1 200px' }}>
            <Text variant="bodyMedium">Compact padding variant.</Text>
          </Card>
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div style={{ flex: '1 1 220px' }}>
            <Input label="Name" placeholder="Ada Lovelace" />
          </div>
          <div style={{ flex: '1 1 220px' }}>
            <Input
              label="Email"
              placeholder="ada@example.com"
              helperText="We'll never share your email."
            />
          </div>
          <div style={{ flex: '1 1 220px' }}>
            <Input
              label="Username"
              defaultValue="already taken"
              errorMessage="That username is already taken."
            />
          </div>
          <div style={{ flex: '1 1 220px' }}>
            <Input label="Disabled" placeholder="Can't touch this" disabled />
          </div>
        </section>

        <section style={{ maxWidth: 460 }}>
          <Textarea label="Bio" placeholder="Tell us about yourself…" helperText="Max 200 characters." />
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Checkbox label="Remember me" defaultChecked />
            <Checkbox label="Subscribe to newsletter" />
            <Checkbox label="Disabled" disabled />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Radio name="plan" label="Free plan" defaultChecked />
            <Radio name="plan" label="Pro plan" />
            <Radio name="plan" label="Disabled" disabled />
          </div>

          <div style={{ flex: '1 1 220px' }}>
            <Select label="Country" defaultValue="ar">
              <option value="ar">Argentina</option>
              <option value="mx">México</option>
              <option value="es">España</option>
              <option value="us">United States</option>
            </Select>
          </div>
        </section>

        <section>
          <Button variant="primary" onClick={() => setDialogOpen(true)}>
            Delete file…
          </Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Delete file">
            <p style={{ margin: '0 0 16px' }}>
              Are you sure you want to delete this file? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>
                Delete
              </Button>
            </div>
          </Dialog>
        </section>

        <section style={{ maxWidth: 420 }}>
          <Tabs defaultValue="general">
            <Tabs.List>
              <Tabs.Tab value="general">General</Tabs.Tab>
              <Tabs.Tab value="advanced">Advanced</Tabs.Tab>
              <Tabs.Tab value="locked" disabled>
                Locked
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="general">
              <p style={{ margin: 0 }}>General settings go here.</p>
            </Tabs.Panel>
            <Tabs.Panel value="advanced">
              <p style={{ margin: 0 }}>Advanced settings go here.</p>
            </Tabs.Panel>
            <Tabs.Panel value="locked">
              <p style={{ margin: 0 }}>Unreachable.</p>
            </Tabs.Panel>
          </Tabs>
        </section>

        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            maxWidth: 320,
          }}
        >
          <Progress value={62} label="Copying files" />
          <Progress label="Connecting" />
        </section>

        <section style={{ maxWidth: 420 }}>
          <Accordion exclusive>
            <Accordion.Item title="Shipping" defaultOpen>
              Ships in 3-5 business days via standard courier.
            </Accordion.Item>
            <Accordion.Item title="Returns">
              Returns are accepted within 30 days of delivery.
            </Accordion.Item>
            <Accordion.Item title="Warranty">
              Covered for 1 year against manufacturing defects.
            </Accordion.Item>
          </Accordion>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 320 }}>
          <Slider label="Volume" defaultValue={65} />
          <Slider label="Brightness" min={0} max={10} step={1} defaultValue={4} />
          <Slider label="Disabled" defaultValue={30} disabled />
        </section>

        <section style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <Button
            variant="primary"
            onClick={() => toast({ title: 'Saved', description: 'Your changes were saved.' })}
          >
            Trigger success toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Upload failed',
                description: 'The file exceeds the 10MB limit.',
                variant: 'danger',
              })
            }
          >
            Trigger error toast
          </Button>
        </section>

        <Divider />

        <section style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Spinner />
          <Spinner size={32} />
          <Button variant="primary" disabled style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Spinner size={14} label="Saving" />
            Saving…
          </Button>
        </section>

        <section style={{ maxWidth: 320 }}>
          <Divider label="OR" />
        </section>

        <section>
          <SegmentedControl defaultValue="list">
            <SegmentedControl.Option value="list">List</SegmentedControl.Option>
            <SegmentedControl.Option value="grid">Grid</SegmentedControl.Option>
            <SegmentedControl.Option value="details" disabled>
              Details
            </SegmentedControl.Option>
          </SegmentedControl>
        </section>

        <section style={{ maxWidth: 260 }}>
          <List defaultValue="doc1" aria-label="Files">
            <List.Item value="doc1">Document.docx</List.Item>
            <List.Item value="doc2">Photo.png</List.Item>
            <List.Item value="doc3">Budget.xlsx</List.Item>
            <List.Item value="doc4" disabled>
              Locked.zip
            </List.Item>
          </List>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Switch label="Airplane mode" defaultChecked />
          <Switch label="Notifications" />
          <Switch label="Disabled" disabled />
        </section>

        <section style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="Ada Lovelace" size="lg" />
          <Avatar size="lg" />
        </section>

        <section>
          <Card padding="md" style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Skeleton variant="circular" width={40} height={40} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" />
              </div>
            </div>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" style={{ marginTop: 'var(--space-2)' }} />
          </Card>
        </section>

        <section>
          <Pagination page={page} pageCount={12} onPageChange={setPage} />
        </section>
      </div>
    </main>
  )
}

export default App
