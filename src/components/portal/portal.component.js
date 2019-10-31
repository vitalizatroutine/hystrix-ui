import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/'
import './portal.component.css'

function Portal (props) {
  const {className, targetElementId, visible, masked, transitionSpeed, children, onCloseRequest} = props

  const baseClassName = getClassName('portal', [
    {condition: className, trueClassName: className},
    {condition: transitionSpeed, trueClassName: `portal--${transitionSpeed}-speed`}
  ])

  const timeout = {
    'slow': 600,
    'default': 300,
    'fast': 150
  }[transitionSpeed] || 150

  return ReactDOM.createPortal((
    <CSSTransition in={visible} classNames='portal-' timeout={timeout} unmountOnExit>
      <div className={baseClassName}>
        {masked && (
          <div className='portal_mask' onClick={onCloseRequest} />
        )}
        <div className='portal_content'>{children}</div>
      </div>
    </CSSTransition>
  ), document.getElementById(targetElementId))
}

Portal.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * The children to render inside the component
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Used to determine whether or not the component should appear visible
   */
  visible: PropTypes.bool.isRequired,

  /**
   * Used to determine whether or not to render a mask inside the portal
   */
  masked: PropTypes.bool,

  /**
   * Used to determine the speed of the Portal during transition phases
   */
  transitionSpeed: PropTypes.oneOf('fast', 'default', 'slow'),

  /**
   * A callback for when the portal requests to be closed from the inside
   */
  onCloseRequest: PropTypes.func
}

Portal.defaultProps = {
  targetElementId: 'root',
  visible: false,
  transitionSpeed: 'default',
  masked: true
}

export default memo(Portal)