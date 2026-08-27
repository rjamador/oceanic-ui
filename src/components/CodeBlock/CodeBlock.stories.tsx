import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeBlock } from './CodeBlock'

const SAMPLE = `import { Button } from 'oceanic-ui'

export function Example() {
  return <Button variant="primary">Send</Button>
}
`

const DIFF = `--- a/Button.tsx
+++ b/Button.tsx
@@ -1,6 +1,7 @@
 export function Button() {
-  return <button>Save</button>
+  return <button type="button">Save</button>
 }
`

const LONG = Array.from({ length: 16 }, (_, index) => `line ${index + 1} — const value = ${index}`).join(
  '\n',
)

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    code: SAMPLE,
    language: 'tsx',
    title: 'Example.tsx',
  },
}

export const LineNumbers: Story = {
  args: {
    code: SAMPLE,
    language: 'tsx',
    title: 'Example.tsx',
    showLineNumbers: true,
  },
}

export const Highlighted: Story = {
  args: {
    code: SAMPLE,
    language: 'tsx',
    title: 'Example.tsx',
    showLineNumbers: true,
    highlightedLines: '3-4',
  },
}

export const Diff: Story = {
  args: {
    code: DIFF,
    language: 'diff',
    title: 'Button.tsx',
    showLineNumbers: true,
  },
}

export const PinnedCopy: Story = {
  args: {
    code: 'const ocean = "blue"',
    language: 'ts',
    showLang: false,
  },
}

export const Collapsed: Story = {
  args: {
    code: LONG,
    language: 'ts',
    title: 'long.ts',
    showLineNumbers: true,
    maxLines: 6,
  },
}

export const Composed: Story = {
  args: {
    code: SAMPLE,
    language: 'tsx',
  },
  render: (args) => (
    <CodeBlock {...args} showLineNumbers>
      <CodeBlock.Header>
        <CodeBlock.Title>composed.tsx</CodeBlock.Title>
        <CodeBlock.Language />
        <CodeBlock.Copy />
      </CodeBlock.Header>
    </CodeBlock>
  ),
}
