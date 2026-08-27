import type { Meta, StoryObj } from '@storybook/react-vite'

import { CodeBlock } from './CodeBlock'

const SAMPLE = `import { Button } from 'oceanic-ui'

export function Example() {
  return <Button variant="primary">Send</Button>
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

export const CustomTokens: Story = {
  args: {
    code: 'SELECT * FROM ocean WHERE depth > 100',
    title: 'query.sql',
  },
  render: (args) => (
    <CodeBlock
      {...args}
      tokens={[
        [
          { content: 'SELECT', kind: 'keyword' },
          { content: ' * ' },
          { content: 'FROM', kind: 'keyword' },
          { content: ' ocean ' },
          { content: 'WHERE', kind: 'keyword' },
          { content: ' depth > ' },
          { content: '100', kind: 'number' },
        ],
      ]}
    />
  ),
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
