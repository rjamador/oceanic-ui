import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from './Slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    defaultValue: 50,
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Stepped: Story = {
  args: { label: 'Brightness', min: 0, max: 10, step: 1, defaultValue: 4 },
}
