import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isUndefined } from 'lodash'
import { Checkbox, Field, Grid, GridColumn } from '../../components'
import { Layout } from '../../storybookComponents'
import './customizer.component.css'

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

  renderPropField = (prop, customProps) => {
    const {field, type} = prop
    const value = customProps[field]
    const handlePropChange = (value) => {
      this.setState({
        customProps: {
          ...this.state.customProps,
          [field]: value
        }
      })
    }

    switch (type) {
      case 'boolean':
        return (
          <Checkbox
            id={`customizer-prop--${field}`}
            name={`customizer-prop--${field}`}
            label={field}
            checked={value}
            onChange={handlePropChange}
          />
        )
      case 'text':
      case 'number':
        return (
          <Field
            id={`customizer-prop--${field}`}
            name={`customizer-prop--${field}`}
            label={field}
            type={type}
            value={value}
            onChange={handlePropChange}
          />
        )
    }
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
          <Grid>
            {(config || []).map((prop) => (
              <GridColumn key={`customizer-prop--${prop.field}`} width='1-of-4' smallWidth='1-of-3'>
                {this.renderPropField(prop, customProps)}
              </GridColumn>
            ))}
          </Grid>
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