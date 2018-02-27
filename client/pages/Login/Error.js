import React from 'react'
import { Strong } from '../../components/typography'
import styles from './Error.css'

export default function Error ({ children, error }) {
  if (!error && !children) {
    return null
  }

  return (
    <Strong className={styles.error}>
      {error ? formatError(error) : children}
    </Strong>
  )
}

function formatError (error) {
  switch (error.type) {
    case 'AUTHENTICATION_FAILURE':
      switch (error.data.status) {
        case 'INVALID_USER_ID':
          return 'Sorry, that code or email does not exist'
        case 'INVALID_PASSWORD':
          return 'Whoops! That password isn\'t correct'
      }
    default:
      return 'Sorry, something went wrong :('
  }
}
