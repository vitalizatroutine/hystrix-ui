import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { gridUnit, getClassName } from '../../utils/ui/index'
import './frame.component.css'

function Frame ({children, paddingMultiplier, horizontalAlign, verticalAlign}) {
  const baseClassName = getClassName('frame', [
    {condition: horizontalAlign, trueClassName: `frame--horizontally-${horizontalAlign}`},
    {condition: verticalAlign, trueClassName: `frame--vertically-${verticalAlign}`}
  ])

  const baseStyle = {
    padding: gridUnit * paddingMultiplier
  }

  return (
    <section className={baseClassName} style={baseStyle}>
      <div className='frame_inner'>
        {children}
      </div>
    </section>
  )
}

Frame.propTypes = {
  /**
   * Amount of padding surrounding the Frame component
   */
  paddingMultiplier: PropTypes.number,

  /**
   * Horizontal alignment for children within the Frame component
   */
  horizontalAlign: PropTypes.oneOf(['left', 'right', 'center']),

  /**
   * Vertical alignment for children within the Frame component
   */
  verticalAlign: PropTypes.oneOf(['left', 'right', 'center'])
}

Frame.defaultProps = {
  paddingMultiplier: 5,
  horizontalAlign: 'center',
  verticalAlign: 'center'
}

export default memo(Frame)