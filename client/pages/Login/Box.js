import React from 'react'
import classnames from 'classnames'
import withDevice from '../../lib/withDevice'
import styles from './Box.css'

function Box ({ device, children, className }) {
  return (
    <div className={classnames(styles.box, styles[device], className)}>
      {children}
    </div>
  )
}

export default withDevice()(Box)
