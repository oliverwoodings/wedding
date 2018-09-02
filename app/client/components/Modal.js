import React from 'react'
import classnames from 'classnames'
import { SubTitle } from './typography'
import styles from './Modal.css'

export default function Modal ({ title, children, className, onClose }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <SubTitle className={styles.title}>{title}</SubTitle>
          <div onClick={onClose} className={styles.close}>✕</div>
        </div>
        <div className={classnames(styles.body, className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
