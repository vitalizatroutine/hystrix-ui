import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { gridUnit, getClassName } from '../../utils/ui/index'
import './layout.component.css'

function Layout ({children, className, theme, height, paddingMultiplier, horizontalAlign, verticalAlign}) {
  const baseClassName = getClassName('layout', [
    {condition: className, trueClassName: className},
    {condition: theme, trueClassName: `layout--${theme}`},
    {condition: height, trueClassName: `layout--${height}`},
    {condition: horizontalAlign, trueClassName: `layout--horizontally-${horizontalAlign}`},
    {condition: verticalAlign, trueClassName: `layout--vertically-${verticalAlign}`}
  ])

  const baseStyle = {
    padding: gridUnit * paddingMultiplier
  }

  return (
    <section className={baseClassName} style={baseStyle}>
      <div className='layout_inner'>
        {children}
      </div>
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
  horizontalAlign: PropTypes.oneOf(['left', 'right', 'center']),

  /**
   * Vertical alignment for children within the component
   */
  verticalAlign: PropTypes.oneOf(['left', 'right', 'center'])
}

Layout.defaultProps = {
  theme: 'white',
  height: 'auto',
  paddingMultiplier: 5,
  horizontalAlign: 'center',
  verticalAlign: 'center'
}

export default memo(Layout)