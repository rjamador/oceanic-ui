import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { CodeBlock, markdownCodeProps, parseLineSpec } from './CodeBlock'

const SAMPLE = `export function greet(name: string) {
  return \`hello \${name}\`
}`

describe('parseLineSpec', () => {
  it('parses arrays, ranges, and ignores garbage', () => {
    expect([...parseLineSpec([2, 3])].sort()).toEqual([2, 3])
    expect([...parseLineSpec('2-4,7')].sort()).toEqual([2, 3, 4, 7])
    expect([...parseLineSpec('nope')]).toEqual([])
  })
})

describe('markdownCodeProps', () => {
  it('reads language and source from a markdown pre/code pair', () => {
    const result = markdownCodeProps({
      className: 'language-tsx',
      children: (
        <code className="language-tsx">{'const n = 1\n'}</code>
      ),
    })

    expect(result).toEqual({ code: 'const n = 1', language: 'tsx' })
  })
})

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    })
  })

  it('exposes the source as a labelled region', () => {
    render(<CodeBlock code={SAMPLE} language="tsx" title="greet.ts" />)

    expect(screen.getByRole('region', { name: 'tsx code' })).toHaveTextContent('export function greet')
    expect(screen.getByText('greet.ts')).toBeInTheDocument()
    expect(screen.getByText('tsx')).toBeInTheDocument()
  })

  it('copies from the keyboard and announces success', async () => {
    const user = userEvent.setup()
    const onCopy = vi.fn()
    render(<CodeBlock code={SAMPLE} language="tsx" onCopy={onCopy} />)

    const button = screen.getByRole('button', { name: 'Copy code' })
    button.focus()
    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    })
    expect(onCopy).toHaveBeenCalledWith(SAMPLE)
  })

  it('marks highlighted source lines', () => {
    render(<CodeBlock code={'one\ntwo\nthree'} highlightedLines="2" showLineNumbers />)

    const lines = document.querySelectorAll('[data-slot="code-block-line"]')
    expect(lines[1]).toHaveClass('aero-code-block-line-highlight')
    expect(lines[0]).not.toHaveClass('aero-code-block-line-highlight')
  })

  it('reveals collapsed lines from the keyboard', async () => {
    const user = userEvent.setup()
    render(
      <CodeBlock
        code={'a\nb\nc\nd'}
        maxLines={2}
        showMoreLabel="Show more"
        showLessLabel="Show less"
      />,
    )

    expect(screen.getByRole('region')).not.toHaveTextContent('d')
    await user.click(screen.getByRole('button', { name: 'Show more' }))
    expect(screen.getByRole('region')).toHaveTextContent('d')
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute('aria-expanded', 'true')
  })
})
