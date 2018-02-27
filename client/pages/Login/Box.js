import React from 'react'
import classnames from 'classnames'
import withDevice from '../../lib/withDevice'
import { SubTitle } from '../../components/typography'
import styles from './Box.css'

function Box ({ device, children, className, title }) {
  const classes = classnames(styles.box, styles[device], {
    [styles.hasTitle]: !!title
  }, className)

  return (
    <div className={classes}>
      {title && <SubTitle className={styles.title}>{title}</SubTitle>}
      {children}
    </div>
  )
}

export default withDevice()(Box)
