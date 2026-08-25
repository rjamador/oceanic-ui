import { useState } from 'react'

import { Button } from './components/Button'
import { Card } from './components/Card'
import { Checkbox } from './components/Checkbox'
import { Dialog } from './components/Dialog'
import { IconButton } from './components/IconButton'
import { Input } from './components/Input'
import { Radio } from './components/Radio'
import { Select } from './components/Select'
import { Tabs } from './components/Tabs'
import { Tooltip } from './components/Tooltip'

const CheckIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CloseIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GearIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path
      d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)

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
        <h1 style={{ fontSize: 'var(--text-3xl)' }}>aero-ui</h1>

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
            <IconButton variant="primary" icon={CheckIcon} aria-label="Accept" />
          </Tooltip>
          <Tooltip content="Decline">
            <IconButton variant="secondary" icon={CloseIcon} aria-label="Decline" />
          </Tooltip>
          <Tooltip content="Settings">
            <IconButton variant="ghost" icon={GearIcon} aria-label="Settings" />
          </Tooltip>
          <IconButton variant="primary" size="sm" icon={CheckIcon} aria-label="Accept (small)" />
          <IconButton variant="primary" size="lg" icon={CheckIcon} aria-label="Accept (large)" />
          <IconButton variant="primary" icon={CheckIcon} aria-label="Accept (disabled)" disabled />
        </section>

        <section style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)' }}>
          <Card padding="lg" style={{ flex: '1 1 280px' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Glass panel
            </h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 0 var(--space-4)' }}>
              A frosted surface with a soft specular highlight across the top —
              the same gloss language as the buttons, scaled up.
            </p>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Card>

          <Card padding="sm" style={{ flex: '1 1 200px' }}>
            <p style={{ margin: 0 }}>Compact padding variant.</p>
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
      </div>
    </main>
  )
}

export default App
