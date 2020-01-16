import React, { memo } from 'react'
import { string, object, bool, func, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../../utils/ui'
import './checkbox.component.css'

function Checkbox (props) {
  const {
    className, theme, size,
    id, name, label, labelAlign, customCheckboxColor, boxOnly, inline, alignWithFields, checked, disabled,
    stopPropagation, onChange
  } = props

  const baseClassName = getClassName(className ? `${className} checkbox` : 'checkbox', [
    { condition: theme, trueClassName: `checkbox--${theme}` },
    { condition: customCheckboxColor, trueClassName: 'checkbox--custom-color' },
    { condition: size, trueClassName: `checkbox--${size}` },
    { condition: checked, trueClassName: 'checkbox--checked' },
    { condition: boxOnly, trueClassName: 'checkbox--box-only' },
    { condition: inline, trueClassName: 'checkbox--inline' },
    { condition: alignWithFields, trueClassName: 'checkbox--aligned' },
    { condition: disabled, trueClassName: 'checkbox--disabled' }
  ])

  const handleStoppedClick = (event) => event.stopPropagation()
  const handleChange = (event) => {
    onChange && onChange(event.target.checked, event)
  }

  const renderCheckboxLabel = () => {
    let labelStyle = {}

    if (checked && customCheckboxColor) {
      labelStyle = {
        color: customCheckboxColor
      }
    }

    return (
      <label
        className={`checkbox_label checkbox_label--${labelAlign}`}
        style={labelStyle}
        htmlFor={id}
        onClick={stopPropagation && handleStoppedClick}
      >{!boxOnly && label}
      </label>
    )
  }

  const renderCheckboxInput = () => {
    return (
      <input
        className='checkbox_input'
        type='checkbox'
        id={id}
        name={name}
        checked={!!checked}
        onChange={handleChange}
        disabled={disabled}
      />
    )
  }

  return (
    <div className={baseClassName} onClick={stopPropagation && handleStoppedClick}>
      {labelAlign === 'left' && (boxOnly || label) && renderCheckboxLabel()}
      {renderCheckboxInput()}
      {labelAlign === 'right' && (boxOnly || label) && renderCheckboxLabel()}
    </div>
  )
}

Checkbox.propTypes = {
  /**
   * A custom className to pass into the checkbox component
   */
  className: string,

  /**
   * A unique ID for the checkbox and checkbox label
   */
  id: string.isRequired,

  /**
   * The name attribute used in the checkbox input
   */
  name: string,

  /**
   * Used to determine checked state for the checkbox input
   */
  checked: bool.isRequired,

  /**
   * Used to paint the component using a specific theme
   */
  theme: string,

  /**
   * Used to overwrite checkbox colour while in checked state
   */
  customCheckboxColor: string,

  /**
   * Used to determine the size of the checkbox
   */
  size: oneOf(['small', 'default', 'large']),

  /**
   * The default label prop to determine label text or render
   * Note: pass a simple ' ' string for no label rendering
   */
  label: oneOfType([string, object]),

  /**
   * Used to paint a label to the right of the checkbox
   * Note: this is a duplicate prop for the sake of better component usability
   */
  labelAlign: oneOf(['left', 'right']),

  /**
   * Used to determine whether or not to render label text as to only render a standalone checkbox
   * Note: If label is not provided, this prop is required. The component will not render otherwise.
   */
  boxOnly: (props, propName, componentName) => {
    if (!props.label && !props.boxOnly) {
      return new Error(`Prop 'boxOnly' must be true when prop 'label' is not specified in '${componentName}'.`)
    }
  },

  /**
   * Used to determine whether or not to align the checkbox inline
   */
  inline: bool,

  /**
   * Used to determine whether or not to paint an additional space above the checkbox as to align it with text fields
   */
  alignWithFields: bool,

  /**
   * Used to disable interaction with the checkbox component
   */
  disabled: bool,

  /**
   * Used to determine whether or not to run stopPropagation() on checkbox click events
   */
  stopPropagation: bool,

  /**
   * A callback function for when the user checks or unchecks the checkbox
   */
  onChange: func.isRequired
}

Checkbox.defaultProps = {
  boxOnly: false,
  checked: false,
  size: 'default',
  labelAlign: 'right',
  alignWithFields: true
}

export default memo(Checkbox)
