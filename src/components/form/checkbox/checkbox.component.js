// import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';
// import {THEMES, getClassName} from '../../../../utils/ui';
// import './checkbox.component.css';
//
// /**
//  * Checkbox Component
//  */
// class Checkbox extends PureComponent {
//
//     /**
//      * Handle Checkbox input change
//      * @param event
//      */
//     handleChange = (event) => {
//         const {onChange} = this.props;
//
//         onChange && onChange(event.target.checked, event);
//     };
//
//     /**
//      * Render Checkbox input tag
//      * @returns {XML}
//      */
//     renderCheckboxInput = () => {
//         const {id, name, isChecked, isDisabled} = this.props;
//
//         return (
//             <input
//                 className='checkbox_input'
//                 type='checkbox'
//                 id={id}
//                 name={name}
//                 checked={!!isChecked}
//                 onChange={this.handleChange}
//                 disabled={isDisabled}
//             />
//         );
//     };
//
//     /**
//      * Render Checkbox label tag
//      * @returns {XML}
//      */
//     renderCheckboxLabel = () => {
//         const {id, label, labelAlign, customCheckboxColor, isBoxOnly, isChecked} = this.props;
//         let labelStyle = {};
//
//         if (isChecked && customCheckboxColor) {
//             labelStyle = {
//                 color: customCheckboxColor
//             };
//         }
//
//         return (
//             <label className={`checkbox_label checkbox_label--${labelAlign}`} style={labelStyle} htmlFor={id}>
//                 {!isBoxOnly && label}
//             </label>
//         );
//     };
//
//     /**
//      * Render Checkbox Component
//      * @returns {*}
//      */
//     render() {
//         const {className, theme, label, labelAlign, customCheckboxColor, size, isBoxOnly, isChecked, isDisabled} = this.props;
//
//         if (!isBoxOnly && !label) {
//             return null;
//         }
//
//         const baseClassName = getClassName(className ? `${className} checkbox` : 'checkbox', [
//             {condition: theme, trueClassName: `checkbox--${theme}`},
//             {condition: customCheckboxColor, trueClassName: 'checkbox--custom-color'},
//             {condition: size, trueClassName: `checkbox--${size}`},
//             {condition: isChecked, trueClassName: 'checkbox--checked'},
//             {condition: isBoxOnly, trueClassName: 'checkbox--box-only'},
//             {condition: isDisabled, trueClassName: 'checkbox--disabled'}
//         ]);
//
//         return (
//             <div className={baseClassName}>
//                 {labelAlign === 'left' && (isBoxOnly || label) && this.renderCheckboxLabel()}
//                 {this.renderCheckboxInput()}
//                 {labelAlign === 'right' && (isBoxOnly || label) && this.renderCheckboxLabel()}
//             </div>
//         );
//     }
// }
//
// Checkbox.propTypes = {
//     /**
//      * A custom className to pass into the checkbox component
//      */
//     className: PropTypes.string,
//
//     /**
//      * A unique ID for the checkbox and checkbox label
//      */
//     id: PropTypes.string.isRequired,
//
//     /**
//      * The name attribute used in the checkbox input
//      */
//     name: PropTypes.string,
//
//     /**
//      * Used to determine checked state for the checkbox input
//      */
//     isChecked: PropTypes.bool.isRequired,
//
//     /**
//      * Used to paint the component using a specific theme
//      */
//     theme: PropTypes.oneOf([THEMES.DARK, THEMES.LIGHT, THEMES.RAIN, THEMES.TEAL, THEMES.STEEL, THEMES.INK, THEMES.LIGHT_SLATE, THEMES.SOFT_GREY, THEMES.WHITE_RAIN, THEMES.WHITE_STEEL, THEMES.Q4_BLUE_WHITE]),
//
//     /**
//      * Used to overwrite checkbox colour while in checked state
//      */
//     customCheckboxColor: PropTypes.string,
//
//     /**
//      * Used to determine the size of the checkbox
//      */
//     size: PropTypes.string,
//
//     /**
//      * The default label prop to determine label text or render
//      * Note: pass a simple ' ' string for no label rendering
//      */
//     label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//
//     /**
//      * Used to paint a label to the right of the checkbox
//      * Note: this is a duplicate prop for the sake of better component usability
//      */
//     labelAlign: PropTypes.oneOf(['left', 'right']),
//
//     /**
//      * Used to determine whether or not to render label text as to only render a standalone checkbox
//      * Note: If label is not provided, this prop is required. The component will not render otherwise.
//      */
//     isBoxOnly: (props, propName, componentName) => {
//         if (!props.label && !props.isBoxOnly) {
//             return new Error(`Prop 'isBoxOnly' must be true when prop 'label' is not specified in '${componentName}'.`);
//         }
//     },
//
//     /**
//      * Used to disable interaction with the checkbox component
//      */
//     isDisabled: PropTypes.bool,
//
//     /**
//      * A callback function for when the user checks or unchecks the checkbox
//      */
//     onChange: PropTypes.func.isRequired
// };
//
// Checkbox.defaultProps = {
//     theme: THEMES.RAIN,
//     isBoxOnly: false,
//     isChecked: false,
//     labelAlign: 'right'
// };
//
// export default Checkbox;