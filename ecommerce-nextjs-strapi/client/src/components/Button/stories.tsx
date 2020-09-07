import { withKnobs, text } from '@storybook/addon-knobs'
import Button from './'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs]
}

export const Default = () => <Button title={text('Title', 'Button Title')} />
