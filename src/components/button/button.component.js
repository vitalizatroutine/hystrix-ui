import React, { useRef } from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
  const {label, onClick} = props

  return (
    <button onclick={onClick}>{label}</button>
  )
}

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onClick: PropTypes.func.isRequired
}

export default Button