import React from 'react'
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import Button from './button.component'

export default {
  title: 'Button',
}

storiesOf('Button')
  .add('with text', () => (
    <Button
      label='Goodnight World'
      onClick={action('clicked')}
    />
  ))
  .add('with emoji', () => (
    <Button
      label='💯'
      onClick={action('clicked')}
    />
  ));