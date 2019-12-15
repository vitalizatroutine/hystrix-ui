import React, { PureComponent, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isUndefined, groupBy } from 'lodash'
import { Checkbox, Field, Grid, GridColumn, RadioGroup } from '../../components'
import { Layout } from '../../components'
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

  getPropGroupDetails = (propType) => {
    const propTypeLabelMap = {
      'text': {
        label: 'String / React Object props',
        width: '1-of-4',
        smallWidth: '1-of-3'
      },
      'number': {
        label: 'Number props',
        width: '1-of-4',
        smallWidth: '1-of-3'
      },
      'boolean': {
        label: 'Boolean props',
        width: '1-of-8',
        smallWidth: '1-of-6'
      },
      'choice': {
        label: 'One of Choice props',
        width: '1-of-4',
        smallWidth: '1-of-3'
      },
      'function': {
        label: 'Function props',
        width: '1-of-2',
        smallWidth: '1-of-1'
      }
    }

    return propTypeLabelMap[propType] || 'Other props'
  }

  renderPropField = (prop, customProps) => {
    const { field, type, description, options, placeholder } = prop
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
      case 'text':
      case 'number':
        return (
          <Field
            id={`customizer-prop--${field}`}
            name={`customizer-prop--${field}`}
            label={field}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handlePropChange}
          />
        )
      case 'boolean':
        return (
          <Checkbox
            id={`customizer-prop--${field}`}
            name={`customizer-prop--${field}`}
            label={field}
            checked={value}
            alignWithFields={false}
            onChange={handlePropChange}
          />
        )
      case 'choice':
        return (
          <RadioGroup
            direction='vertical'
            name={`customizer-prop--${field}`}
            label={field}
            options={(options || []).map((option) => {
              return {
                id: `customizer-prop--${option}-${field}`,
                label: option,
                value: option,
                checked: value === option
              }
            })}
            onChange={handlePropChange}
          />
        )
      case 'function':
        return (
          <>
            <h3>{field}</h3>
            <p>{description}</p>
          </>
        )
    }
  }

  render () {
    const { config, component } = this.props
    const { customProps } = this.state

    if (!component) {
      return null
    }

    const propGroups = groupBy(config || [], 'type')

    return (
      <section className='customizer'>
        <Layout className='customizer_preview' theme='light' justifyContent='center' alignContent='center'>
          {cloneElement(component, customProps)}
        </Layout>
        <Layout className='customizer_form' theme='white' direction='column' justifyContent='flex-start'
                alignContent='flext-start'>
          {Object.keys(propGroups).map((propGroup) => {
            const propGroupDetails = this.getPropGroupDetails(propGroup)
            return (
              <div key={`customizer_section--${propGroup}`} className='customizer_section'>
                <h2>{propGroupDetails.label}</h2>
                {propGroup === 'function' && (
                  <p>The following prop use can be tracked within the <strong>Actions</strong> tab of this storybook.
                  </p>
                )}
                <Grid>
                  {propGroups[propGroup].map((prop) => (
                    <GridColumn key={`customizer-prop--${prop.field}`} width={propGroupDetails.width}
                                smallWidth={propGroupDetails.smallWidth}>
                      {this.renderPropField(prop, customProps)}
                    </GridColumn>
                  ))}
                </Grid>
              </div>
            )
          })}
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