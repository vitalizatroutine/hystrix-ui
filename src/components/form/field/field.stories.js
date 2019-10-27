import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Customizer } from '../../../storybookComponents/index'
import Field from './field.component'
import PropTypes from 'prop-types'

const props = {
  type: PropTypes.string,
  theme: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  readyOnly: PropTypes.bool,
  onChange: PropTypes.func
}

const propConfig = [{
  field: 'className',
  type: 'text',
  initialValue: '',
  placeholder: 'button--custom'
}, {
  field: 'label',
  type: 'text',
  initialValue: 'Goodnight World',
  placeholder: 'Goodnight World'
}, {
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
}, {
  field: 'onClick',
  description: 'Triggered when the user clicks the Field. The button is automatically blurred after click.',
  type: 'function',
  initialValue: action('Field onClick has been triggered')
}]

storiesOf('Field', module).add('Default', () => (
  <Customizer config={propConfig} component={<Field />} />
))

export default {
  title: 'Field',
  component: Field
}
