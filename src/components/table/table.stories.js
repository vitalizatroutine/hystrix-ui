import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, radios } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import { Layout, Checkbox } from '../../components'
import Table from './table.component'

storiesOf('Table', module).add('Default', () => {
  const propConfig = {
    className: text('className', 'table--custom'),
    fixed: boolean('fixed', true),
    size: radios('size', {
      compact: 'compact',
      default: 'default',
      comfy: 'comfy'
    }, 'default'),
    onRowClick: action('Table onRowClick has been triggered'),
    rows: [{
      name: 'Vitali Zatroutine',
      job: 'Developer',
      age: 27,
      married: true,
      interests: ['art', 'design', 'code', 'games', 'streaming']
    }, {
      name: 'Nataly Zatroutine',
      job: 'CEO',
      age: 28,
      married: true,
      interests: ['makeup', 'drama', 'clothes', 'games', 'nails']
    }, {
      name: 'Nicolas Slewa',
      job: 'Shipper',
      age: 23,
      married: false,
      interests: ['manga', 'tv', 'games', 'bible study']
    }, {
      name: 'Stanislav Zatroutine',
      job: 'Plumber',
      age: 32,
      married: true,
      interests: ['games', 'dogs', 'drawing', 'fitness', 'brooding']
    }],
    columns: [{
      name: 'name',
      label: 'Name',
      defaultValue: '-'
    }, {
      name: 'job',
      label: 'Job',
      defaultValue: '-'
    }, {
      name: 'married',
      label: 'Is married?',
      defaultValue: '-',
      align: 'center',
      getCustomCell: (val, data) => (
        <Checkbox
          id={`is-married--${data.name}`}
          checked={val}
          inline
          // disabled
          boxOnly
          alignWithFields={false}
          stopPropagation
          onChange={action('Table\'s inner Checkbox onChange has been triggered')}
        />
      )
    }, {
      name: 'interests',
      label: 'Interested in',
      defaultValue: '-',
      getFormattedValue: (val) => val.join(', '),
      truncate: true
    }]
  }

  return (
    <Layout flex alignItems='center' justifyContent='center' height='fill'>
      <Table {...propConfig} />
    </Layout>
  )
})

export default {
  title: 'Table',
  component: Table
}
