import { ChevronRightIcon } from 'oceanic-ui'
import { COMPONENTS, REPO } from '../lib/constants'
import { SectionHead } from '../components/SectionHead'

export function ComponentIndex() {
  return (
    <section className="section" id="components">
      <SectionHead
        n="04"
        title={`${COMPONENTS.length} components`}
        note="one small entry point each"
      />
      <ul className="chips">
        {COMPONENTS.map((name) => (
          <li key={name}>
            <a href={REPO}>
              <span>{name}</span>
              <ChevronRightIcon size={16} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
