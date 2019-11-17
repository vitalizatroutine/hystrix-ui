import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/'
import './template.component.css'

function Template (props) {
  const { className, children } = props

  const baseClassName = getClassName('template', [
    { condition: className, trueClassName: className }
  ])

  return (
    <div className={baseClassName}>
      {children}
    </div>
  )
}

Template.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * The children to render inside the component
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

Template.defaultProps = {}

export default memo(Template)
