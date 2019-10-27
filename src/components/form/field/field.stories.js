import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Customizer } from '../../../storybookComponents/index'
import Field from './field.component'

const propConfig = [{
  field: 'className',
  type: 'text',
  initialValue: '',
  placeholder: 'button--custom'
}, {
  field: 'id',
  type: 'text',
  initialValue: 'unique-field',
  placeholder: 'unique-field'
}, {
  field: 'name',
  type: 'text',
  initialValue: 'unique-field',
  placeholder: 'unique-field'
}, {
  field: 'label',
  type: 'text',
  initialValue: 'Message to the world',
  placeholder: 'Message to the world'
}, {
  field: 'value',
  type: 'text',
  initialValue: 'Goodnight World',
  placeholder: 'Goodnight World'
}, {
  field: 'placeholder',
  type: 'text',
  initialValue: 'Placeholder Value',
  placeholder: 'Placeholder Value'
}, {
  field: 'minLength',
  type: 'number',
  initialValue: 0,
  placeholder: 'null or number'
}, {
  field: 'maxLength',
  type: 'number',
  initialValue: 64,
  placeholder: 'null or number'
}, {
  field: 'readOnly',
  type: 'boolean',
  initialValue: false
}, {
  field: 'type',
  type: 'choice',
  options: ['text', 'number', 'textarea'],
  initialValue: 'text'
}, {
  field: 'size',
  type: 'choice',
  options: ['small', 'default', 'large'],
  initialValue: 'default'
}, {
  field: 'onChange',
  description: 'Triggered when the user changes the value of the Field.',
  type: 'function',
  initialValue: action('Field onChange has been triggered')
}]

storiesOf('Field', module).add('Default', () => (
  <Customizer config={propConfig} component={<Field />} />
))

export default {
  title: 'Field',
  component: Field
}
