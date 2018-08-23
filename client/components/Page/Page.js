import React from 'react'
import Banner from './Banner'
import { Body } from '../typography'
import HeaderBackground from './HeaderBackground'
import Navigation from './Navigation'
import Footer from './Footer'
import styles from './Page.css'

export default function Page ({ children, minimalist, nav, path }) {
  return (
    <Body className={styles.page}>
      <div className={styles.header}>
        <HeaderBackground image='church' />
        <Banner minimalist={minimalist} />
        {nav && <Navigation path={path} />}
      </div>
      {children}
      <Footer />
    </Body>
  )
}

