import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Customizer } from '../../storybookComponents'
import Button from './button.component'

const buttonConfig = [{
  field: 'className',
  type: 'text',
  initialValue: '',
  placeholder: 'button--custom'
}, {
  field: 'label',
  type: 'text',
  initialValue: 'Goodnight World',
  placeholder: 'Goodnight World'
},{
  field: 'linkTo',
  type: 'text',
  initialValue: '',
  placeholder: 'https://google.ca'
}, {
  field: 'icon',
  type: 'text',
  initialValue: '😴',
  placeholder: '😴'
}, {
  field: 'square',
  type: 'boolean',
  initialValue: false
}, {
  field: 'circle',
  type: 'boolean',
  initialValue: false
}, {
  field: 'wide',
  type: 'boolean',
  initialValue: false
}, {
  field: 'loading',
  type: 'boolean',
  initialValue: false
}, {
  field: 'disabled',
  type: 'boolean',
  initialValue: false
}, {
  field: 'invisible',
  type: 'boolean',
  initialValue: false
}, {
  field: 'hidden',
  type: 'boolean',
  initialValue: false
}, {
  field: 'size',
  type: 'choice',
  options: ['small', 'default', 'large'],
  initialValue: 'default'
}]

storiesOf('Button', module).add('Default', () => (
  <Customizer config={buttonConfig} component={<Button/>}/>
))

export default {
  title: 'Button',
  component: Button
}