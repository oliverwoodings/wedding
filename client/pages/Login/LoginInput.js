import React from 'react'
import classnames from 'classnames'
import styles from './LoginInput.css'

export default function LoginInput ({ className, onChange, type, onEnter, ...props}) {
  return (
    <input
      {...props}
      className={classnames(styles.input, className)}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && onEnter) onEnter()
      }}
      ref={(input) => input && input.focus()}
    />
  )
}

LoginInput.defaultProps = {
  type: 'text'
}
