import { createContext, useContext, useState, type ReactNode } from 'react'

export const PMS = ['npm', 'pnpm', 'bun', 'yarn'] as const
export type Pm = (typeof PMS)[number]

/** Install command per package manager. */
export const PM_ADD: Record<Pm, string> = {
  npm: 'npm install oceanic-ui',
  pnpm: 'pnpm add oceanic-ui',
  bun: 'bun add oceanic-ui',
  yarn: 'yarn add oceanic-ui',
}

const PmContext = createContext<{ pm: Pm; setPm: (p: Pm) => void }>({
  pm: 'npm',
  setPm: () => {},
})

export const usePm = () => useContext(PmContext)

export function PmProvider({ children }: { children: ReactNode }) {
  const [pm, setPm] = useState<Pm>('npm')
  return <PmContext.Provider value={{ pm, setPm }}>{children}</PmContext.Provider>
}
