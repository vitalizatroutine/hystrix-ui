import React, { memo, forwardRef } from 'react'
import { string, object, array, oneOfType, oneOf } from 'prop-types'
import { getClassName } from '../../utils/ui'
import './fillerBlock.component.css'

const FillerBlock = forwardRef(function (props, ref) {
  const { id, className, style, theme, size, placeholder, children, onClick } = props

  const baseClassName = getClassName('filler-block', [
    { condition: className, trueClassName: className },
    { condition: theme, trueClassName: `filler-block--${theme}` },
    { condition: size, trueClassName: `filler-block--${size}` }
  ])

  return (
    <article ref={ref} id={id} className={baseClassName} style={style} onClick={onClick}>
      {children || (
        <span className='filler-block_placeholder-text'>{placeholder || 'Filler Block'}</span>
      )}
    </article>
  )
})

FillerBlock.propTypes = {
  id: string,
  className: string,
  size: oneOf(['small', 'default', 'large']),
  styles: object,
  theme: string,
  children: oneOfType([string, array, object])
}

export default memo(FillerBlock)
