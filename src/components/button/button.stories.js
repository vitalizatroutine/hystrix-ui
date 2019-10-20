import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Customizer } from '../../storybookComponents'
import Button from './button.component'

const buttonConfig = [{
  field: 'label',
  type: 'text',
  initialValue: 'Goodnight World'
}, {
  field: 'icon',
  type: 'text',
  initialValue: '😴'
}, {
  field: 'disabled',
  type: 'boolean',
  initialValue: false
}]

storiesOf('Button', module).add('Default', () => (
  <Customizer config={buttonConfig} component={<Button/>}/>
))

export default {
  title: 'Button',
  component: Button
}