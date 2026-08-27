import { useState, type ReactNode } from 'react'
import { SegmentedControl } from 'oceanic-ui'
import { usePm, PM_ADD } from '../lib/pm'
import { Window } from '../components/Window'
import { SectionHead } from '../components/SectionHead'

type Method = 'entry' | 'css'

export function Quickstart() {
  const { pm } = usePm()
  const [method, setMethod] = useState<Method>('entry')

  const install: ReactNode[] = [
    <span className="c-com"># install</span>,
    <span className="c-fn">{PM_ADD[pm]}</span>,
    <>&nbsp;</>,
  ]

  const entry: ReactNode[] = [
    ...install,
    <span className="c-com">// main.tsx — import once, wherever your app boots</span>,
    <>
      <span className="c-kw">import</span> <span className="c-str">'oceanic-ui/styles.css'</span>
    </>,
    <>
      <span className="c-kw">import</span> {'{ Button }'} <span className="c-kw">from</span>{' '}
      <span className="c-str">'oceanic-ui'</span>
    </>,
  ]

  const css: ReactNode[] = [
    ...install,
    <span className="c-com">/* index.css — sits above your own rules */</span>,
    <>
      <span className="c-kw">@import</span> <span className="c-str">'oceanic-ui/styles.css'</span>;
    </>,
  ]

  const isEntry = method === 'entry'

  return (
    <section className="section" id="start">
      <SectionHead n="03" title="Add the stylesheet once" note="whichever fits your setup" />
      <div className="quickstart__switch">
        <SegmentedControl
          defaultValue="entry"
          aria-label="Where to import the styles"
          onValueChange={(v) => setMethod(v as Method)}
        >
          <SegmentedControl.Option value="entry">JS entry file</SegmentedControl.Option>
          <SegmentedControl.Option value="css">Global CSS</SegmentedControl.Option>
        </SegmentedControl>
      </div>
      <Window title={isEntry ? 'app/main.tsx' : 'src/index.css'}>
        <CodePane lines={isEntry ? entry : css} />
        <p className="quickstart__note">
          <code>styles.css</code> ships precompiled &mdash; every class the components use is already
          real CSS, so nothing has to scan <code>node_modules</code>. Bring your own preflight.
        </p>
      </Window>
    </section>
  )
}

function CodePane({ lines }: { lines: ReactNode[] }) {
  return (
    <div className="code">
      <div className="code__gutter" aria-hidden="true">
        {lines.map((_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
      <pre className="code__body">
        {lines.map((line, i) => (
          <code key={i}>{line}</code>
        ))}
      </pre>
    </div>
  )
}
