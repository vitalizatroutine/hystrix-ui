import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, boolean, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { FillerBlock } from '../../storybookComponents'
import { Layout } from '../../components'
import Popover from './popover.component'

storiesOf('Popover', module).add('Default', () => {
  const fillerRef = useRef(null)
  const propConfig = {
    className: text('className', 'popover--custom'),
    fixed: boolean('fixed', true),
    targetElementId: radios('targetElementId', {
      root: 'root',
      storyTarget: 'storyTarget'
    }, 'root'),
    visible: boolean('visible', false),
    targetReference: fillerRef,
    targetOrigin: radios('targetOrigin', {
      topLeft: 'top-left',
      top: 'top',
      topCenter: 'top-center',
      topRight: 'top-right',
      left: 'left',
      centerLeft: 'center-left',
      center: 'center',
      right: 'right',
      centerRight: 'center-right',
      bottomLeft: 'bottom-left',
      bottom: 'bottom',
      bottomCenter: 'bottom-center',
      bottomRight: 'bottom-right'
    }, 'top-right'),
    popoverOrigin: radios('popoverOrigin', {
      topLeft: 'top-left',
      top: 'top',
      topCenter: 'top-center',
      topRight: 'top-right',
      left: 'left',
      centerLeft: 'center-left',
      center: 'center',
      right: 'right',
      centerRight: 'center-right',
      bottomLeft: 'bottom-left',
      bottom: 'bottom',
      bottomCenter: 'bottom-center',
      bottomRight: 'bottom-right'
    }, 'top-left'),
    offsetMargin: number('offsetMargin', 16),
    transitionSpeed: radios('transitionSpeed', {
      fast: 'fast',
      default: 'default',
      slow: 'slow'
    }, 'default'),
    masked: boolean('masked', true),
    onCloseRequest: action('Popover onCloseRequest has been triggered.')
  }

  return (
    <Layout flex alignItems='center' justifyContent='center' height='fill'>
      <FillerBlock ref={fillerRef} id='storyTarget' />
      <Popover {...propConfig}>
        <FillerBlock theme='slate' placeholder='Popover Content' styles={{ width: 200, height: 200 }} />
      </Popover>
    </Layout>
  )
})

export default {
  title: 'Popover',
  component: Popover
}
