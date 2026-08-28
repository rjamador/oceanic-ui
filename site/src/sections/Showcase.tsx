import { useMemo, useState } from 'react'
import { CodeBlock, SegmentedControl, Select, Sidebar, Text } from 'oceanic-ui'
import { Window } from '../components/Window'
import { SectionHead } from '../components/SectionHead'
import { ENTRIES, GROUPS } from './workspace'

type Mode = 'preview' | 'source'

export function Showcase() {
  const [activeId, setActiveId] = useState(ENTRIES[0].id)
  const [mode, setMode] = useState<Mode>('preview')

  const entry = useMemo(
    () => ENTRIES.find((e) => e.id === activeId) ?? ENTRIES[0],
    [activeId],
  )
  const { Scene } = entry

  return (
    <section className="section showcase">
      <SectionHead
        n="01"
        title="Components at work"
        note="pick one from the rail — every scene is the real package"
      />
      <Window title="oceanic-ui — workspace" flush>
        <div className="workspace">
          <Sidebar.Provider collapsible="icon" mobileBreakpoint={0}>
            <Sidebar aria-label="Component scenes" className="ws-rail">
              <Sidebar.Rail />
              <Sidebar.Body>
                {GROUPS.map((group) => (
                  <Sidebar.Group key={group} label={group}>
                    <Sidebar.Menu>
                      {ENTRIES.filter((e) => e.group === group).map((e) => (
                        <Sidebar.Item
                          key={e.id}
                          label={e.label}
                          active={e.id === activeId}
                          aria-current={e.id === activeId ? 'true' : undefined}
                          onClick={() => {
                            setActiveId(e.id)
                            setMode('preview')
                          }}
                        >
                          {e.label}
                        </Sidebar.Item>
                      ))}
                    </Sidebar.Menu>
                  </Sidebar.Group>
                ))}
              </Sidebar.Body>
            </Sidebar>

            <Sidebar.Main className="ws-stage">
              <div className="ws-stage__bar">
                {/* the rail is the picker on desktop; on mobile it's hidden and
                    this Select takes over */}
                <div className="ws-stage__picker">
                  <Select
                    aria-label="Scene"
                    value={activeId}
                    onChange={(event) => {
                      setActiveId(event.target.value)
                      setMode('preview')
                    }}
                  >
                    {GROUPS.map((group) => (
                      <optgroup key={group} label={group}>
                        {ENTRIES.filter((e) => e.group === group).map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </div>
                <span className="ws-stage__title">{entry.label}</span>
                <span className="ws-stage__spacer" />
                <SegmentedControl
                  key={entry.id}
                  defaultValue="preview"
                  aria-label="Preview or source"
                  onValueChange={(v) => setMode(v as Mode)}
                >
                  <SegmentedControl.Option value="preview">Preview</SegmentedControl.Option>
                  <SegmentedControl.Option value="source">Source</SegmentedControl.Option>
                </SegmentedControl>
              </div>

              <div className="ws-stage__body" data-mode={mode}>
                {mode === 'preview' ? (
                  <Scene key={entry.id} />
                ) : (
                  <div className="ws-canvas">
                    <CodeBlock
                      className="w-full"
                      title={`${entry.label} — JSX`}
                      language="tsx"
                      code={entry.code}
                    />
                    <Text variant="bodySmall" color="muted" className="m-0">
                      Trimmed for the page — full source in the repo.
                    </Text>
                  </div>
                )}
              </div>
            </Sidebar.Main>
          </Sidebar.Provider>
        </div>
      </Window>
    </section>
  )
}
