import React, { memo } from 'react'
import { string, object, bool, func, shape, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../utils'
import './button.component.css'

/**
 * Button Component
 */
function Button (props) {
  const {
    className, linkTo, linkTarget, styles, label, icon,
    theme, size, wide, circle, square,
    loading, invisible, hidden, disabled,
    onClick
  } = props

  const handleClick = (event) => {
    event.target && event.target.blur()
    onClick && onClick(event)
  }

  const baseClassName = getClassName('button', [
    { condition: className, trueClassName: className },
    { condition: theme, trueClassName: `button--${theme}` },
    { condition: size, trueClassName: `button--${size}` },
    { condition: linkTo, trueClassName: 'button--link' },
    { condition: wide, trueClassName: 'button--wide' },
    { condition: circle, trueClassName: 'button--circle' },
    { condition: square || (!label && icon), trueClassName: 'button--square' },
    { condition: loading, trueClassName: 'button--loading' },
    { condition: invisible, trueClassName: 'button--invisible' },
    { condition: hidden, trueClassName: 'button--hidden' },
    { condition: disabled, trueClassName: 'button--disabled' }
  ])

  return linkTo ? (
    <a className={baseClassName} href={linkTo} target={linkTarget} style={styles && styles.base} onClick={handleClick} ref={reference}>
      {icon && <i className={`button_icon ${icon}`} style={styles && styles.icon}/>}
      {label && <span className='button_label' style={styles && styles.label}>{label}</span>}
    </a>
  ) : (
    <button className={baseClassName} style={styles && styles.base} onClick={handleClick}>
      {icon && <i className={`button_icon ${icon}`} style={styles && styles.icon}/>}
      {label && <span className='button_label' style={styles && styles.label}>{label}</span>}
    </button>
  )
}

Button.propTypes = {
  /**
   * A custom className to add to the component
   */
  className: string,

  /**
   * a custom id to add to the component
   */
  id: string,

  /**
   * Used to transform the button into a Link component
   * Note: prop provides link url
   */
  linkTo: string,

  /**
   * Custom styles passed into the component
   */
  styles: shape({
    base: object,
    icon: object,
    label: object
  }),

  /**
   * Used to provide the button with a label
   */
  label: oneOfType([string, object]),

  /**
   * Used to provide the button with an icon
   */
  icon: oneOfType([string, object]),

  /**
   * Used to paint the Button using a specific theme
   */
  theme: string,

  /**
   * Used to modify the Button component with various modifiers
   */
  size: oneOf(['small', 'default', 'large']),
  square: bool,
  circle: bool,
  wide: bool,

  /**
   * Used to paint the Button component with a pulsing loader
   */
  loading: bool,

  /**
   * Used to hide the Button component with opacity
   */
  invisible: bool,

  /**
   * Used to hide the Button component with display: none
   */
  hidden: bool,

  /**
   * Used to disable interaction with the Button component
   */
  disabled: bool,

  /**
   * A callback for when the user clicks the Button component
   */
  onClick: func
}

Button.defaultProps = {
  linkTo: null
}

export default memo(Button)
