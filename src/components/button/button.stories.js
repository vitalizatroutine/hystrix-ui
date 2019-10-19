import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Frame } from '../../storybookComponents/index'
import Button from './button.component'

storiesOf('Button', module).add('Default', () => (
  <Frame horizontalAlign='center' verticalAlign='center'>
    <Button
      size='large'
      wide
      label='Goodnight World'
      icon='😴'
      onClick={action('Button has been clicked')}
    />
  </Frame>
))

export default {
  title: 'Button',
  component: Button
}