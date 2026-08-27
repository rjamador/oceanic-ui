import type { Preview } from '@storybook/react-vite'

import '../src/index.css'

const preview: Preview = {
  // Every component gets an auto-generated Docs page (prop table from its
  // TS types + JSDoc, plus all its stories).
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    viewport: {
      options: {
        mobile: { name: 'Mobile (375)', styles: { width: '375px', height: '812px' } },
        narrow: { name: 'Narrow (320)', styles: { width: '320px', height: '720px' } },
        tablet: { name: 'Tablet (768)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop (1280)', styles: { width: '1280px', height: '800px' } },
      },
    },
  },
}

export default preview
