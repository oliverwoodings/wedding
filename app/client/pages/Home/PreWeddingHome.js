import React from 'react'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import Button from '../../components/Button'
import InviteType from '../../components/InviteType'
import Image from '../../components/Image'
import styles from './Home.css'

export default function PreWeddingHome ({ user }) {
  return (
    <PageBody title={`Hello ${hello(user.guests)}!`} className={styles.home}>
      {}
      <P>
        You are invited to join us at our wedding on the 27th of July 2019! The
        big day will be taking place in the lovely village of{' '}
        <Link
          href='https://www.google.com/maps/d/viewer?mid=1gTwUgiOVTc5bIdy9KYu6L5j9mgqLgfbx'
          target='_blank'
        >
          Ringmore, South Devon
        </Link>
        .
      </P>
      <Image src='/static/images/us.jpg' />
      <InviteType eveningOnly={user.eveningOnly} />
      <P>
        This website is your personal guide and planning tool! You can use it to{' '}
        <Link href='/rsvp'>RSVP</Link>, find{' '}
        <Link href='/logistics'>places to stay</Link> and even{' '}
        <Link href='/music'>suggest songs</Link> that we should play at the
        party! From time to time we might email you with updates and more
        details on the plan for the big day.
      </P>
      <P>
        If you have any questions, please don't hesitate to get in contact via{' '}
        <Link href='mailto:hello@danniandoli.wedding'>email</Link> or any other
        method you prefer.
      </P>
      <Button mega href='/rsvp' className={styles.letsGo}>
        Let's get started!
      </Button>
    </PageBody>
  )
}
