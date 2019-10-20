import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../../utils/ui'
import './checkbox.component.css'

function Checkbox (props) {
  const {
    className, theme, size,
    id, name, label, labelAlign, customCheckboxColor, boxOnly, checked, disabled,
    onChange
  } = props

  const baseClassName = getClassName(className ? `${className} checkbox` : 'checkbox', [
    {condition: theme, trueClassName: `checkbox--${theme}`},
    {condition: customCheckboxColor, trueClassName: 'checkbox--custom-color'},
    {condition: size, trueClassName: `checkbox--${size}`},
    {condition: checked, trueClassName: 'checkbox--checked'},
    {condition: boxOnly, trueClassName: 'checkbox--box-only'},
    {condition: disabled, trueClassName: 'checkbox--disabled'}
  ])

  const handleChange = (event) => {
      onChange && onChange(event.target.checked, event);
  };

  const renderCheckboxLabel = () => {
    let labelStyle = {};

    if (checked && customCheckboxColor) {
      labelStyle = {
        color: customCheckboxColor
      };
    }

    return (
      <label className={`checkbox_label checkbox_label--${labelAlign}`} style={labelStyle} htmlFor={id}>
        {!boxOnly && label}
      </label>
    );
  };

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
    <div className={baseClassName}>
      {labelAlign === 'left' && (boxOnly || label) && renderCheckboxLabel()}
      {renderCheckboxInput()}
      {labelAlign === 'right' && (boxOnly  || label) && renderCheckboxLabel()}
    </div>
  )
}

Checkbox.propTypes = {
  /**
   * A custom className to pass into the checkbox component
   */
  className: PropTypes.string,

  /**
   * A unique ID for the checkbox and checkbox label
   */
  id: PropTypes.string.isRequired,

  /**
   * The name attribute used in the checkbox input
   */
  name: PropTypes.string,

  /**
   * Used to determine checked state for the checkbox input
   */
  checked: PropTypes.bool.isRequired,

  /**
   * Used to paint the component using a specific theme
   */
  theme: PropTypes.string,

  /**
   * Used to overwrite checkbox colour while in checked state
   */
  customCheckboxColor: PropTypes.string,

  /**
   * Used to determine the size of the checkbox
   */
  size: PropTypes.string,

  /**
   * The default label prop to determine label text or render
   * Note: pass a simple ' ' string for no label rendering
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Used to paint a label to the right of the checkbox
   * Note: this is a duplicate prop for the sake of better component usability
   */
  labelAlign: PropTypes.oneOf(['left', 'right']),

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
   * Used to disable interaction with the checkbox component
   */
  disabled: PropTypes.bool,

  /**
   * A callback function for when the user checks or unchecks the checkbox
   */
  onChange: PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  boxOnly: false,
  checked: false,
  labelAlign: 'right'
}

export default memo(Checkbox)