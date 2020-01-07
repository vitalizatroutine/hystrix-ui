import React, { createContext, useState, useEffect, useReducer, useContext } from 'react'

const initialState = {
  listeners: []
}

export const SUBSCRIBE_TO_KEYBOARD_EVENT = 'SUBSCRIBE_TO_KEYBOARD_EVENT'
export const UNSUBSCRIBE_FROM_KEYBOARD_EVENT = 'UNSUBSCRIBE_FROM_KEYBOARD_EVENT'

const KeyboardListenerStateContext = createContext()
const KeyboardListenerDispatchContext = createContext()

/**
 * KeyboardListener context reducer
 * @param state
 * @param action
 * @returns {*|{listeners}|*|{initialized}}
 */
function keyboardListenerReducer (state, action) {
  const { type, payload } = action

  switch (type) {
    case SUBSCRIBE_TO_KEYBOARD_EVENT: {
      return handleSubscribe(state, payload)
    }
    case UNSUBSCRIBE_FROM_KEYBOARD_EVENT: {
      return handleUnsubscribe(state, payload)
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

/**
 * KeyboardListener provider component used for wrapping around application
 * @param children
 * @returns {*}
 * @constructor
 */
function KeyboardListenerProvider ({ children }) {
  const [initialized, setInitialized] = useState(false)
  const [state, dispatch] = useReducer(keyboardListenerReducer, initialState)

  // useEffect(() => {
  //   if (!initialized) {
  //     console.log('initializing')
  //     window.addEventListener('keydown', handleKeyboardDown)
  //     setInitialized(true)
  //   }
  // })

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyboardDown)
    window.addEventListener('keydown', handleKeyboardDown)
  }, [state.listeners])

  function handleKeyboardDown () {
    console.log('returned function with state', state)
  }

  return (
    <KeyboardListenerStateContext.Provider value={state}>
      <KeyboardListenerDispatchContext.Provider value={dispatch}>
        {console.log('state upon re-render', state)}
        {children}
      </KeyboardListenerDispatchContext.Provider>
    </KeyboardListenerStateContext.Provider>
  )
}

function useKeyboardListenerState () {
  const context = useContext(KeyboardListenerStateContext)

  if (context === undefined) {
    throw new Error('useKeyboardListenerState must be used within a KeyboardListenerProvider')
  }

  return context
}

function useKeyboardListenerDispatch () {
  const context = useContext(KeyboardListenerDispatchContext)

  if (context === undefined) {
    throw new Error('useKeyboardListenerDispatch must be used within a KeyboardListenerProvider')
  }

  return context
}

function useKeyboardListener () {
  return [useKeyboardListenerState(), useKeyboardListenerDispatch()]
}

function handleSubscribe (state, listener) {
  if (!listener || typeof listener !== 'object') {
    console.warn('KeyboardListener could not accept the provided listener because it was either undefined or isn\'t an object.')
    return state
  }

  if (!listener.id) {
    console.warn('KeyboardListener could not accept the provided listener due to a missing id property.')
    return state
  }

  if (!listener.key) {
    console.warn('KeyboardListener could not accept the provided listener due to a missing key property.')
    return state
  }

  if (!listener.onTrigger) {
    console.warn('KeyboardListener could not accept the provided listener due to a missing onTrigger property.')
    return state
  }

  return {
    ...state,
    listeners: [...state.listeners, listener]
  }
}

function handleUnsubscribe (state, id) {
  if (!id || typeof id !== 'string') {
    console.warn('KeyboardListener could not accept the provided id because it is either undefinied or isn\'t a string')
    return state
  }

  return {
    ...state,
    listeners: state.listeners.filter((listener) => listener.id !== id)
  }
}

export {
  KeyboardListenerProvider,
  useKeyboardListener,
  useKeyboardListenerDispatch,
  useKeyboardListenerState
}
