import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { FillerBlock } from '../../storybookComponents'
import { Layout } from '../../components'
import Portal from './portal.component'

storiesOf('Portal', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'portal--custom'),
    fixed: boolean('fixed', true),
    targetElementId: radios('targetElementId', {
      root: 'root',
      storyTarget: 'storyTarget'
    }, 'root'),
    visible: boolean('visible', false),
    transitionSpeed: radios('transitionSpeed', {
      fast: 'fast',
      default: 'default',
      slow: 'slow'
    }, 'default'),
    masked: boolean('masked', true),
    onCloseRequest: action('Portal onCloseRequest has been triggered.')
  }

  return (
    <Layout theme='dark' height='fill'>
      <FillerBlock id='storyTarget' />
      <Portal {...propConfig}>
        <FillerBlock theme='slate' placeholder='Portal Content' />
      </Portal>
    </Layout>
  )
})

export default {
  title: 'Portal',
  component: Portal
}
