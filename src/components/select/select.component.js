import React, { memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/'

import {
  useKeyboardListenerDispatch,
  SUBSCRIBE_TO_KEYBOARD_EVENT,
  UNSUBSCRIBE_FROM_KEYBOARD_EVENT
} from '../../context'
import { Field, Popover } from '../../components'

import './select.component.css'

function Select (props) {
  const { className, forceMenuOpen } = props

  const keyDispatch = useKeyboardListenerDispatch()
  const [menuOpen, setMenuOpen] = useState(forceMenuOpen || false)

  const baseClassName = getClassName('select', [
    { condition: className, trueClassName: className }
  ])

  useEffect(() => {
    if (typeof forceMenuOpen === 'undefined' ? menuOpen : forceMenuOpen) {
      console.log('subscribe')
      keyDispatch({
        type: SUBSCRIBE_TO_KEYBOARD_EVENT,
        payload: { id: 'select--enter', key: 13, onTrigger: handleEnterKey }
      })
    }

    if (typeof forceMenuOpen === 'undefined' ? !menuOpen : !forceMenuOpen) {
      keyDispatch({ type: UNSUBSCRIBE_FROM_KEYBOARD_EVENT, payload: 'select--enter' })
    }

    return keyDispatch({ type: UNSUBSCRIBE_FROM_KEYBOARD_EVENT, payload: 'select--enter' })
  }, [menuOpen, forceMenuOpen])

  function handleEnterKey () {
    console.log('we hit enter!')
  }

  return (
    <div
      className={baseClassName}
      onClick={() => keyDispatch({
        type: SUBSCRIBE_TO_KEYBOARD_EVENT,
        payload: { id: 'select--enter', key: 13, onTrigger: handleEnterKey }
      })}
      onDoubleClick={() => keyDispatch({ type: UNSUBSCRIBE_FROM_KEYBOARD_EVENT, payload: 'select--enter' })}
    >
      {menuOpen ? 'open ' : 'closed'}
    </div>
  )
}

Select.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string
}

Select.defaultProps = {}

export default memo(Select)
