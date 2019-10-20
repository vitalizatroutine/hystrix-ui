import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Frame } from '../../../storybookComponents/index'
import Field from './field.component'

storiesOf('Field', module).add('TextInput', () => (
  <Frame horizontalAlign='center' verticalAlign='center'>
    <Field
      label='field label'
      id='story-book-field'
      name='story-book-field'
      size='large'
      onChange={action('Input value was changed.')}
    />
  </Frame>
))

export default {
  title: 'Field',
  component: Field
}