import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, radios } from '@storybook/addon-knobs'

import { Layout, Button } from '../../components'

storiesOf('Layout', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'layout--custom'),
    theme: radios('theme', {
      none: null,
      white: 'white',
      light: 'light',
      dark: 'dark',
      black: 'black'
    }, null),
    height: radios('height', {
      auto: 'auto',
      comfy: 'comfy',
      fill: 'fill'
    }, 'fill'),
    paddingMultiplier: radios('paddingMultiplier', {
      one: 'one',
      two: 'two',
      three: 'three',
      four: 'four',
      five: 'five'
    }, 'five'),
    flex: boolean('flex', true),
    justifyContent: radios('justifyContent', {
      'flex-start': 'flex-start',
      center: 'center',
      'flex-end': 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around'
    }, 'center'),
    alignItems: radios('alignItems', {
      'flex-start': 'flex-start',
      center: 'center',
      'flex-end': 'flex-end',
      stretched: 'stretched'
    }, 'center'),
    direction: radios('direction', {
      row: 'row',
      column: 'column'
    }, 'column')
  }

  return (
    <Layout {...propConfig}>
      <Button label='Nothing to see here' />
    </Layout>
  )
})

export default {
  title: 'Layout',
  component: Layout
}
