import { Badge } from 'oceanic-ui'
import { REPO } from '../lib/constants'

export function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__in">
        <a className="brand" href="#top">
          <img src="/logo.png" alt="" width={26} height={26} />
          <span>oceanic&#8288;-&#8288;ui</span>
          <Badge>v0.0.3</Badge>
        </a>
        <nav className="topbar__nav">
          <a href="#components">Components</a>
          <a href="#start">Install</a>
          <a href={REPO}>GitHub</a>
        </nav>
      </div>
    </header>
  )
}
