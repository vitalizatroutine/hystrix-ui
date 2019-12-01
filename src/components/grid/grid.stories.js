import React from 'react'
import { storiesOf } from '@storybook/react'

import { Customizer, FillerBlock } from '../../storybookComponents'
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

storiesOf('Grid', module).add('Default', () => (
  <Customizer
    config={propConfig}
    component={(
      <Grid>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
      </Grid>
    )}
  />
))

export default {
  title: 'Grid',
  component: Grid
}
