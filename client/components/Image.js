import React from 'react'
import classnames from 'classnames'
import withDevice from '../lib/withDevice'
import styles from './Image.css'

function Image ({ className, device, ...props }) {
  return (
    <img
      className={classnames(styles.img, styles[device], className)}
      {...props}
    />
  )
}

export default withDevice()(Image)
