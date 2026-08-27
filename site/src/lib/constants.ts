export const REPO = 'https://github.com/rjamador/oceanic-ui'
export const INSTALL = 'bun add oceanic-ui'

export const COMPONENTS = [
  'Accordion', 'Avatar', 'Badge', 'Button', 'Card', 'Checkbox', 'Dialog',
  'Divider', 'Icon', 'IconButton', 'Input', 'List', 'Pagination', 'Progress',
  'Radio', 'SegmentedControl', 'Select', 'Skeleton', 'Slider', 'Spinner',
  'Switch', 'Tabs', 'Text', 'Textarea', 'Toast', 'Tooltip',
]

export function scrollToHash(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
}
