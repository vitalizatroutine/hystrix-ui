import React, { memo } from 'react'
import { string, object, bool, array, oneOfType } from 'prop-types'
import { getClassName } from '../../utils/'
import './grid.component.css'

function Grid (props) {
  const { className, id, children, gutter } = props

  const baseClassName = getClassName('grid', [
    { condition: className, trueClassName: className },
    { condition: gutter, falseClassName: 'grid--no-gutter' }
  ])

  return (
    <div className={baseClassName} id={id}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  /**
   * A custom className for the component
   */
  className: string,

  /**
   * A custom id for the component
   */
  id: string,

  /**
   * The children to render inside the component
   */
  children: oneOfType([object, array]),

  /**
   * Used to deteremine whether or not the grid will render a gutter between each column
   */
  gutter: bool
}

Grid.defaultProps = {
  gutter: true
}

export default memo(Grid)