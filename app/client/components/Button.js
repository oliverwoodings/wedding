import React from 'react'
import classnames from 'classnames'
import styles from './Button.css'

export default function Button ({
  href,
  className,
  children,
  mega,
  secondary,
  inverted,
  ...props
}) {
  props.className = classnames(styles.button, className, {
    [styles.mega]: mega,
    [styles.secondary]: secondary,
    [styles.disabled]: props.disabled,
    [styles.inverted]: inverted
  })

  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return <button {...props}>{children}</button>
}
