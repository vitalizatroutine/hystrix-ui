import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/'
import './grid.component.css'

function Grid (props) {
  const {className, children, gutter} = props

  const baseClassName = getClassName('grid', [
    {condition: className, trueClassName: className},
    {condition: gutter, falseClassName: 'grid--no-gutter'}
  ])

  return (
    <div className={baseClassName}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * The children to render inside the component
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Used to deteremine whether or not the grid will render a gutter between each column
   */
  gutter: PropTypes.bool,
}

Grid.defaultProps = {
  gutter: true
}

export default memo(Grid)