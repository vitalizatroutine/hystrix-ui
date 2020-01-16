import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { FillerBlock } from '../../storybookComponents'
import { Grid, GridColumn, Layout } from '../../components'

storiesOf('Grid', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'grid--custom'),
    id: text('className', 'customGrid'),
    gutter: boolean('gutter', true)
  }

  return (
    <Layout theme='dark' height='fill'>
      <Grid {...propConfig} >
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
        <GridColumn width='1-of-4' smallWidth='1-of-3'><FillerBlock /></GridColumn>
      </Grid>
    </Layout>
  )
})

export default {
  title: 'Grid',
  component: Grid
}
