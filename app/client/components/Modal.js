import React from 'react'
import classnames from 'classnames'
import withDevice from '../lib/withDevice'
import { SubTitle } from './typography'
import styles from './Modal.css'

function Modal ({ title, children, className, onClose, device }) {
  return (
    <div className={classnames(styles.container, styles[device])}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <SubTitle className={styles.title}>{title}</SubTitle>
          <div onClick={onClose} className={styles.close}>
            ✕
          </div>
        </div>
        <div className={classnames(styles.body, className)}>{children}</div>
      </div>
    </div>
  )
}

export default withDevice()(Modal)
