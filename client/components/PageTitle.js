import React from 'react'
import { SubTitle } from './typography'
import styles from './PageTitle.css'

export default function PageTitle ({ title }) {
  return (
    <SubTitle className={styles.pageTitle}>{title}</SubTitle>
  )
}
