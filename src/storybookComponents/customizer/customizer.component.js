import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import { Field } from '../../components'
import { Layout } from '../../storybookComponents'
import './customizer.component.css'

// import { getClassName } from '../../utils/ui'

class Customizer extends PureComponent {
  constructor (props) {
    super(props)

    const customProps = (props.config || []).reduce((accumulator, currentValue) => {
      if (currentValue && !isUndefined(currentValue.field)) {
        Object.assign(accumulator, {
          [currentValue.field]: currentValue.initialValue
        })
      }
      return accumulator
    }, {})

    this.state = {
      customProps
    }
  }

  renderPropField = (prop) => {
    const {field, type, initialValue} = prop
    const handlePropChange = (event, value) => {
      this.setState({
        customProps: {
          ...this.state.customProps,
          [field]: value
        }
      })
    }

    return (
      <Field
        key={`customizer-prop--${field}`}
        id={`customizer-prop--${field}`}
        name={`customizer-prop--${field}`}
        label={field}
        type={type}
        initialValue={initialValue}
        onChange={handlePropChange}
      />
    )
  }

  render () {
    const {config, component} = this.props
    const {customProps} = this.state

    return (
      <section className='customizer'>
        <Layout theme='light' height='comfy' horizontalAlign='center' verticalAlign='center'>
          {cloneElement(component, customProps)}
        </Layout>
        <Layout theme='white' horizontalAlign='left' verticalAlign='top'>
          {(config || []).map((prop) => this.renderPropField(prop))}
        </Layout>
      </section>
    )
  }
}

Customizer.propTypes = {
  config: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired
  })).isRequired
}

export default Customizer