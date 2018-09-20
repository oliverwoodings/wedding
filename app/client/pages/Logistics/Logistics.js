import React, { Fragment } from 'react'
import PageBody from '../../components/PageBody'
import {
  Paragraph as P,
  Header,
  Link,
  Strong
} from '../../components/typography'
import InviteType from '../../components/InviteType'
import styles from './Logistics.css'

const Block = ({ header, children }) => (
  <Fragment>
    <Header className={styles.header}>{header}</Header>
    {children}
  </Fragment>
)

export default function Logistics ({ user }) {
  return (
    <PageBody
      title='Logistics'
      className={styles.root}
      prev='/rsvp'
      next='/photos'
    >
      <Block header='Getting to the area'>
        <P>
          The big day will take place in the village of Ringmore in South Devon.
          A car or taxi is absolutely necessary for getting around once you are
          in the area; there is a bus, but it only comes once a week!
        </P>
        <P>
          The nearest mainline train stations are Ivybridge, Totnes, Plymouth
          and Exeter, all of which have direct trains from London. It is a good
          idea to book your onward taxi in advance (there is no Uber down
          here!).
        </P>
      </Block>
      <Block header='Accomodation'>
        <P>
          Ringmore itself has very limited accomodation, so we advise looking
          slightly further afield. The villages of Challaborough, Kingston,
          Modbury, Bigbury and St. Ann's Chapel are all within a 10 minute
          drive. If you are looking for a larger town to base yourself in then
          Kingsbridge or Ivybridge are both lovely. You can find holiday
          cottages, BnBs and hotels in all of these places via websites such as{' '}
          <Link href='https://www.airbnb.co.uk/c/owoodings'>Airbnb</Link> and{' '}
          <Link href='https://www.booking.com/'>Booking.com</Link>.
        </P>
        <P>
          The nearest static caravan holiday park can be found in{' '}
          <Link href='http://www.parkdeanholidays.co.uk/devon-holidays/challaborough-bay/challaborough-bay-holiday-park.htm'>
            Challaborough Park Dean
          </Link>{' '}
          (10 minute walk to Ringmore), while the nearest camping and caraving
          ground is{' '}
          <Link href='http://www.pennymoor-camping.co.uk/'>Pennymoor</Link> in
          Modbury.
        </P>
      </Block>
      <Block header='On the day'>
        <InviteType eveningOnly={user.eveningOnly} />
        <P>
          Parking will be available in a nearby field in Ringmore. We'll update
          you once we have a location confirmed! There will also be signage on
          the day. Please <Strong>do not</Strong> use the pub car park (opposite
          the church) or the National Trust car park in the village.
        </P>
        {!user.eveningOnly && (
          <P>
            All activities for the day are based within Ringmore in easy walking
            distance, so no need to worry about taxis to the reception!
          </P>
        )}
      </Block>
      <Block header='Map'>
        <iframe
          src='https://www.google.com/maps/d/embed?mid=1gTwUgiOVTc5bIdy9KYu6L5j9mgqLgfbx'
          className={styles.map}
        />
      </Block>
    </PageBody>
  )
}
