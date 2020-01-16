import React, { memo } from 'react'
import { string, object, bool, array, oneOf, oneOfType } from 'prop-types'
import { getClassName } from '../../../utils/'

const columnGroups = [2, 3, 4, 5, 6, 8, 12]
const columnModifiers = columnGroups.reduce((accumulator, currentGroup) => {
  for (let iterator = 1; iterator <= currentGroup; iterator ++) {
    accumulator.push(`${iterator}-of-${currentGroup}`)
  }

  return accumulator
}, ['1-of-1'])

function GridColumn (props) {
  const {className, id, children, width, smallWidth, mobileWidth, first, last, centered, verticalAlign} = props

  const baseClassName = getClassName('grid_col', [
    {condition: className, trueClassName: className},
    {condition: width, trueClassName: `grid_col--${width}`},
    {condition: smallWidth, trueClassName: `grid_col--small-${smallWidth}`},
    {condition: mobileWidth, trueClassName: `grid_col--mobile-${mobileWidth}`},
    {condition: first, trueClassName: 'grid_col--first'},
    {condition: last, trueClassName: 'grid_col--last'},
    {condition: centered, trueClassName: 'grid_col--centered'},
    {condition: verticalAlign && verticalAlign !== 'top', trueClassName: `grid_col--${verticalAlign}`}
  ])

  return (
    <div className={baseClassName} id={id}>
      {children}
    </div>
  )
}

GridColumn.propTypes = {
  /**
   * A custom className for the component
   */
  className: string,

  /**
   * A custom id for the component
   */
  id: string,

  /**
   * The children to render inside the component
   */
  children: oneOfType([object, array]),

  /**
   * Used to determine the width of the grid column
   * Structure: `${amount of columns to take up}-of-${total amount of columns}`
   * Example: '1-of-4'
   */
  width: oneOf(columnModifiers),
  smallWidth: oneOf(columnModifiers),
  mobileWidth: oneOf(columnModifiers),

  /**
   * Used to determine whether or not to draw the column first
   */
  first: bool,

  /**
   * Used to determine whether or not to draw the column last
   */
  last: bool,

  /**
   * Used to determine whether or not to draw the column in the center
   */
  centered: bool,

  /**
   * Used to determine the vertical alignment of the column
   */
  verticalAlign: oneOf(['top', 'middle', 'bottom'])
}

GridColumn.defaultProps = {
  first: false,
  last: false,
  centered: false,
  verticalAlign: 'top'
}

export default memo(GridColumn)