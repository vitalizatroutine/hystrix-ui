import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { gridUnit, getClassName } from '../../utils/ui/index'
import './layout.component.css'

function Layout ({children, className, theme, height, paddingMultiplier, justifyContent, alignItems, direction}) {
  const baseClassName = getClassName('layout', [
    {condition: className, trueClassName: className},
    {condition: theme, trueClassName: `layout--${theme}`},
    {condition: height, trueClassName: `layout--${height}`},
    {condition: justifyContent, trueClassName: `layout--justify-${justifyContent}`},
    {condition: alignItems, trueClassName: `layout--align-${alignItems}`},
    {condition: direction, trueClassName: `layout--${direction}-direction`},
  ])

  const baseStyle = {
    padding: gridUnit * paddingMultiplier
  }

  return (
    <section className={baseClassName} style={baseStyle}>
      {children}
    </section>
  )
}

Layout.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * The theme for the component
   */
  theme: PropTypes.oneOf(['white', 'light', 'dark', 'black']),

  /**
   * The height of the component
   */
  height: PropTypes.oneOf(['auto', 'comfy', 'fill']),

  /**
   * Amount of padding surrounding the component
   */
  paddingMultiplier: PropTypes.number,

  /**
   * Horizontal alignment for children within the component
   */
  justifyContent: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),

  /**
   * Vertical alignment for children within the component
   */
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretched']),

  /**
   * Vertical alignment for children within the component
   */
  direction: PropTypes.oneOf(['row', 'column'])
}

Layout.defaultProps = {
  theme: 'white',
  height: 'auto',
  paddingMultiplier: 5,
  justifyContent: 'center',
  alignItems: 'center'
}

export default memo(Layout)