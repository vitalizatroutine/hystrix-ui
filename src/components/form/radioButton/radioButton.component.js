import React, { memo } from 'react'
import { string, object, bool, func, shape, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../../utils/ui'
import './radioButton.component.css'

function RadioButton (props) {
  const {
    className, theme, size,
    id, name, value, label, labelAlign, customRadioButtonColor, radioOnly, inline, alignWithFields,
    checked, disabled, stopPropagation, onChange
  } = props

  const baseClassName = getClassName(className ? `${className} radio-button` : 'radio-button', [
    { condition: theme, trueClassName: `radio-button--${theme}` },
    { condition: customRadioButtonColor, trueClassName: 'radio-button--custom-color' },
    { condition: size, trueClassName: `radio-button--${size}` },
    { condition: checked, trueClassName: 'radio-button--checked' },
    { condition: radioOnly, trueClassName: 'radio-button--radio-only' },
    { condition: inline, trueClassName: 'radio-button--inline' },
    { condition: alignWithFields, trueClassName: 'radio-button--aligned' },
    { condition: disabled, trueClassName: 'radio-button--disabled' }
  ])

  const handleStoppedClick = (event) => event.stopPropagation()
  const handleChange = (event) => {
    onChange && onChange(event.target.value, event)
  }

  const renderRadioButtonLabel = () => {
    let labelStyle = {}

    if (checked && customRadioButtonColor) {
      labelStyle = {
        color: customRadioButtonColor
      }
    }

    return (
      <label
        className={`radio-button_label radio-button_label--${labelAlign}`}
        style={labelStyle}
        htmlFor={id}
        onClick={stopPropagation && handleStoppedClick}
      >{!radioOnly && label}
      </label>
    )
  }

  const renderRadioButtonInput = () => {
    return (
      <input
        className='radio-button_input'
        type='radio'
        id={id}
        name={name}
        checked={!!checked}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    )
  }

  return (
    <div className={baseClassName} onClick={stopPropagation && handleStoppedClick}>
      {labelAlign === 'left' && (radioOnly || label) && renderRadioButtonLabel()}
      {renderRadioButtonInput()}
      {labelAlign === 'right' && (radioOnly || label) && renderRadioButtonLabel()}
    </div>
  )
}

RadioButton.propTypes = {
  /**
   * A custom className to pass into the component
   */
  className: string,

  /**
   * A unique ID for the radio button and radio button label
   */
  id: string.isRequired,

  /**
   * The name attribute used in the radio button input
   */
  name: string,

  /**
   * Used to determine checked state for the radio button input
   */
  checked: bool.isRequired,

  /**
   * Used to paint the component using a specific theme
   */
  theme: string,

  /**
   * Used to overwrite checkbox colour while in checked state
   */
  customRadioButtonColor: string,

  /**
   * Used to determine the size of the radio button
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
   * Used to determine whether or not to render label text as to only render a standalone radio button
   * Note: If label is not provided, this prop is required. The component will not render otherwise.
   */
  radioOnly: (props, propName, componentName) => {
    if (!props.label && !props.radioOnly) {
      return new Error(`Prop 'radioOnly' must be true when prop 'label' is not specified in '${componentName}'.`)
    }
  },

  /**
   * Used to determine whether or not to align the radio button inline
   */
  inline: bool,

  /**
   * Used to determine whether or not to paint an additional space above the radio button as to align it with text fields
   */
  alignWithFields: bool,

  /**
   * Used to disable interaction with the radio button component
   */
  disabled: bool,

  /**
   * Used to determine whether or not to run stopPropagation() on checkbox click events
   */
  stopPropagation: bool,

  /**
   * A callback function for when the user toggles the radio button
   */
  onChange: func.isRequired
}

RadioButton.defaultProps = {
  radioOnly: false,
  checked: false,
  labelAlign: 'right',
  alignWithFields: true
}

export default memo(RadioButton)