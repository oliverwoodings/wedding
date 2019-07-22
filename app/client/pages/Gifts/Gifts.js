import React from 'react'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import Button from '../../components/Button'
import styles from './Gifts.css'

export default function Gifts ({ weddingStatus }) {
  return (
    <PageBody
      title='Gifts'
      prev={weddingStatus !== 'POST' && '/logistics'}
      next={weddingStatus !== 'POST' && '/photos'}
      className={styles.root}
    >
      <P>
        We are delighted that you are able to celebrate our wedding with us!
        Many of you have kindly asked to see a wedding gift list. We feel that
        you being here is more than enough and when we started looking at the
        services on offer we were hugely put off by their materialistic nature.
      </P>
      <P>
        We are lucky enough to have everything we need in our home, however
        neither of us have ever done much travelling, so we are planning to go
        to Cuba next year for our honeymoon. If you would like to help us create
        some amazing memories, there is a button below where you can securely
        add to our honeymoon pot.
      </P>
      <Button
        href='https://paypal.me/pools/c/8dYUdRlErM'
        className={styles.paypalButton}
        target='_blank'
      >
        <img src='/static/images/paypal.png' />
      </Button>
      <P className={styles.disclaimer}>
        The button above links to a secure PayPal Pool, which allows you to put
        money in our honeymoon pot with a message. Nobody else except for us can
        see the donations, there are no fees for you or us, and the money
        immediately goes into our PayPal account (which we regularly transfer to
        our bank account). If you would rather not use PayPal, drop us an{' '}
        <Link href='mailto:hello@danniandoli.wedding'>email</Link> and we can
        send you our bank details.
      </P>
    </PageBody>
  )
}
