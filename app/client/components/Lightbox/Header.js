import React from 'react'
import styles from './Header.css'

export default function Header ({ onClose }) {
  return (
    <div className={styles.root}>
      <svg viewBox='0 0 24 24' className={styles.close} onClick={onClose}>
        <path d='M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z' />
      </svg>
    </div>
  )
}
