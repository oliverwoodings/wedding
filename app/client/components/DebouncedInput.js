import { Component } from 'react'
import { debounce } from 'lodash-es'

export default class DebouncedInput extends Component {
  state = {
    value: this.props.initialValue || ''
  }

  debouncedOnChange = debounce(this.props.onChange, 400)

  render () {
    const { children } = this.props

    return children({
      value: this.state.value,
      onChange: ::this.updateValue
    })
  }

  updateValue (e) {
    const value = e.target.value
    this.setState({ value }, () => this.debouncedOnChange(value))
  }
}
