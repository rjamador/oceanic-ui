import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  typescript: {
    // Pull prop tables (types + JSDoc descriptions) straight from the
    // component's TS interfaces rather than runtime PropTypes.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // Root tsconfig.json is a solution file (references only); point the
      // extractor at the one that actually compiles src/.
      tsconfigPath: 'tsconfig.app.json',
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Drop the inherited DOM attributes (…HTMLAttributes) from the tables
      // but keep our own props and the cva variant/size props.
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/@types\/react\//.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, { plugins: [tailwindcss()] })
  },
}
export default config
