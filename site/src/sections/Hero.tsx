import { useState, type CSSProperties } from 'react'
import { Button, SegmentedControl, Text } from 'oceanic-ui'
import { PM_ADD, PMS, usePm, type Pm } from '../lib/pm'
import { COMPONENTS, scrollToHash } from '../lib/constants'

const step = (i: number) => ({ '--i': i }) as CSSProperties

export function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__mark reveal"
        src="/logo.png"
        alt="oceanic-ui"
        width={72}
        height={72}
        style={step(0)}
      />
      <p className="kicker reveal" style={step(1)}>
        // Ocean look &amp; feel · for React 19
      </p>
      <h1 className="reveal" style={step(2)}>
        The Ocean look&nbsp;&amp;&nbsp;feel,
        <br />
        rebuilt for the&nbsp;web.
      </h1>
      <Text
        variant="bodyLarge"
        color="muted"
        className="reveal mx-auto mt-[22px] block max-w-[40rem]"
        style={step(3)}
      >
        {COMPONENTS.length} accessible React components in the spirit of Java Swing&rsquo;s Ocean
        theme &mdash; cool near&#8288;-&#8288;white gradients, restrained rounding, a soft glow
        instead of gloss. Precompiled CSS, tree&#8288;-&#8288;shakeable, WCAG&nbsp;AA contrast.
      </Text>
      <div className="hero__cta reveal" style={step(4)}>
        <Button size="lg" onClick={() => scrollToHash('#start')}>
          Get started
        </Button>
        <Button size="lg" variant="secondary" onClick={() => scrollToHash('#components')}>
          Browse components
        </Button>
      </div>
      <div className="reveal" style={step(5)}>
        <InstallStrip />
      </div>
    </section>
  )
}

function InstallStrip() {
  const { pm, setPm } = usePm()
  const [copied, setCopied] = useState(false)

  return (
    <div className="install">
      <SegmentedControl
        defaultValue={pm}
        aria-label="Package manager"
        onValueChange={(v) => setPm(v as Pm)}
      >
        {PMS.map((name) => (
          <SegmentedControl.Option key={name} value={name}>
            {name}
          </SegmentedControl.Option>
        ))}
      </SegmentedControl>
      <div className="install__cmd">
        <span className="install__scroll">
          <span className="install__prompt" aria-hidden="true">
            $
          </span>
          <code>{PM_ADD[pm]}</code>
        </span>
        <button
          className="install__copy"
          onClick={() => {
            navigator.clipboard?.writeText(PM_ADD[pm])
            setCopied(true)
            setTimeout(() => setCopied(false), 1600)
          }}
        >
          {copied ? 'copied ✓' : 'copy'}
        </button>
      </div>
    </div>
  )
}
