import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import { KeyboardListenerProvider } from '../../context'
import { Layout } from '../../components'
import Select from './select.component'

storiesOf('Select', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'select--custom'),
    theme: 'envy',
    forceMenuOpen: true
  }

  return (
    <KeyboardListenerProvider>
      <Layout flex alignItems='center' justifyContent='center' height='comfy'>
        <Select {...propConfig} />
      </Layout>
    </KeyboardListenerProvider>
  )
})

export default {
  title: 'Select',
  component: Select
}
