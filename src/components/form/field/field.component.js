import React, { useState, memo } from 'react'
import { string, number, object, bool, func, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../../utils/'
import './field.component.css'

function Input (props) {
  const {
    type, name, id, value, placeholder, minLength, maxLength, readOnly,
    onFocus, onBlur, handleInputChange
  } = props

  return (
    <input
      className='field_input'
      type={type}
      name={name}
      id={id}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      readOnly={readOnly ? 'readonly' : null}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={handleInputChange}
    />
  )
}

function TextArea ({ name, id, value, placeholder, readOnly, onFocus, onBlur, handleInputChange }) {
  return (
    <textarea
      className='field_input'
      name={name}
      id={id}
      value={value}
      readOnly={readOnly ? 'readonly' : null}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={handleInputChange}
    />
  )
}

function Field (props) {
  const { className, type, theme, size, label, value, id, readOnly, onChange } = props

  const baseClassName = getClassName('field', [
    { condition: className, trueClassName: className },
    { condition: type, trueClassName: `field--${type}` },
    { condition: theme, trueClassName: `field--${theme}` },
    { condition: size, trueClassName: `field--${size}` },
    { condition: readOnly, trueClassName: 'field--disabled' },
    { condition: value, falseClassName: 'field--empty' }
  ])

  function handleInputChange (event) {
    if (readOnly) {
      return
    }

    event.persist()
    const target = event.target
    const newValue = target.value

    onChange && onChange(newValue, event)
  }

  function renderInput () {
    switch (type) {
      case 'textarea':
        return <TextArea {...props} handleInputChange={handleInputChange} />
      case 'number':
      case 'text':
      case 'password':
      default:
        return <Input {...props} handleInputChange={handleInputChange} />
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
  className: string,
  type: string,
  theme: string,
  size: oneOf(['small', 'default', 'large']),
  label: oneOfType([string, object]),
  value: oneOfType([string, number]),
  id: string.isRequired,
  name: string.isRequired,
  minLength: number,
  maxLength: number,
  placeholder: string,
  readyOnly: bool,
  onFocus: func,
  onBlur: func,
  onChange: func
}

Field.defaultProps = {
  type: 'text',
  initialValue: '',
  minLength: 1,
  maxLength: 32
}

export default memo(Field)