import React from 'react'
import classnames from 'classnames'
import styles from './Navigation.css'

const ITEMS = {
  'Welcome!': '/',
  'RSVP': '/rsvp',
  'Accomodation & Transport': '/logistics',
  'Photos': '/photos',
  'Music': '/music'
}

export default function Navigation ({ path }) {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {Object.keys(ITEMS).map((name) => {
          const isActive = path === ITEMS[name]
          return (
            <a
              href={isActive ? null : ITEMS[name]}
              key={name}
              className={classnames(styles.item, {
                [styles.activeItem]: isActive
              })}
            >
              {name}
            </a>
          )
        })}
      </div>
    </div>
  )
}
