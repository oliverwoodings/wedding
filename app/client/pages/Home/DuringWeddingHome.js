import React from 'react'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import Button from '../../components/Button'
import InviteType from '../../components/InviteType'
import Image from '../../components/Image'
import styles from './Home.css'

export default function DuringWeddingHome ({ user }) {
  return (
    <PageBody title={`Hello ${hello(user.guests)}!`} className={styles.home}>
      <P>
        The big day is finally here! Looking for directions? You can find a
        printable map and a Google Maps link on the{' '}
        <Link href='/logistics'>Logistics</Link> page, as well as contact
        details for several taxi companies in the local area.
      </P>
      <P>
        Taken some good pictures already? Head over to the{' '}
        <Link href='/photos'>Photos</Link> page to share them with us!
      </P>
      <InviteType eveningOnly={user.eveningOnly} />
      <Image src='/static/images/us.jpg' />
      <Button mega href='/rsvp' className={styles.letsGo}>
        Let's get started!
      </Button>
    </PageBody>
  )
}
