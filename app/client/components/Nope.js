import React from 'react'
import styles from './Nope.css'

export default function Nope ({ children }) {
  return <div className={styles.nope}>{children}</div>
}
