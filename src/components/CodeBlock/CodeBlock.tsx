/* eslint-disable react-refresh/only-export-components -- reason: this is a
   compound component (CodeBlock.Header/Title/Language/Copy), which by convention
   (see "Compound components" in docs/creating-components.md) lives in one
   file per component folder. */
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

import { useControllableState } from '@/hooks/useControllableState'
import { cn } from '@/lib/cn'

import { Button } from '../Button'
import { CheckIcon, CopyIcon } from '../Icon'
import { IconButton } from '../IconButton'
import { IconSwap } from '../IconSwap'

export type CodeBlockLineSpec = number[] | string

export interface CodeBlockToken {
  content: string
  /**
   * Rendered as `data-kind` on the token span. The built-in tokenizer only
   * emits `keyword` / `string` / `comment` / `number` (the kinds `theme.css`
   * styles), but a consumer passing their own `tokens` may use any string
   * and target it with their own CSS.
   */
  kind?: 'keyword' | 'string' | 'comment' | 'number' | (string & {})
}

type CodeBlockContextValue = {
  code: string
  language?: string
  langLabel: string
  showLineNumbers: boolean
  wrap: boolean
  startLine: number
  highlighted: Set<number>
  copyLabel: string
  copiedLabel: string
}

const CodeBlockContext = createContext<CodeBlockContextValue | null>(null)
const CodeBlockHeaderContext = createContext(false)

function useCodeBlock(part: string): CodeBlockContextValue {
  const context = useContext(CodeBlockContext)
  if (!context) {
    throw new Error(`<CodeBlock.${part}> must be rendered inside <CodeBlock>`)
  }
  return context
}

const LANGUAGE_ALIASES: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  py: 'python',
  rs: 'rust',
  sh: 'bash',
  zsh: 'bash',
  shell: 'bash',
  ps1: 'powershell',
  yml: 'yaml',
  md: 'markdown',
  text: 'plaintext',
  txt: 'plaintext',
}

const LANGUAGE_LABELS: Record<string, string> = {
  typescript: 'ts',
  javascript: 'js',
  python: 'py',
  plaintext: 'text',
  shellscript: 'shell',
  powershell: 'ps1',
}

const JS_KEYWORDS = new Set([
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',
  'new',
  'null',
  'of',
  'return',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'undefined',
  'var',
  'void',
  'while',
  'with',
  'yield',
])

const TS_KEYWORDS = new Set([
  ...JS_KEYWORDS,
  'as',
  'implements',
  'interface',
  'keyof',
  'namespace',
  'readonly',
  'type',
  'enum',
  'satisfies',
])

const PYTHON_KEYWORDS = new Set([
  'and',
  'as',
  'assert',
  'async',
  'await',
  'break',
  'class',
  'continue',
  'def',
  'del',
  'elif',
  'else',
  'except',
  'False',
  'finally',
  'for',
  'from',
  'global',
  'if',
  'import',
  'in',
  'is',
  'lambda',
  'None',
  'not',
  'or',
  'pass',
  'raise',
  'return',
  'True',
  'try',
  'while',
  'with',
  'yield',
])

const RUST_KEYWORDS = new Set([
  'as',
  'async',
  'await',
  'break',
  'const',
  'continue',
  'crate',
  'dyn',
  'else',
  'enum',
  'extern',
  'false',
  'fn',
  'for',
  'if',
  'impl',
  'in',
  'let',
  'loop',
  'match',
  'mod',
  'move',
  'mut',
  'pub',
  'ref',
  'return',
  'self',
  'Self',
  'static',
  'struct',
  'super',
  'trait',
  'true',
  'type',
  'unsafe',
  'use',
  'where',
  'while',
])

const KEYWORDS: Record<string, Set<string>> = {
  javascript: JS_KEYWORDS,
  jsx: JS_KEYWORDS,
  typescript: TS_KEYWORDS,
  tsx: TS_KEYWORDS,
  python: PYTHON_KEYWORDS,
  rust: RUST_KEYWORDS,
  go: new Set([
    'break',
    'case',
    'chan',
    'const',
    'continue',
    'default',
    'defer',
    'else',
    'fallthrough',
    'for',
    'func',
    'go',
    'goto',
    'if',
    'import',
    'interface',
    'map',
    'package',
    'range',
    'return',
    'select',
    'struct',
    'switch',
    'type',
    'var',
  ]),
  css: new Set([
    'important',
    'from',
    'to',
    'and',
    'not',
    'only',
    'or',
  ]),
}

function normalizeCode(code: string): string {
  return code.replace(/\r\n?/g, '\n').replace(/\n$/, '')
}

export function normalizeLanguage(language?: string | null): string {
  const key = (language ?? '').trim().toLowerCase()
  if (!key) return 'plaintext'
  return LANGUAGE_ALIASES[key] ?? key
}

export function languageLabel(language?: string | null): string {
  const normalized = normalizeLanguage(language)
  return LANGUAGE_LABELS[normalized] ?? normalized
}

/**
 * Turns `[2, 3]` or `"2-4,7"` into source line numbers. Garbage yields an
 * empty set instead of throwing — these values often come from model output.
 */
export function parseLineSpec(spec?: CodeBlockLineSpec): Set<number> {
  const out = new Set<number>()
  if (!spec) return out

  if (Array.isArray(spec)) {
    for (const value of spec) {
      if (Number.isInteger(value) && value > 0) out.add(value)
    }
    return out
  }

  for (const part of spec.split(',')) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const range = trimmed.match(/^(\d+)\s*-\s*(\d+)$/)
    if (range) {
      const start = Number(range[1])
      const end = Number(range[2])
      if (start > 0 && end >= start) {
        for (let line = start; line <= end; line += 1) out.add(line)
      }
      continue
    }
    if (/^\d+$/.test(trimmed)) {
      const single = Number(trimmed)
      if (single > 0) out.add(single)
    }
  }

  return out
}

/**
 * Reads `code` / `language` out of the props react-markdown gives a `pre`.
 */
export function markdownCodeProps(props: {
  children?: ReactNode
  className?: string
}): { code: string; language?: string } {
  let language: string | undefined
  let code = ''

  const className = props.className
  if (typeof className === 'string') {
    const match = className.match(/(?:^|\s)language-([\w+#-]+)/)
    if (match) language = match[1]
  }

  const child = Children.toArray(props.children)[0]
  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    const childClass = child.props.className
    if (!language && typeof childClass === 'string') {
      const match = childClass.match(/(?:^|\s)language-([\w+#-]+)/)
      if (match) language = match[1]
    }
    const inner = child.props.children
    if (typeof inner === 'string') code = inner
    else if (Array.isArray(inner)) code = inner.filter((part) => typeof part === 'string').join('')
  } else if (typeof child === 'string') {
    code = child
  }

  return { code: normalizeCode(code), language }
}

function keywordsFor(language: string): Set<string> | undefined {
  return KEYWORDS[language]
}

function tokenizeLine(text: string, language: string): CodeBlockToken[] {
  if (!text) return []
  if (language === 'plaintext' || language === 'text') {
    return [{ content: text }]
  }

  const keywords = keywordsFor(language)
  const hashComments = language === 'python' || language === 'bash' || language === 'yaml'
  const tokens: CodeBlockToken[] = []
  let index = 0

  const push = (content: string, kind?: CodeBlockToken['kind']) => {
    if (!content) return
    const last = tokens[tokens.length - 1]
    if (last && last.kind === kind) {
      last.content += content
      return
    }
    tokens.push(kind ? { content, kind } : { content })
  }

  while (index < text.length) {
    const rest = text.slice(index)
    const two = rest.slice(0, 2)

    if (two === '//' || (hashComments && rest.startsWith('#'))) {
      push(rest, 'comment')
      break
    }

    if (two === '/*') {
      const end = text.indexOf('*/', index + 2)
      if (end === -1) {
        push(rest, 'comment')
        break
      }
      push(text.slice(index, end + 2), 'comment')
      index = end + 2
      continue
    }

    const quote = rest[0]
    if (quote === '"' || quote === "'" || quote === '`') {
      let cursor = 1
      while (cursor < rest.length) {
        if (rest[cursor] === '\\') {
          cursor += 2
          continue
        }
        if (rest[cursor] === quote) {
          cursor += 1
          break
        }
        cursor += 1
      }
      push(rest.slice(0, cursor), 'string')
      index += cursor
      continue
    }

    const number = rest.match(/^\d+(?:\.\d+)?/)
    if (number) {
      push(number[0], 'number')
      index += number[0].length
      continue
    }

    const ident = rest.match(/^[A-Za-z_$][\w$]*/)
    if (ident) {
      const word = ident[0]
      push(word, keywords?.has(word) ? 'keyword' : undefined)
      index += word.length
      continue
    }

    push(rest[0])
    index += 1
  }

  return tokens
}

function hasHeaderChild(children: ReactNode): boolean {
  return Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === CodeBlockHeader,
  )
}

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onCopy'> {
  code: string
  language?: string
  title?: string
  showLang?: boolean
  showLineNumbers?: boolean
  startLine?: number
  highlightedLines?: CodeBlockLineSpec
  wrap?: boolean
  /**
   * Pre-tokenized source, one entry per line of `code`, to render instead
   * of the built-in tokenizer — pipe Shiki / Prism / Highlight.js output
   * through this. `code` is still required (used for copy, line numbers,
   * and collapse); a length mismatch just renders those lines untokenized.
   */
  tokens?: CodeBlockToken[][]
  maxLines?: number
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  copyLabel?: string
  copiedLabel?: string
  showMoreLabel?: string
  showLessLabel?: string
  /** Accessible name for the region. Defaults to "{language} code". */
  label?: string
  onCopy?: (value: string) => void
}

const CodeBlockRoot = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      title,
      showLang = true,
      showLineNumbers = false,
      startLine = 1,
      highlightedLines,
      wrap = false,
      tokens,
      maxLines,
      expanded: expandedProp,
      defaultExpanded = false,
      onExpandedChange,
      copyLabel = 'Copy code',
      copiedLabel = 'Copied',
      showMoreLabel = 'Show more',
      showLessLabel = 'Show less',
      label,
      onCopy,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const contentId = useId()
    const resolvedLanguage = normalizeLanguage(language)
    const resolvedLabel = languageLabel(language)
    const [expanded, setExpanded] = useControllableState({
      value: expandedProp,
      defaultValue: defaultExpanded,
      onChange: onExpandedChange,
    })

    const source = useMemo(() => normalizeCode(code), [code])
    const allLines = useMemo(() => source.split('\n'), [source])
    const tokenizedLines = useMemo(
      () => tokens ?? allLines.map((line) => tokenizeLine(line, resolvedLanguage)),
      [tokens, allLines, resolvedLanguage],
    )
    const highlighted = useMemo(() => parseLineSpec(highlightedLines), [highlightedLines])
    const collapsible = Boolean(maxLines && allLines.length > maxLines)
    const visibleLines = collapsible && !expanded ? allLines.slice(0, maxLines) : allLines
    const customHeader = hasHeaderChild(children)
    const showDefaultHeader = !customHeader && (Boolean(title) || (showLang && Boolean(language)))

    const context = useMemo<CodeBlockContextValue>(
      () => ({
        code: source,
        language: language ? resolvedLanguage : undefined,
        langLabel: resolvedLabel,
        showLineNumbers,
        wrap,
        startLine,
        highlighted,
        copyLabel,
        copiedLabel,
      }),
      [
        source,
        language,
        resolvedLanguage,
        resolvedLabel,
        showLineNumbers,
        wrap,
        startLine,
        highlighted,
        copyLabel,
        copiedLabel,
      ],
    )

    const gutterDigits = String(startLine + allLines.length - 1).length

    return (
      <CodeBlockContext.Provider value={context}>
        <div
          ref={ref}
          role="region"
          aria-label={label ?? `${resolvedLabel} code`}
          data-slot="code-block"
          data-language={language ? resolvedLanguage : undefined}
          data-has-header={customHeader || showDefaultHeader || undefined}
          className={cn('aero-code-block group/code-block', className)}
          {...rest}
        >
          {customHeader ? children : null}
          {showDefaultHeader ? (
            <CodeBlockHeader>
              {title ? <CodeBlockTitle>{title}</CodeBlockTitle> : <span className="min-w-0 flex-1" />}
              {showLang && language ? <CodeBlockLanguage /> : null}
              <CodeBlockCopy onCopy={onCopy} />
            </CodeBlockHeader>
          ) : null}
          {!customHeader && !showDefaultHeader ? <CodeBlockCopy onCopy={onCopy} /> : null}

          <pre
            id={contentId}
            dir="ltr"
            tabIndex={0}
            className={cn(
              'aero-code-block-body p-3',
              wrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre',
              collapsible && !expanded && 'pb-12',
            )}
          >
            <code className="grid min-w-full">
              {visibleLines.map((_line, index) => {
                const sourceLine = index + 1
                const displayNumber = startLine + index
                const tokens = tokenizedLines[index] ?? []
                const isHighlighted = highlighted.has(sourceLine)
                return (
                  <span
                    key={`${displayNumber}-${index}`}
                    data-slot="code-block-line"
                    data-line={displayNumber}
                    className={cn(
                      'flex min-h-[1.6em]',
                      isHighlighted && 'aero-code-block-line-highlight',
                    )}
                  >
                    {showLineNumbers ? (
                      <span
                        aria-hidden
                        className="sticky left-0 mr-3 inline-block shrink-0 select-none bg-[var(--recessed-surface)] pr-2 text-right text-[color:var(--text-muted)]"
                        style={{ minWidth: `${gutterDigits + 1}ch` }}
                      >
                        {displayNumber}
                      </span>
                    ) : null}
                    <span className="min-w-0 flex-1">
                      {tokens.length === 0
                        ? ' '
                        : tokens.map((token, tokenIndex) =>
                            token.kind ? (
                              <span
                                key={tokenIndex}
                                data-kind={token.kind}
                                className="aero-code-block-token"
                              >
                                {token.content}
                              </span>
                            ) : (
                              <span key={tokenIndex}>{token.content}</span>
                            ),
                          )}
                    </span>
                  </span>
                )
              })}
            </code>
          </pre>

          {collapsible ? (
            <div className="absolute inset-x-0 bottom-0 z-[var(--z-raised)] flex justify-center bg-gradient-to-t from-[var(--panel-surface)] via-[color-mix(in_srgb,var(--panel-surface)_85%,transparent)] to-transparent pt-8 pb-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                aria-expanded={expanded}
                aria-controls={contentId}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? showLessLabel : showMoreLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </CodeBlockContext.Provider>
    )
  },
)
CodeBlockRoot.displayName = 'CodeBlock'

export type CodeBlockHeaderProps = HTMLAttributes<HTMLDivElement>

const CodeBlockHeader = forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ className, ...rest }, ref) => {
    return (
      <CodeBlockHeaderContext.Provider value={true}>
        <div
          ref={ref}
          data-slot="code-block-header"
          className={cn('aero-code-block-header', className)}
          {...rest}
        />
      </CodeBlockHeaderContext.Provider>
    )
  },
)
CodeBlockHeader.displayName = 'CodeBlock.Header'

export type CodeBlockTitleProps = HTMLAttributes<HTMLDivElement>

const CodeBlockTitle = forwardRef<HTMLDivElement, CodeBlockTitleProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="code-block-title"
        className={cn(
          'min-w-0 flex-1 truncate font-[family-name:var(--font-mono)] text-xs text-[color:var(--text)]',
          className,
        )}
        {...rest}
      />
    )
  },
)
CodeBlockTitle.displayName = 'CodeBlock.Title'

export type CodeBlockLanguageProps = HTMLAttributes<HTMLSpanElement>

const CodeBlockLanguage = forwardRef<HTMLSpanElement, CodeBlockLanguageProps>(
  ({ className, children, ...rest }, ref) => {
    const { language, langLabel: resolved } = useCodeBlock('Language')
    const label = children ?? resolved ?? language
    if (!label) return null

    return (
      <span
        ref={ref}
        data-slot="code-block-language"
        className={cn('aero-code-block-language', className)}
        {...rest}
      >
        {label}
      </span>
    )
  },
)
CodeBlockLanguage.displayName = 'CodeBlock.Language'

export interface CodeBlockCopyProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onCopy'> {
  value?: string
  timeout?: number
  onCopy?: (value: string) => void
  copyLabel?: string
  copiedLabel?: string
}

const CodeBlockCopy = forwardRef<HTMLButtonElement, CodeBlockCopyProps>(
  (
    {
      value,
      timeout = 2000,
      onCopy,
      copyLabel: copyLabelProp,
      copiedLabel: copiedLabelProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const inHeader = useContext(CodeBlockHeaderContext)
    const ctx = useContext(CodeBlockContext)
    const [copied, setCopied] = useState(false)
    // In a header it sits inline; on a bare block it pins to the top-right.
    const pinned = !inHeader
    const copyLabel = copyLabelProp ?? ctx?.copyLabel ?? 'Copy code'
    const copiedLabel = copiedLabelProp ?? ctx?.copiedLabel ?? 'Copied'

    useEffect(() => {
      if (!copied || timeout === 0) return
      const id = window.setTimeout(() => setCopied(false), timeout)
      return () => window.clearTimeout(id)
    }, [copied, timeout])

    const handleClick = useCallback(() => {
      const payload = value ?? ctx?.code ?? ''
      if (!payload) return
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) return

      void navigator.clipboard.writeText(payload).then(
        () => {
          setCopied(true)
          onCopy?.(payload)
        },
        () => undefined,
      )
    }, [value, ctx, onCopy])

    return (
      <>
        <IconButton
          ref={ref}
          type="button"
          variant="ghost"
          size="sm"
          data-slot="code-block-copy"
          data-copied={copied || undefined}
          aria-label={copied ? copiedLabel : copyLabel}
          icon={
            <IconSwap
              className="size-3.5"
              active={copied}
              initial={<CopyIcon size={14} />}
              swapped={<CheckIcon size={14} />}
            />
          }
          onClick={handleClick}
          className={cn(
            'ml-auto shrink-0',
            pinned && 'absolute top-2 right-2 z-[var(--z-raised)]',
            className,
          )}
          {...rest}
        />
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? copiedLabel : ''}
        </span>
      </>
    )
  },
)
CodeBlockCopy.displayName = 'CodeBlock.Copy'

export const CodeBlock = Object.assign(CodeBlockRoot, {
  Header: CodeBlockHeader,
  Title: CodeBlockTitle,
  Language: CodeBlockLanguage,
  Copy: CodeBlockCopy,
})
