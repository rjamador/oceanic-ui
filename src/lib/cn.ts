import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Composed multi-property effects defined in src/styles/theme.css (Ocean
// gradients, panel surfaces) act as a single class but set
// background/background-color like a plain bg-* utility. Registering them
// here lets a consumer's plain utility (e.g. bg-red-500) deterministically
// win over them via tailwind-merge's conflict resolution, instead of
// depending on unpredictable CSS load order between two separate builds.
// Add new composed classes to this list as they're introduced.
//
// IMPORTANT: only register a class here if it's a standalone/swappable
// background (mutually exclusive variants like aero-btn-primary/secondary,
// or a lone override target like aero-panel) — NOT a structural base class
// that a cva call always combines with one of its own modifier classes on
// the same element (e.g. 'aero-tabs-tab' + 'aero-tabs-tab-selected' render
// together whenever a tab is selected). If both the base and its modifier
// are registered, tailwind-merge treats them as conflicting alternatives
// and silently drops the base — deleting its padding/border/radius, not
// just its background. Register only the modifier in that case.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'bg-color': [
        'aero-btn-primary',
        'aero-btn-secondary',
        'aero-btn-ghost',
        'aero-panel',
        'aero-icon-button-primary',
        'aero-icon-button-secondary',
        'aero-icon-button-ghost',
        'aero-checkbox-box',
        'aero-radio-box',
        'aero-radio-dot',
        'aero-switch-track',
        'aero-switch-thumb',
        'aero-input-field',
        'aero-textarea-field',
        'aero-select-field',
        'aero-accordion-item',
        'aero-accordion-summary',
        'aero-tabs-tab-selected',
        'aero-tabs-panel',
        'aero-dialog-panel',
        'aero-toast-surface',
        'aero-progress-track',
        'aero-progress-fill',
        'aero-list-root',
        'aero-list-item-selected',
        'aero-pagination-page',
        'aero-segmented-root',
        'aero-segmented-option-selected',
        'aero-skeleton-base',
        'aero-slider',
        'aero-composer-frame',
        'aero-attachment',
        'aero-attachment-media',
        'aero-bubble-content-user',
        'aero-bubble-content-assistant',
        'aero-bubble-content-outline',
        'aero-bubble-content-ghost',
        'aero-bubble-content-danger',
        'aero-popover-panel',
        'aero-alert-info',
        'aero-alert-success',
        'aero-alert-warning',
        'aero-alert-danger',
        'aero-empty',
        'aero-empty-media',
        'aero-file-upload',
        'aero-code-block',
        'aero-code-block-header',
        'aero-code-block-body',
        // Pure background modifier (the failure tint), applied on top of the
        // structural 'aero-tool-call' base — which is NOT registered, so a
        // consumer's bg-* still wins here without dropping row layout.
        'aero-tool-call-error',
      ],
    },
  },
})

export type { ClassValue }

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values))
}
