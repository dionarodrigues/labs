import { Story, Meta } from '@storybook/react/types-6-0'
import Main from '.'

export default {
  title: 'Main',
  component: Main
} as Meta

export const Default: Story = () => (
  <Main
    title="NextJS boilerplate"
    description="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
  />
)
