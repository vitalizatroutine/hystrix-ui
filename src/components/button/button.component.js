import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import './button.component.css'

const Button = (props) => {
  const {label, onClick} = props

  return (
    <button className='button' onclick={onClick}>{label}</button>
  )
}

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func.isRequired
}

export default Button