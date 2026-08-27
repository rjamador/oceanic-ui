import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

// jsdom ships neither of these; Floating UI's autoUpdate reaches for both
// (and degrades quietly when they throw, but the noise isn't worth it).
if (!('ResizeObserver' in globalThis)) {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
if (!('matchMedia' in window)) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

// jsdom doesn't implement <dialog>'s showModal()/close() (they require
// layout, which jsdom deliberately skips) — polyfill just enough of the
// behavior Dialog.tsx relies on: toggling `open` and firing the `close`
// event. See https://github.com/jsdom/jsdom/issues/3294.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
}
if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    if (!this.open) return
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
// Real browsers close a modal <dialog> when Escape is pressed (a `cancel`
// event fires first; jsdom doesn't drive either). Approximate it so
// keyboard-close tests exercise the same `close` event path Dialog.tsx
// listens on.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  const openDialog = document.querySelector('dialog[open]')
  if (openDialog instanceof HTMLDialogElement) {
    openDialog.close()
  }
})
