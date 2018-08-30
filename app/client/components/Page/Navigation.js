import React from 'react'
import classnames from 'classnames'
import styles from './Navigation.css'

const ITEMS = {
  'Welcome!': '/',
  'RSVP': '/rsvp',
  'Logistics': '/logistics',
  'Photos': '/photos',
  'Music': '/music'
}

export default function Navigation ({ path, isAdmin }) {
  const items = { ...ITEMS }
  if (isAdmin) {
    items['Admin'] = '/admin'
  }

  return (
    <div className={styles.container}>
      {Object.keys(items).map((name) => {
        const isActive = path === items[name]
        return (
          <a
            href={isActive ? null : items[name]}
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
  )
}
