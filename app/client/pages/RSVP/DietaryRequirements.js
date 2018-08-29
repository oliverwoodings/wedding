import React, { Component } from 'react'
import { debounce } from 'lodash-es'
import classnames from 'classnames'
import styles from './DietaryRequirements.css'

export default class DietaryRequirements extends Component {
  state = {
    value: this.props.initialValue || ''
  }

  debouncedOnChange = debounce(this.props.onChange, 400)

  render () {
    const { className } = this.props

    return (
      <textarea
        placeholder={'What can\'t you eat?'}
        value={this.state.value}
        onChange={::this.updateValue}
        className={classnames(styles.input, className)}
      />
    )
  }

  updateValue (e) {
    const value = e.target.value
    this.setState({ value }, () => this.debouncedOnChange(value))
  }
}
