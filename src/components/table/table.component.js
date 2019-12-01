import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { getClassName } from '../../utils/'
import './table.component.css'

function TableHeaderCell (props) {
  const { className, index, label, align } = props

  const baseClassName = getClassName('table_cell table_cell--header', [
    { condition: className, trueClassName: className },
    { condition: typeof index === 'number', trueClassName: index % 2 ? 'table_cell--even' : 'table_cell--odd' },
    { condition: align, trueClassName: `table_cell--align-${align}` }
  ])

  return (
    <div className={baseClassName}>
      {label}
    </div>
  )
}

function TableCell (props) {
  const {
    className, index, name, defaultValue, truncate, align, data,
    getFormattedValue, getCustomCell
  } = props

  const baseClassName = getClassName('table_cell table_cell--body', [
    { condition: className, trueClassName: className },
    { condition: typeof index === 'number', trueClassName: index % 2 ? 'table_cell--even' : 'table_cell--odd' },
    { condition: truncate, trueClassName: 'table_cell--truncated' },
    { condition: align, trueClassName: `table_cell--align-${align}` }
  ])

  const derivedValue = get(data, name, defaultValue)
  const cellContent = getFormattedValue
    ? getFormattedValue(derivedValue)
    : getCustomCell ? getCustomCell(derivedValue, data) : derivedValue

  return (
    <div className={baseClassName}>{cellContent}</div>
  )
}

function TableRow (props) {
  const { className, index, children, rows, onRowClick } = props

  const baseClassName = getClassName('table_row', [
    { condition: className, trueClassName: className },
    { condition: typeof index === 'number', trueClassName: index % 2 ? 'table_row--even' : 'table_row--odd' },
    { condition: onRowClick, trueClassName: 'table_row--clickable' }
  ])

  const handleRowClick = (event) => onRowClick && onRowClick(rows[index], rows, event)

  return (
    <div className={baseClassName} onClick={handleRowClick}>
      {children}
    </div>
  )
}

function TableHeader (props) {
  const { id, columns } = props

  const baseClassName = getClassName('table_header', [])

  return (
    <div className={baseClassName}>
      <TableRow className='table_row--header'>
        {(columns || []).map((column, columnIndex) => (
          <TableHeaderCell
            {...column}
            key={`${id}-header-column--${column.name || columnIndex}`}
            index={columnIndex}
          />
        ))}
      </TableRow>
    </div>
  )
}

function TableBody (props) {
  const { id, rows, columns } = props

  const baseClassName = getClassName('table_body', [])

  return (
    <div className={baseClassName}>
      {(rows || []).map((row, rowIndex) => {
        return (
          <TableRow {...props} key={`${id}-row--${rowIndex}`} index={rowIndex} className='table_row--body'>
            {(columns || []).map((column, columnIndex) => (
              <TableCell
                {...column}
                key={`${id}-column--${column.name || columnIndex}`}
                index={columnIndex}
                data={row}
              />
            ))}
          </TableRow>
        )
      })}
    </div>
  )
}

function Table (props) {
  const { className, size, fixed } = props

  const baseClassName = getClassName('table', [
    { condition: className, trueClassName: className },
    { condition: size, trueClassName: `table--${size}` },
    { condition: fixed, trueClassName: 'table--fixed' }
  ])

  return (
    <div className={baseClassName}>
      <TableHeader {...props} />
      <TableBody {...props} />
    </div>
  )
}

Table.propTypes = {
  /**
   * A custom className for the component
   */
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right'])
  })).isRequired,
  rows: PropTypes.array.isRequired,
  getFormattedValue: PropTypes.func,
  getCustomCell: PropTypes.func
}

Table.defaultProps = {}

export default memo(Table)
