import React from 'react'
import addons, { makeDecorator } from '@storybook/addons'

export default makeDecorator({
  name: 'withCustomizer',
  parameterName: 'customizerParams',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel()

    channel.emit('my/customEvent', parameters)
    channel.on('customizer/reach', () => {
      console.log('I heard that!')
      return true
    })

    return getStory(context)
  }
})