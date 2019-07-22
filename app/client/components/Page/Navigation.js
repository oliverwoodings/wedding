import React from 'react'
import classnames from 'classnames'
import styles from './Navigation.css'

const ITEMS = {
  'Welcome!': '/',
  RSVP: '/rsvp',
  Logistics: '/logistics',
  Gifts: '/gifts',
  Photos: '/photos',
  Music: '/music'
}

const ITEMS_POST_WEDDING = {
  'Welcome!': '/',
  Gifts: '/gifts',
  Photos: '/photos'
}

export default function Navigation ({ path, isAdmin, weddingStatus }) {
  const items = { ...(weddingStatus === 'POST' ? ITEMS_POST_WEDDING : ITEMS) }
  if (isAdmin) {
    items['Admin'] = '/admin'
  }

  return (
    <div className={styles.container}>
      {Object.keys(items).map(name => {
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
