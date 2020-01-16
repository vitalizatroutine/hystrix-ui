import React, { memo } from 'react'
import { string, object, array, oneOfType } from 'prop-types'
import { getClassName } from '../../utils/'
import './template.component.css'

function Template (props) {
  const { className, id, children } = props

  const baseClassName = getClassName('template', [
    { condition: className, trueClassName: className }
  ])

  return (
    <div className={baseClassName} id={id}>
      {children}
    </div>
  )
}

Template.propTypes = {
  /**
   * A custom className for the component
   */
  className: string,

  /**
   * A custom id className for the component
   */
  id: string,

  /**
   * The children to render inside the component
   */
  children: oneOfType([object, array])
}

Template.defaultProps = {}

export default memo(Template)
