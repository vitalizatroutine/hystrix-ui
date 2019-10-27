import React from 'react'
import { storiesOf } from '@storybook/react'

import { Customizer } from '../../storybookComponents'
import Grid from './grid.component'
import GridColumn from './column/gridColumn.component'

const propConfig = [{
  field: 'className',
  type: 'text',
  initialValue: '',
  placeholder: 'grid--custom'
}, {
  field: 'gutter',
  type: 'boolean',
  initialValue: true
}]

function renderFillerBlock () {
  const styles = {
    height: '40px',
    lineHeight: '40px',
    background: 'rgba(0, 0, 0, 0.25)',
    textAlign: 'center'
  }

  return (
    <article style={styles}>FILLER BLOCK</article>
  )
}

storiesOf('Grid', module).add('Default', () => (
  <Customizer
    config={propConfig}
    component={(
      <Grid>
        <GridColumn width='1-of-4' smallWidth='1-of-3'>{renderFillerBlock()}</GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'>{renderFillerBlock()}</GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'>{renderFillerBlock()}</GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'>{renderFillerBlock()}</GridColumn>
      </Grid>
    )}
  />
))

export default {
  title: 'Grid',
  component: Grid
}
