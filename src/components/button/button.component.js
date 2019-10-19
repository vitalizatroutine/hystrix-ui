import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils'
import './button.component.css'

/**
 * Button Component
 */
function Button (props) {
  const {
    className, reference, linkTo, linkTarget, styles, label, icon,
    theme, size, wide, circle, square,
    loading, invisible, hidden, disabled,
    onClick
  } = props

  const handleClick = (event) => {
    event.target && event.target.blur()
    onClick && onClick(event)
  }

  const baseClassName = getClassName('button', [
    {condition: className, trueClassName: className},
    {condition: theme, trueClassName: `button--${theme}`},
    {condition: size, trueClassName: `button--${size}`},
    {condition: wide, trueClassName: 'button--wide'},
    {condition: circle, trueClassName: 'button--circle'},
    {condition: square || (!label && icon), trueClassName: 'button--square'},
    {condition: loading, trueClassName: 'button--loading'},
    {condition: invisible, trueClassName: 'button--invisible'},
    {condition: hidden, trueClassName: 'button--hidden'},
    {condition: disabled, trueClassName: 'button--disabled'}
  ])

  return linkTo ? (
    <Link className={baseClassName} to={linkTo} target={linkTarget} style={styles && styles.base}
          onClick={handleClick} ref={reference}>
      {icon && <span className='button_icon' style={styles && styles.icon}>{icon}</span>}
      {label && <span className='button_label' style={styles && styles.label}>{label}</span>}
    </Link>
  ) : (
    <button className={baseClassName} style={styles && styles.base} onClick={handleClick} ref={reference}>
      {icon && <span className='button_icon' style={styles && styles.icon}>{icon}</span>}
      {label && <span className='button_label' style={styles && styles.label}>{label}</span>}
    </button>
  )
}

Button.propTypes = {
  /**
   * A custom className to add to the component
   */
  className: PropTypes.string,

  /**
   * Used to determine the ref attribute of the returned element
   */
  reference: PropTypes.object,

  /**
   * Used to transform the button into a Link component
   * Note: prop provides link url
   */
  linkTo: PropTypes.string,

  /**
   * Custom styles passed into the component
   */
  styles: PropTypes.shape({
    base: PropTypes.object,
    icon: PropTypes.object,
    label: PropTypes.object
  }),

  /**
   * Used to provide the button with a label
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Used to provide the button with an icon
   */
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Used to paint the Button using a specific theme
   */
  theme: PropTypes.string,

  /**
   * Used to modify the Button component with various modifiers
   */
  size: PropTypes.oneOf(['small', 'default', 'large']),
  square: PropTypes.bool,
  circle: PropTypes.bool,
  wide: PropTypes.bool,

  /**
   * Used to paint the Button component with a pulsing loader
   */
  loading: PropTypes.bool,

  /**
   * Used to hide the Button component with opacity
   */
  invisible: PropTypes.bool,

  /**
   * Used to hide the Button component with display: none
   */
  hidden: PropTypes.bool,

  /**
   * Used to disable interaction with the Button component
   */
  disabled: PropTypes.bool,

  /**
   * A callback for when the user clicks the Button component
   */
  onClick: PropTypes.func,
}

Button.defaultProps = {
  linkTo: null
}

export default memo(Button)