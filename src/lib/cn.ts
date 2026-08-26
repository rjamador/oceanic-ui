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
        'aero-list-root',
        'aero-list-item',
        'aero-list-item-selected',
        'aero-pagination-page',
        'aero-segmented-root',
        'aero-segmented-option',
        'aero-segmented-option-selected',
        'aero-skeleton-base',
      ],
    },
  },
})

export type { ClassValue }

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values))
}
