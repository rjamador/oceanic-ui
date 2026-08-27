import { Text } from 'oceanic-ui'
import { SectionHead } from '../components/SectionHead'

export function Principles() {
  return (
    <section className="section">
      <SectionHead n="02" title="A short design language" note="the whole thing fits on a napkin" />
      <div className="principles">
        <article>
          <div className="pr-visual pr-glow">
            <span />
          </div>
          <Text as="h3" variant="headingSmall">
            Glow, not gloss
          </Text>
          <Text variant="bodyMedium" color="muted">
            The only shine is a soft blue focus ring on <code>:focus-visible</code>. No reflections,
            no sweep animations, nothing sitting on top of a control.
          </Text>
        </article>
        <article>
          <div className="pr-visual pr-depth">
            <span className="raised" />
            <span className="recessed" />
          </div>
          <Text as="h3" variant="headingSmall">
            Recessed vs. raised
          </Text>
          <Text variant="bodyMedium" color="muted">
            Buttons lift toward you; fields sink into the surface. Your eye tells &ldquo;click
            here&rdquo; from &ldquo;type here&rdquo; before you read a word.
          </Text>
        </article>
        <article>
          <div className="pr-visual pr-opaque">
            <span className="a" />
            <span className="b" />
          </div>
          <Text as="h3" variant="headingSmall">
            Every surface opaque
          </Text>
          <Text variant="bodyMedium" color="muted">
            Cards, dialogs, toasts &mdash; all a solid fill. No frosted glass, no{' '}
            <code>backdrop-filter</code>: that&rsquo;s a Vista&#8288;-&#8288;era idiom Ocean never had.
          </Text>
        </article>
      </div>
    </section>
  )
}
