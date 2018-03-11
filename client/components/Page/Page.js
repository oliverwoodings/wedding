import React from 'react'
import Banner from './Banner'
import { Body } from '../typography'
import HeaderBackground from './HeaderBackground'
import Navigation from './Navigation'
import styles from './Page.css'

export default function Page ({ children, minimalist }) {
  return (
    <Body className={styles.page}>
      <div className={styles.header}>
        <HeaderBackground image='church' />
        <Banner />
        {!minimalist && <Navigation />}
      </div>
      {children}
    </Body>
  )
}

