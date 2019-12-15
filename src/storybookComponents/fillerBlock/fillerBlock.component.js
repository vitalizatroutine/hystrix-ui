import React, { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { getClassName } from '../../utils/ui'
import './fillerBlock.component.css'

function FillerBlock (props, ref) {
  const { id, className, style, theme, placeholder, children, onClick } = props

  const baseClassName = getClassName('filler-block', [
    { condition: className, trueClassName: className },
    { condition: theme, trueClassName: `filler-block--${theme}` }
  ])

  return (
    <article ref={ref} id={id} className={baseClassName} style={style} onClick={onClick}>
      {children || (
        <span className='filler-block_placeholder-text'>{placeholder || 'Filler Block'}</span>
      )}
    </article>
  )
}

FillerBlock.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  styles: PropTypes.object,
  theme: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
}

export default memo(forwardRef(FillerBlock))
