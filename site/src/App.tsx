import type { ReactNode } from 'react'
import { PmProvider } from './lib/pm'
import { TopBar } from './sections/TopBar'
import { Hero } from './sections/Hero'
import { Facts } from './sections/Facts'
import { Showcase } from './sections/Showcase'
import { Principles } from './sections/Principles'
import { Quickstart } from './sections/Quickstart'
import { ComponentIndex } from './sections/ComponentIndex'
import { Footer } from './sections/Footer'

/** Full-bleed tinted band with hairline top/bottom — used to seat the
    "workspace" sections (the ones framed in an application window). */
function Band({ children }: { children: ReactNode }) {
  return (
    <div className="border-y border-[var(--line)] bg-[var(--panel-surface)]">{children}</div>
  )
}

export function App() {
  return (
    <PmProvider>
      <TopBar />
      <main>
        <Hero />
        <Facts />
        <Band>
          <Showcase />
        </Band>
        <Principles />
        <Band>
          <Quickstart />
        </Band>
        <ComponentIndex />
      </main>
      <Footer />
    </PmProvider>
  )
}
