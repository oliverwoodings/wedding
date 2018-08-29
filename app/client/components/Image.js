import React from 'react'
import classnames from 'classnames'
import withDevice from '../lib/withDevice'
import styles from './Image.css'

function Image ({ className, device, ...props }) {
  return (
    <div className={classnames(styles.container, styles[device], className)}>
      <img className={styles.img} {...props} />
    </div>
  )
}

export default withDevice()(Image)
