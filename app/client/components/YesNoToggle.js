import React from 'react'
import classnames from 'classnames'
import styles from './YesNoToggle.css'

export default function YesNoToggle ({ toggled, onToggle, className, maybe }) {
  return (
    <div
      className={classnames(styles.container, className, {
        [styles.yes]: toggled === true,
        [styles.maybe]: toggled !== true && toggled !== false,
        [styles.no]: toggled === false
      })}
    >
      <div className={styles.toggle} onClick={toggle(true)}>
        Yes
      </div>
      {maybe && (
        <div className={styles.toggle} onClick={toggle(null)}>
          Maybe
        </div>
      )}
      <div className={styles.toggle} onClick={toggle(false)}>
        No
      </div>
    </div>
  )

  function toggle (value) {
    return () => onToggle(value)
  }
}
