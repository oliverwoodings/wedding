import React, { Fragment } from 'react'
import styles from './Controls.css'

export default function Controls ({ hasNext, hasPrev, onNext, onPrev }) {
  return (
    <Fragment>
      {hasPrev && (
        <svg viewBox='0 0 24 24' className={styles.prev} onClick={onPrev}>
          <path d='M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z' />
        </svg>
      )}
      {hasNext && (
        <svg viewBox='0 0 24 24' className={styles.next} onClick={onNext}>
          <path d='M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z' />
        </svg>
      )}
    </Fragment>
  )
}
