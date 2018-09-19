import React, { Component } from 'react'
import classnames from 'classnames'
import styles from './LoginInput.css'

export default class LoginInput extends Component {
  static defaultProps = {
    type: 'text'
  }

  componentDidMount () {
    if (this.props.autofocus) {
      this.input.focus()
    }
  }

  render () {
    const {
      className,
      onChange,
      type,
      onEnter,
      autofocus,
      ...props
    } = this.props
    return (
      <input
        {...props}
        className={classnames(styles.input, className)}
        type={type}
        onChange={e => onChange(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter' && onEnter) onEnter()
        }}
        ref={input => {
          this.input = input
        }}
      />
    )
  }
}
