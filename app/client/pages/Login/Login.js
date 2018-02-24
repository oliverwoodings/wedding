import React from 'react'
import classnames from 'classnames'
import PageBackground from '../../components/PageBackground'
import PageTitle from '../../components/PageTitle'
import withDevice from '../../lib/withDevice'
import styles from './Login.css'

function Login ({ device }) {
  return (
    <div className={classnames(styles.page, styles[device])}>
      <PageBackground image='church' />
      <PageTitle />
      <div className={styles.loginBox}>
        <input
          className={styles.input}
          type='text'
          placeholder='Invite code or email address'
        />
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={styles.action}>
          <polygon points="72.2,50.2 48.7,73.7 50.2,75.3 76.4,49.1 50.2,22.9 48.7,24.5 72.2,48 18.5,48 18.5,50.2 "/>
        </svg>
      </div>
    </div>
  )
}

export default withDevice()(Login)
