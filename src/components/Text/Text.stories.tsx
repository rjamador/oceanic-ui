import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'
import type { TextVariant } from './Text'

const meta = {
  title: 'Components/Text',
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

const VARIANTS: TextVariant[] = [
  'displayLarge',
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

export const Scale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <Text variant="labelSmall" color="muted" style={{ width: 120, flex: 'none' }}>
            {variant}
          </Text>
          <Text variant={variant}>The quick brown fox</Text>
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text color="default">Default text</Text>
      <Text color="muted">Muted text</Text>
      <Text color="accent">Accent text</Text>
      <Text color="danger">Danger text</Text>
    </div>
  ),
}
