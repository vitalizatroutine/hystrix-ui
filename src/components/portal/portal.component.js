import React, { memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import ReactDOM from 'react-dom'
import { string, object, bool, func, array, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../utils/'
import './portal.component.css'

/**
 * Portal Component
 * @param props
 * @returns {*}
 */
function Portal (props) {
  const { className, id, targetElementId, visible, masked, transitionSpeed, children, onCloseRequest } = props
  const portalTarget = document.getElementById(targetElementId)

  if (!portalTarget) {
    return null
  }

  const baseClassName = getClassName('portal', [
    { condition: className, trueClassName: className },
    { condition: transitionSpeed, trueClassName: `portal--${transitionSpeed}-speed` }
  ])

  const timeout = {
    slow: 600,
    default: 300,
    fast: 150
  }[transitionSpeed] || 150

  return ReactDOM.createPortal((
    <CSSTransition in={visible} classNames='portal-' timeout={timeout} unmountOnExit>
      <div className={baseClassName} id={id}>
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
   * Used to determine the id of the element that the portal will append itself to
   * Note: there is no need to provide the # prefix
   */
  targetElementId: string,

  /**
   * Used to determine whether or not the component should appear visible
   */
  visible: bool.isRequired,

  /**
   * Used to determine whether or not to render a mask inside the portal
   */
  masked: bool,

  /**
   * Used to determine the speed of the Portal during transition phases
   */
  transitionSpeed: oneOf(['fast', 'default', 'slow']),

  /**
   * A callback for when the portal requests to be closed from the inside
   */
  onCloseRequest: func
}

Portal.defaultProps = {
  targetElementId: 'root',
  visible: false,
  transitionSpeed: 'default',
  masked: true
}

export default memo(Portal)
