import { configure, addDecorator } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'
import {withKnobs} from '@storybook/addon-knobs'

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

configureActions({
  depth: 100,
  limit: 20,
})

addDecorator(
  withKnobs({
    escapeHTML: false
  })
);

configure(loadStories, module)