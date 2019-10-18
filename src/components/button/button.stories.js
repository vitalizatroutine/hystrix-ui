import React from 'react'
import { action } from '@storybook/addon-actions'
import { Button } from './button.component'

export default {
  title: 'Button',
}

export const withText = () => {
  return (
    <Button
      label='Goodbye World'
      onClick={action('clicked')}
    />
  )
}

export const withEmoji = () => {
  return (
    <Button
      label='💯'
      onClick={action('clicked')}
    />
  )
}