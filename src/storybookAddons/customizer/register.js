import React from 'react'
import { STORY_RENDERED } from '@storybook/core-events'
import { addons } from '@storybook/addons'
import { useChannel, useAddonState } from '@storybook/api'
import { AddonPanel } from '@storybook/components'
// import { Customizer } from '../../storybookComponents'
import { Button } from '../../components'

const ADDON_ID = 'customizer'

const CustomizerPanel = () => {
  const [propConfig, setPropConfig] = useAddonState(ADDON_ID, {});
  const emit = useChannel({
    STORY_RENDERED: handleStoryRendered,
    'my/customEvent': () => { /* so something */ },
  })

  /**
   * Handle STORY_RENDERED event
   * @param id
   * @param b
   */
  function handleStoryRendered (id, b) {
    console.log('story_rendered id', id)
    console.log('story_rendered b', b)
  }

  return (
    <Button
      label='Customizer oh boy'
      onClick={() => emit('customizer/reach')}
    />
  )
}

addons.register(ADDON_ID, api => {
  // Also need to set a unique name to the panel.
  addons.addPanel(`${ADDON_ID}/panel`, {
    title: 'Customizer',
    paramKey: 'customizerParams',
    render: ({ active, key }) => (
      <AddonPanel key={key} active={active}>
        <CustomizerPanel />
      </AddonPanel>
    )
  })
})