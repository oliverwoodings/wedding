import React from 'react'
import classnames from 'classnames'
import styles from './PageBackground.css'

export default function PageBackground ({ image }) {
  return (
    <div className={styles.container}>
      <div className={classnames(styles.background, styles[image])} />
    </div>
  )
}

PageBackground.defaultProps = {
  image: 'church'
}

