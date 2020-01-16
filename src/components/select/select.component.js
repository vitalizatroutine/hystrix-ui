import React, { memo, useState, useEffect } from 'react'
import { string, object, bool, func, shape, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../utils/'

import { Field, Popover } from '../../components'

import './select.component.css'

function Select (props) {
  const { className, id, name, theme, forceMenuOpen } = props

  const [menuOpen, setMenuOpen] = useState(forceMenuOpen || false)

  const baseClassName = getClassName('select', [
    { condition: className, trueClassName: className }
  ])

  function handleFieldFocus () {
    setMenuOpen(true)
  }

  function handleFieldBlur () {
    setMenuOpen(false)
    console.log('we blurred!')
  }

  function handleFieldChange (newValue) {
    console.log('newValue', newValue)
  }

  function handlePopoverClose () {
    setMenuOpen(false)
  }

  return (
    <div className={baseClassName}>
      <Field
        theme={theme}
        type='text'
        id={id}
        name={name}
        readyOnly={false}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        onChange={handleFieldChange}
      />
      <Popover
        targetElementId={id}
        transitionSpeed='fast'
        targetOrigin='bottom'
        popoverOrigin='top'
        matchWidth
        masked={false}
        visible={forceMenuOpen || menuOpen}
        onCloseRequest={handlePopoverClose}
      >
        <p>Stuff</p>
      </Popover>
    </div>
  )
}

Select.propTypes = {
  /**
   * A custom className for the component
   */
  className: string,

  /**
   * A custom id for the component
   */
  id: string
}

Select.defaultProps = {}

export default memo(Select)
