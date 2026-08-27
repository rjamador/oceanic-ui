import { useState, type ReactNode } from 'react'

import { PmContext, type Pm } from './pm'

export function PmProvider({ children }: { children: ReactNode }) {
  const [pm, setPm] = useState<Pm>('npm')
  return <PmContext.Provider value={{ pm, setPm }}>{children}</PmContext.Provider>
}
