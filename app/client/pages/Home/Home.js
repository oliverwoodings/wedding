import React from 'react'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Strong, Link } from '../../components/typography'
import Button from '../../components/Button'
import InviteType from '../../components/InviteType'
import Image from '../../components/Image'
import styles from './Home.css'

export default function Home ({ user }) {
  return (
    <PageBody title={`Hello ${hello(user.guests)}!`} className={styles.home}>
      <P>You are invited to join us at our wedding on the 27th of July 2019! The big day will be taking place in the lovely village of Ringmore, South Devon.</P>
      <Image src='/static/images/us.jpg' />
      <InviteType eveningOnly={user.eveningOnly} />
      <P>This website is your personal guide and planning tool! You can use it to <Link href='/rsvp'>RSVP</Link>, find <Link href='/logistics'>places to stay</Link> and even <Link href='/music'>suggest songs</Link> that we should play at the party! From time to time we might email you with updates and more details on the plan for the big day.</P>
      <P>If you have any questions, please don't hesitate to get in contact via Facebook, WhatsApp, <Link href='mailto:oliver.woodings@gmail.com'>email</Link> or any other method you prefer.</P>
      <Button mega href='/rsvp' className={styles.letsGo}>Let's get started!</Button>
    </PageBody>
  )
}
