import { configure } from '@storybook/react'
import { configureActions } from '@storybook/addon-actions'

const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

configureActions({
  depth: 100,
  limit: 20,
})

configure(loadStories, module)