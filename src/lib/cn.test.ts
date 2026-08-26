import { describe, expect, it } from 'vitest'

import { cn } from './cn'

describe('cn', () => {
  it('joins plain string classes, dropping falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })

  it('lets a later plain Tailwind utility override an earlier conflicting one', () => {
    expect(cn('bg-sky-500', 'bg-red-500')).toBe('bg-red-500')
  })

  it('lets a consumer bg-* class fully replace a composed aero-btn-primary utility', () => {
    expect(cn('aero-btn-primary', 'bg-red-500')).toBe('bg-red-500')
  })
})
