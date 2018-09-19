import React from 'react'
import classnames from 'classnames'
import styles from './Select.css'

export default function Select ({ className, children, ...props }) {
  return (
    <select className={classnames(styles.select, className)} {...props}>
      {children}
    </select>
  )
}
