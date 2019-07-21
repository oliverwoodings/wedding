import React from 'react'
import classnames from 'classnames'
import styles from './Spinner.css'

export default function Spinner ({ className }) {
  return (
    <svg
      className={classnames(styles.spinner, className)}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <path
        d='M12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 Z M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z'
        opacity='.5'
      />
      <path d='M24,12 C24,5.372583 18.627417,0 12,0 L12,2 C17.5228475,2 22,6.4771525 22,12 L24,12 Z' />
    </svg>
  )
}
