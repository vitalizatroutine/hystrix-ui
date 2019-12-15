import React, { useState, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, boolean, radios, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { FillerBlock } from '../../storybookComponents'
import { Layout } from '../../components'
import Popover from './popover.component'

const fillerBlockStyle = {
  width: 300,
  height: 100,
  lineHeight: '52px'
}

storiesOf('Popover', module).add('Using Ref', () => {
  const [clickCount, setClickCount] = useState(0)

  const fillerRef = useRef(null)
  const propConfig = {
    className: text('className', 'popover--custom'),
    fixed: boolean('fixed', true),
    portalTargetElementId: radios('portalTargetElementId', {
      root: 'root',
      storyTarget: 'storyTarget'
    }, 'root'),
    visible: boolean('visible', false),
    targetReference: fillerRef,
    // targetElementId: 'storyTargetOne',
    targetOrigin: select('targetOrigin', {
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
    popoverOrigin: select('popoverOrigin', {
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
    matchWidth: boolean('matchWidth', false),
    matchHeight: boolean('matchHeight', false),
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
      <FillerBlock ref={fillerRef} style={fillerBlockStyle} onClick={() => setClickCount(clickCount + 1)} />
      <Popover {...propConfig}>
        <FillerBlock theme='slate' placeholder='Popover Content' />
      </Popover>
    </Layout>
  )
}).add('Using ID', () => {
  const [clickCount, setClickCount] = useState(0)

  const propConfig = {
    className: text('className', 'popover--custom'),
    fixed: boolean('fixed', true),
    portalTargetElementId: radios('portalTargetElementId', {
      root: 'root',
      storyTarget: 'storyTarget'
    }, 'root'),
    visible: boolean('visible', false),
    targetElementId: 'storyTargetOne',
    targetOrigin: select('targetOrigin', {
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
    popoverOrigin: select('popoverOrigin', {
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
    matchWidth: boolean('matchWidth', false),
    matchHeight: boolean('matchHeight', false),
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
      <FillerBlock id='storyTargetOne' style={fillerBlockStyle} onClick={() => setClickCount(clickCount + 1)} />
      <Popover {...propConfig}>
        <FillerBlock theme='slate' placeholder='Popover Content' />
      </Popover>
    </Layout>
  )
})

export default {
  title: 'Popover',
  component: Popover
}
