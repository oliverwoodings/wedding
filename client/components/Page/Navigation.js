import React from 'react'
import styles from './Navigation.css'

const ITEMS = {
  'Welcome!': '/',
  'RSVP': '/rsvp',
  'The Big Day': '/plan',
  'Accomodation & Transport': '/logistics',
  'Photos': '/photos',
  'Music': '/music',
  'FAQs': '/faqs'
}

export default function Navigation () {
  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {Object.keys(ITEMS).map((name) => (
          <a href={ITEMS[name]} key={name} className={styles.item}>{name}</a>
        ))}
      </div>
    </div>
  )
}
