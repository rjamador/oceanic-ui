export const REPO = 'https://github.com/rjamador/oceanic-ui'
export const INSTALL = 'bun add oceanic-ui'

export const COMPONENTS = [
  'Accordion', 'Alert', 'Attachment', 'Avatar', 'Badge', 'Breadcrumb', 'Bubble',
  'Button', 'Card', 'Checkbox', 'CodeBlock', 'Composer', 'Dialog', 'Divider', 'Empty',
  'FileUpload', 'Icon', 'IconButton', 'IconSwap', 'Input', 'List', 'Marker',
  'Menu', 'Message', 'Pagination', 'Popover', 'Progress', 'Radio',
  'SegmentedControl', 'Select', 'Skeleton', 'Slider', 'Spinner', 'Switch',
  'Tabs', 'Text', 'Textarea', 'Toast', 'Tooltip',
]

export function scrollToHash(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
}
