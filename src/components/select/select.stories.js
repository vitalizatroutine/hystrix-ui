import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import { Layout } from '../../components'
import Select from './select.component'

storiesOf('Select', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'select--custom'),
    id: text('id', 'customSelect'),
    name: text('name', 'selectValue'),
    theme: 'envy',
    forceMenuOpen: false
  }

  return (
    <Layout height='fill'>
      <Select {...propConfig} />
    </Layout>
  )
})

export default {
  title: 'Select',
  component: Select
}
