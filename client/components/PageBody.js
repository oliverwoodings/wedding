import React from 'react'
import classnames from 'classnames'
import { SubTitle } from './typography'
import styles from './PageBody.css'

export default function PageBody ({ title, children, fill }) {
  return (
    <div className={classnames(styles.body, {
      [styles.fill]: fill
    })}>
      {title && <SubTitle className={styles.title}>{title}</SubTitle>}
      <div className={styles.children}>{children}</div>
    </div>
  )
}
