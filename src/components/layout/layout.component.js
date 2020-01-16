import React, { memo } from 'react'
import { string, bool, oneOf } from 'prop-types'
import { getClassName } from '../../utils/ui/index'
import './layout.component.css'

function Layout ({ children, className, id, theme, height, paddingMultiplier, flex, justifyContent, alignItems, direction }) {
  const baseClassName = getClassName('layout', [
    { condition: className, trueClassName: className },
    { condition: theme, trueClassName: `layout--${theme}` },
    { condition: height, trueClassName: `layout--${height}` },
    { condition: paddingMultiplier, trueClassName: `layout--padding-times-${paddingMultiplier}` },
    { condition: flex, trueClassName: 'layout--flex' },
    { condition: flex && justifyContent, trueClassName: `layout--justify-${justifyContent}` },
    { condition: flex && alignItems, trueClassName: `layout--align-${alignItems}` },
    { condition: flex && direction, trueClassName: `layout--${direction}-direction` },
  ])

  return (
    <div className={baseClassName} id={id}>
      {children}
    </div>
  )
}

Layout.propTypes = {
  /**
   * A custom className for the component
   */
  className: string,

  /**
   * A custom id for the component
   */
  id: string,

  /**
   * The theme for the component
   */
  theme: oneOf(['white', 'light', 'dark', 'black']),

  /**
   * The height of the component
   */
  height: oneOf(['auto', 'comfy', 'fill']),

  /**
   * Amount of padding surrounding the component in grid units (8px)
   */
  paddingMultiplier: oneOf(['one', 'two', 'three', 'four', 'five']),

  /**
   * Whether or not to use flex styles
   */
  flex: bool,

  /**
   * Horizontal alignment for children within the component
   */
  justifyContent: oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),

  /**
   * Vertical alignment for children within the component
   */
  alignItems: oneOf(['flex-start', 'center', 'flex-end', 'stretched']),

  /**
   * Vertical alignment for children within the component
   */
  direction: oneOf(['row', 'column'])
}

Layout.defaultProps = {
  theme: 'white',
  height: 'auto',
  paddingMultiplier: 'five',
  flex: true,
  justifyContent: 'center',
  alignItems: 'center'
}

export default memo(Layout)