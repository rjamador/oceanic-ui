import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumb } from './Breadcrumb'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
      <Breadcrumb.Item current>Composer</Breadcrumb.Item>
    </Breadcrumb>
  ),
}
