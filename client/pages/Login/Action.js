import React from 'react'
import styles from './Action.css'

export default function Action ({ onAction, children }) {
  return (
    <div className={styles.action}>
      {children}
      <Arrow onClick={onAction} />
    </div>
  )
}


function Arrow (props) {
  return (
    <svg viewBox="19 20 58 58" xmlns="http://www.w3.org/2000/svg" className={styles.arrow} {...props}>
      <polygon points="72.2,50.2 48.7,73.7 50.2,75.3 76.4,49.1 50.2,22.9 48.7,24.5 72.2,48 18.5,48 18.5,50.2 "/>
    </svg>
  )
}
