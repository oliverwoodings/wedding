import React from 'react'
import styles from './PhotoModal.css'

export default function PhotoModal ({ photo, onClose, onPrev, onNext, index }) {
  return (
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>Hello</div>
    </div>
  )
}
