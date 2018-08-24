import React from 'react'
import classnames from 'classnames'
import styles from './Button.css'

export default function Button ({ href, className, children, mega, ...props }) {
  props.className = classnames(styles.button, className, {
    [styles.mega]: mega
  })

  if (href) {
    return <a href={href} {...props}>{children}</a>
  }

  return <div {...props}>{children}</div>
}
