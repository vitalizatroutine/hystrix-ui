import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/'
import { Portal } from '../../components'
import './popover.component.css'

function Popover (props) {
  const {
    className, children, targetElementId, visible, masked, transitionSpeed,
    targetReference, popoverOrigin, targetOrigin, offsetMargin, onCloseRequest
  } = props

  const baseStyles = getStyles()
  const baseClassName = getClassName('popover', [
    { condition: className, trueClassName: className }
  ])

  /**
   * Get Popover styles
   * @returns {Object}
   */
  function getStyles () {
    const popoverPositionProperties = getPopoverPositionProperties()

    return {
      anchor: {
        ...getAnchorPositionProperties(),
        transformOrigin: popoverOrigin ? popoverOrigin.replace('-', ' ') : null
      },
      inner: {
        [popoverPositionProperties.horizontal]: 0,
        [popoverPositionProperties.vertical]: 0,
        margin: offsetMargin,
        transform: popoverPositionProperties.transform
      }
    }
  }

  /**
   * Get Target's coordinates based on origin prop
   * @returns {{left: number, top: number}}
   */
  function getAnchorPositionProperties () {
    const TargetComponentRect = targetReference && targetReference.current && targetReference.current.getBoundingClientRect()
    const { top, left, width, height } = TargetComponentRect || {}

    const coordinates = {
      left,
      top: top + height
    }

    switch (targetOrigin) {
      case 'top-left':
        coordinates.left = left
        coordinates.top = top
        break
      case 'top':
      case 'top-center':
        coordinates.left = left + (width / 2)
        coordinates.top = top
        break
      case 'top-right':
        coordinates.left = left + width
        coordinates.top = top
        break
      case 'left':
      case 'center-left':
        coordinates.left = left
        coordinates.top = top + (height / 2)
        break
      case 'center':
        coordinates.left = left + (width / 2)
        coordinates.top = top + (height / 2)
        break
      case 'right':
      case 'center-right':
        coordinates.left = left + width
        coordinates.top = top + (height / 2)
        break
      case 'bottom-left':
        coordinates.left = left
        coordinates.top = top + height
        break
      case 'bottom':
      case 'bottom-center':
        coordinates.left = left + (width / 2)
        coordinates.top = top + height
        break
      case 'bottom-right':
        coordinates.left = left + width
        coordinates.top = top + height
        break
      default:
    }

    return {
      left: coordinates.left || 0,
      top: coordinates.top || 0
    }
  }

  /**
   * Get Popover Position CSS Properties based on origin prop
   * @returns {{horizontal: string, vertical: string}}
   */
  function getPopoverPositionProperties () {
    const properties = {
      horizontal: 'left',
      vertical: 'top'
    }

    switch (popoverOrigin) {
      case 'top-left':
        properties.horizontal = 'left'
        properties.vertical = 'top'
        break
      case 'top':
      case 'top-center':
        properties.horizontal = 'left'
        properties.vertical = 'top'
        properties.transform = 'translateX(-50%)'
        break
      case 'top-right':
        properties.horizontal = 'right'
        properties.vertical = 'top'
        break
      case 'left':
      case 'center-left':
        properties.horizontal = 'left'
        properties.vertical = 'top'
        properties.transform = 'translateY(-50%)'
        break
      case 'center':
        properties.horizontal = 'left'
        properties.vertical = 'top'
        properties.transform = 'translate(-50%, -50%)'
        break
      case 'right':
      case 'center-right':
        properties.horizontal = 'right'
        properties.vertical = 'top'
        properties.transform = 'translateY(-50%)'
        break
      case 'bottom-left':
        properties.horizontal = 'left'
        properties.vertical = 'bottom'
        break
      case 'bottom':
      case 'bottom-center':
        properties.horizontal = 'left'
        properties.vertical = 'bottom'
        properties.transform = 'translateX(-50%)'
        break
      case 'bottom-right':
        properties.horizontal = 'right'
        properties.vertical = 'bottom'
        break
      default:
    }

    return properties
  }

  console.log('targetReference', targetReference)

  return (
    <Portal
      targetElementId={targetElementId}
      visible={visible}
      transitionSpeed={transitionSpeed}
      masked={masked}
      onCloseRequest={onCloseRequest}
    >
      <div className={baseClassName} style={baseStyles.anchor}>
        <div className='popover_inner' style={baseStyles.inner}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

Popover.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * The children to render inside the component
   */
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * A JSX ref for the component to consume as anchor reference
   */
  targetReference: PropTypes.object.isRequired,

  /**
   * Used to determine the target reference's point of origin from which the popover will anchor to
   */
  targetOrigin: PropTypes.oneOf([
    'top-left', 'top', 'top-center', 'top-right', 'left', 'center-left', 'center',
    'right', 'center-right', 'bottom-left', 'bottom', 'bottom-center', 'bottom-right'
  ]),

  /**
   * Used to determine the popover's point of origin to render from
   */
  popoverOrigin: PropTypes.oneOf([
    'top-left', 'top', 'top-center', 'top-right', 'left', 'center-left', 'center',
    'right', 'center-right', 'bottom-left', 'bottom', 'bottom-center', 'bottom-right'
  ]),

  /**
   * Used to provide the popover anchor with a margin from the target's origin
   */
  offsetMargin: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  })]),

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
  transitionSpeed: PropTypes.oneOf(['fast', 'default', 'slow']),

  /**
   * A callback for when the portal requests to be closed from the inside
   */
  onCloseRequest: PropTypes.func
}

Popover.defaultProps = {
  targetOrigin: 'top-right',
  popoverOrigin: 'top-left',
  transitionSpeed: 'default'
}

export default memo(Popover)
