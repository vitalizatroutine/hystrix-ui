import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Layout } from '../../../storybookComponents/index'
import Field from './field.component'

storiesOf('Field', module).add('TextInput', () => (
  <Layout horizontalAlign='center' verticalAlign='center'>
    <Field
      label='field label'
      id='story-book-field'
      name='story-book-field'
      size='large'
      onChange={action('Input value was changed.')}
    />
  </Layout>
))

export default {
  title: 'Field',
  component: Field
}