import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../../utils/'
import RadioButton from '../radioButton'
import './radioGroup.component.css'

function RadioGroup (props) {
  const {className, options, theme, label, direction, name, size, labelAlign, onChange} = props

  const baseClassName = getClassName('radio-group', [
    {condition: className, trueClassName: className},
    {condition: direction, trueClassName: `radio-group--${direction}`},
    {condition: theme, trueClassName: `radio-group--${theme}`}
  ])

  return (
    <div className={baseClassName}>
      <label className='radio-group_label'>{label}</label>
      <div className='radio-group_inputs'>
        {(options || []).map((option) => (
          <RadioButton
            key={option.id}
            theme={theme}
            name={name}
            size={size}
            labelAlign={labelAlign}
            inline={direction === 'horizontal'}
            alignWithFields={false}
            onChange={onChange}
            {...option}
          />
        ))}
      </div>
    </div>
  )
}

RadioGroup.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,

  /**
   * Used to determine the label for the radio-group
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

  /**
   * Used to determine the direction of how the radio-buttons flow
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * Shared props for each radio-button
   * Note: See RadioButton propTypes for documentation
   */
  name: PropTypes.string.isRequired,
  theme: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  labelAlign: PropTypes.oneOf(['left', 'right']),
  onChange: PropTypes.func.isRequired,

  /**
   *
   */
  options: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    checked: PropTypes.bool.isRequired,
    customRadioButtonColor: PropTypes.string,
    disabled: PropTypes.bool,
  }))
}

RadioGroup.defaultProps = {
  direction: 'horizontal',
  size: 'default',
  labelAlign: 'right'
}

export default memo(RadioGroup)