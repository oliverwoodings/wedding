import React from 'react'
import classnames from 'classnames'
import styles from './Action.css'

export default function Action ({ onAction, children, disabled }) {
  return (
    <div className={classnames(styles.action, {
      [styles.disabled]: disabled
    })}>
      {children}
      <Arrow onClick={() => !disabled && onAction()} />
    </div>
  )
}

function Arrow (props) {
  return (
    <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={styles.arrow} {...props}>
      <path d='m11.5 3 9 9-9 9' strokeMiterlimit='10' strokeWidth='2'/ >
      <path d='m2 12h18.5' strokeMiterlimit='10' strokeWidth='2' />
    </svg>
  )
}
