import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Composed multi-property effects defined in src/styles/theme.css (Vista
// Glass gradients, glass surfaces) act as a single class but set
// background/background-color like a plain bg-* utility. Registering them
// here lets a consumer's plain utility (e.g. bg-red-500) deterministically
// win over them via tailwind-merge's conflict resolution, instead of
// depending on unpredictable CSS load order between two separate builds.
// Add new composed classes to this list as they're introduced.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'bg-color': [
        'aero-btn-primary',
        'aero-btn-secondary',
        'aero-btn-ghost',
        'aero-glass',
        'aero-accordion-item',
        'aero-accordion-summary',
        'aero-tabs-tab',
        'aero-tabs-tab-selected',
        'aero-tabs-panel',
        'aero-dialog-panel',
        'aero-toast-surface',
        'aero-progress-track',
        'aero-progress-fill',
      ],
    },
  },
})

export type { ClassValue }

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values))
}
