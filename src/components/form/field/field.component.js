import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import { getClassName } from '../../../utils/'
import './field.component.css'

function Input (props) {
  const {type, name, id, value, placeholder, minLength, maxLength, readOnly, handleInputChange} = props

  return (
    <input
      className='field_input'
      type={type}
      name={name}
      id={id}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  )
}

function TextArea ({name, id, value, placeholder, readOnly, handleInputChange}) {
  return (
    <textarea
      className='field_input'
      name={name}
      id={id}
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={handleInputChange}
    />
  )
}

function Field (props) {
  const [value, setValue] = useState(props.initialValue)
  const {className, type, theme, size, label, forceValue, id, readOnly, onChange} = props

  const baseClassName = getClassName('field', [
    {condition: className, trueClassName: className},
    {condition: type, trueClassName: `field--${type}`},
    {condition: theme, trueClassName: `field--${theme}`},
    {condition: size, trueClassName: `field--${size}`},
    {condition: readOnly, trueClassName: `field--disabled`},
    {condition: value, falseClassName: 'field--empty'}
  ])

  const finalValue = isUndefined(forceValue) ? value : forceValue
  const renderInput = () => {
    const handleInputChange = (event) => {
      event.persist()
      const target = event.target
      const value = target.value

      setValue(value)
      onChange && onChange(event, value)
    }

    switch (type) {
      case 'textarea':
        return <TextArea props={{...props}} value={finalValue} handleInputChange={handleInputChange}/>
      case 'number':
      case 'text':
      case 'password':
      default:
        return <Input props={{...props}} value={finalValue} handleInputChange={handleInputChange}/>
    }
  }

  return (
    <div className={baseClassName}>
      {label && <label className='field_label' htmlFor={id}>{label}</label>}
      {renderInput()}
    </div>
  )
}

Field.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.string,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  forceValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  readyOnly: PropTypes.bool,
  onChange: PropTypes.func
}

Field.defaultProps = {
  type: 'text',
  initialValue: '',
  minLength: 1,
  maxLength: 32
}

export default memo(Field)