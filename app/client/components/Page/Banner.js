import React, { Fragment } from 'react'
import { Title } from '../typography'
import styles from './Banner.css'

export default function Banner ({ minimalist }) {
  return (
    <div className={styles.banner}>
      <div className={styles.top}>
        {minimalist ? 'Oli & Danni - 27th July 2019' : 'We are getting married!'}
      </div>
      {!minimalist && (
        <Fragment>
          <Title className={styles.names}>Oli & Danni</Title>
          <div className={styles.bottom}>
            <Chevrons />
            <div className={styles.date}>27th July 2019</div>
            <Chevrons />
          </div>
        </Fragment>
      )}
    </div>
  )
}

function Chevrons () {
  return (
    <svg className={styles.chevrons} xmlns='http://www.w3.org/2000/svg' width='50.9px' height='35.4px' viewBox='0 0 50.9 35.4'>
      <polygon points='0,35.4 2.9,35.4 15.6,18.9 21.2,18.9 8.6,35.4 11.6,35.4 24.2,18.9 29.8,18.9 17.2,35.4 20.2,35.4 32.8,18.9 38.5,18.9 25.8,35.4 28.8,35.4 41.4,18.9 47.1,18.9 34.4,35.4 37.4,35.4 50.9,17.7 37.4,0 34.4,0 47.1,16.5 41.4,16.5 28.8,0 25.8,0 38.5,16.5 32.8,16.5 20.2,0 17.2,0 29.8,16.5 24.2,16.5 11.6,0 8.6,0 21.2,16.5 15.6,16.5 2.9,0 0,0 13.5,17.7' />
    </svg>
  )
}
