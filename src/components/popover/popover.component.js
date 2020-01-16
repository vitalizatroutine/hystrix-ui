import React, { memo } from 'react'
import { string, number, object, bool, func, array, shape, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../utils/'
import { Portal } from '../../components'
import './popover.component.css'

/**
 * Popover Component
 * @param props
 * @returns {null|*}
 */
function Popover (props) {
  const {
    className, id, children, portalTargetElementId, visible, masked, transitionSpeed,
    targetElementId, targetReference, popoverOrigin, targetOrigin, offsetMargin, matchWidth, matchHeight,
    onCloseRequest
  } = props

  const baseStyles = getStyles()

  if (!baseStyles) {
    return null
  }

  const baseClassName = getClassName('popover', [
    { condition: className, trueClassName: className }
  ])

  /**
   * Get Target bounding rect props for poopover positioning
   */
  function getTargetBoundingRect () {
    if (!targetReference && !targetElementId) {
      return null
    }

    if (targetReference && targetReference.current) {
      const TargetComponentRect = targetReference.current.getBoundingClientRect()
      const { top: refTop, left: refLeft, width: refWidth, height: refHeight } = TargetComponentRect

      return {
        top: refTop,
        left: refLeft,
        width: refWidth,
        height: refHeight
      }
    }

    if (targetElementId) {
      const target = document.getElementById(targetElementId)

      if (!target || !target.getBoundingClientRect) {
        console.warn(`Popover component is unable to find target element or access a boundingClientRect with the currently proposed targetElementId prop, ${targetElementId}.`)
        return null
      }

      const { top: elTop, left: elLef, width: elWdidth, height: elHeight } = target.getBoundingClientRect()

      return {
        top: elTop,
        left: elLef,
        width: elWdidth,
        height: elHeight
      }
    }
  }

  /**
   * Get Popover styles
   * @returns {Object}
   */
  function getStyles () {
    const targetBoundingRect = getTargetBoundingRect()

    if (!targetBoundingRect) {
      return null
    }

    const anchorPositionProperties = getAnchorPositionProperties(targetBoundingRect)
    const popoverPositionProperties = getPopoverPositionProperties()

    return {
      anchor: {
        ...anchorPositionProperties,
        transformOrigin: popoverOrigin ? popoverOrigin.replace('-', ' ') : null
      },
      inner: {
        [popoverPositionProperties.horizontal]: 0,
        [popoverPositionProperties.vertical]: 0,
        width: matchWidth ? targetBoundingRect.width : null,
        height: matchHeight ? targetBoundingRect.height : null,
        margin: offsetMargin,
        transform: popoverPositionProperties.transform
      }
    }
  }

  /**
   * Get Target's coordinates based on origin prop
   * @returns {{left: number, top: number}}
   */
  function getAnchorPositionProperties ({ left, top, width, height }) {
    const coordinates = {}

    switch (targetOrigin) {
      default:
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

  return (
    <Portal
      targetElementId={portalTargetElementId}
      visible={visible}
      transitionSpeed={transitionSpeed}
      masked={masked}
      onCloseRequest={onCloseRequest}
    >
      <div className={baseClassName} id={id} style={baseStyles.anchor}>
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
   * The element id selector provided to the root Portal component
   * Note: there is no need to provide the # prefix
   */
  portalTargetElementId: string,

  /**
   * The element id selector for the component to consume as anchor reference
   */
  targetElementId: string,

  /**
   * A JSX ref for the component to consume as anchor reference
   */
  targetReference: object,

  /**
   * Used to determine the target reference's point of origin from which the popover will anchor to
   */
  targetOrigin: oneOf([
    'top-left', 'top', 'top-center', 'top-right', 'left', 'center-left', 'center',
    'right', 'center-right', 'bottom-left', 'bottom', 'bottom-center', 'bottom-right'
  ]),

  /**
   * Used to determine the popover's point of origin to render from
   */
  popoverOrigin: oneOf([
    'top-left', 'top', 'top-center', 'top-right', 'left', 'center-left', 'center',
    'right', 'center-right', 'bottom-left', 'bottom', 'bottom-center', 'bottom-right'
  ]),

  /**
   * Used to provide the popover anchor with a margin from the target's origin
   */
  offsetMargin: oneOfType([string, number, shape({
    top: number,
    right: number,
    bottom: number,
    left: number
  })]),

  /**
   * Used to determine whether or not to render the portal component with a matching width of its target element
   */
  matchWidth: bool,

  /**
   * Used to determine whether or not to render the portal component with a matching height of its target element
   */
  matchHeight: bool,

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

Popover.defaultProps = {
  targetOrigin: 'top-right',
  popoverOrigin: 'top-left',
  transitionSpeed: 'default'
}

export default memo(Popover)
