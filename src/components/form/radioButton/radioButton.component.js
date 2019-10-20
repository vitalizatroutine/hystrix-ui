// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import './radioButton.component.css'
//
// /**
//  * RadioButton Component
//  */
// class RadioButton extends PureComponent {
//   /**
//      * Render RadioButton Component
//      * @return {XML}
//      */
//   render () {
//     const { className, theme, customRadioButtonColor, isSelected, id, name, disabled, onChange, value } = this.props
//     let { label, labelLeft, labelRight } = this.props
//
//     let labelStyle = {}
//     const baseClassName = [
//       className ? `${className} radio-button` : 'radio-button',
//       theme ? `radio-button--${theme}` : '',
//       customRadioButtonColor ? 'radio-button--custom-color' : '',
//       isSelected ? 'radio-button--selected' : '',
//       disabled ? 'radio-button--disabled' : ''
//     ].join(' ')
//
//     if (isSelected && customRadioButtonColor) {
//       labelStyle = {
//         color: customRadioButtonColor
//       }
//     }
//
//     if (labelLeft) {
//       label = null
//       labelRight = null
//     }
//
//     return (
//       <div className={baseClassName}>
//         {labelLeft && (
//           <label className='radio-button_label radio-button_label--left' style={labelStyle} htmlFor={id}>{labelLeft}</label>
//         )}
//         <input
//           className='radio-button_input'
//           type='radio'
//           id={id}
//           name={name}
//           checked={!!isSelected}
//           value={value}
//           onChange={onChange}
//           disabled={disabled}
//
//         />
//         {(label || labelRight) && (
//           <label className='radio-button_label radio-button_label--right' style={labelStyle} htmlFor={id}>{label || labelRight}</label>
//         )}
//       </div>
//     )
//   }
// }
//
// RadioButton.propTypes = {
//   /**
//      * A custom className to pass into the radio button component
//      */
//   className: PropTypes.string,
//
//   /**
//      * The value of the radio button
//      * Used to provide context for the supported callbacks
//      */
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
//
//   /**
//      * A unique ID for the radio button and radio button label
//      */
//   id: PropTypes.string.isRequired,
//
//   /**
//      * A unique name for the radio button group
//      */
//   name: PropTypes.string.isRequired,
//
//   /**
//      * Used to determine selected state for the radio button input
//      */
//   isSelected: PropTypes.bool.isRequired,
//
//   /**
//      * Used to paint the component using a specific theme
//      */
//   theme: PropTypes.string,
//
//   /**
//      * Used to overwrite radio button colour while in checked state
//      */
//   customRadioButtonColor: PropTypes.string,
//
//   /**
//      * The default label prop to determine label text or render
//      * Note: pass a simple ' ' string for no label rendering
//      */
//   label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//
//   /**
//      * Used to paint a label to the left of the checkbox instead of the right side
//      */
//   labelLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//
//   /**
//      * Used to paint a label to the right of the checkbox
//      * Note: this is a duplicate prop for the sake of better component usability
//      */
//   labelRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//
//   /**
//      * Used to disable interaction with the radio button component
//      */
//   disabled: PropTypes.bool,
//
//   /**
//      * A callback function for when the user selects the radio button
//      */
//   onChange: PropTypes.func.isRequired
// }
//
// RadioButton.defaultProps = {
//   theme: 'rain'
// }
//
// export default RadioButton
