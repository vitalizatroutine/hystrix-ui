import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withCustomizer from '../../storybookAddons/customizer'

import { Button, Layout } from '../../components'

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
  description: 'Triggered when the user clicks the Button. The button is automatically blurred after click.',
  type: 'function',
  initialValue: action('Button onClick has been triggered')
}]

storiesOf('Button', module).addDecorator(withCustomizer).add('Default', () => (
  <Layout flex alignItems='center' justifyContent='center' height='fill'>
    <Button {...propConfig.reduce((props, prop) => {
      props[prop.field] = prop.placeholder || prop.initialValue
      return props
    }, {})}
    />
  </Layout>
), {
  customizerParams: {
    a: 'b'
  }
})

export default {
  title: 'Button',
  component: Button
}
