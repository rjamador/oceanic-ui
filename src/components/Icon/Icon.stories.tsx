import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  CloseIcon,
  CopyIcon,
  GearIcon,
  GlobeIcon,
  NodesIcon,
  SearchIcon,
  SlidersIcon,
  TerminalIcon,
} from './icons'

const meta = {
  title: 'Components/Icon',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const ICONS = [
  { name: 'CheckIcon', Component: CheckIcon },
  { name: 'CloseIcon', Component: CloseIcon },
  { name: 'ChevronRightIcon', Component: ChevronRightIcon },
  { name: 'ChevronDownIcon', Component: ChevronDownIcon },
  { name: 'GearIcon', Component: GearIcon },
  { name: 'CopyIcon', Component: CopyIcon },
  { name: 'SearchIcon', Component: SearchIcon },
  { name: 'ClockIcon', Component: ClockIcon },
  { name: 'SlidersIcon', Component: SlidersIcon },
  { name: 'TerminalIcon', Component: TerminalIcon },
  { name: 'GlobeIcon', Component: GlobeIcon },
  { name: 'NodesIcon', Component: NodesIcon },
]

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      {ICONS.map(({ name, Component }) => (
        <div
          key={name}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <Component size={28} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <CheckIcon size={16} />
      <CheckIcon size={24} />
      <CheckIcon size={32} />
      <CheckIcon size={48} />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <CheckIcon size={28} style={{ color: 'var(--sky-700)' }} />
      <CloseIcon size={28} style={{ color: 'var(--danger)' }} />
      <GearIcon size={28} style={{ color: 'var(--text-muted)' }} />
    </div>
  ),
}
