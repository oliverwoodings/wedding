import React, { Fragment } from 'react'
import PageBody from '../../components/PageBody'
import {
  Paragraph as P,
  Header,
  Link,
  Strong
} from '../../components/typography'
import InviteType from '../../components/InviteType'
import IfStatus from '../../components/IfStatus'
import styles from './Logistics.css'

const TAXIS = {
  'Kingsbridge & Salcombe': {
    'One 2 One Taxis': 'http://one2onetaxis500.co.uk/',
    'Coast 2 Coast Taxis':
      'http://www.southhams.com/directory/coast-2-coast-taxis-204.html',
    '24/7 Taxis Kingsbridge & Salcombe':
      'https://247-taxis-kingsbridge-salcombe.business.site/',
    'Totally Taxis Kingsbridge & Salcombe': 'http://www.totallytaxis.co.uk/',
    'Salcombe & District Taxis': 'http://www.salcombeanddistricttaxico.co.uk/',
    'In Hope Taxi (Hope Cove)': 'https://in-hope-taxi.business.site/'
  },
  Ivybridge: {
    'Ivy Cabs': 'https://www.cabs.com/cab/5358/ivy-cabs-ltd',
    'Countryside Cabs': 'https://countryside-cabs.business.site/',
    'Ivybridge Taxi': 'https://ivybridgetaxis.co.uk/'
  },
  'Modbury & Bigbury': {
    'Quo Vadis Taxi':
      'https://www.taxilocations.co.uk/taxi/1041206/quo-vadis-taxis',
    "John's 24hr Private Hire":
      "https://www.taxilocations.co.uk/taxi/1032141/john's-24hr-private-hire-taxi-service",
    'Mikes Cab': 'https://www.yell.com/biz/mikes-cab-kingsbridge-8635519/'
  }
}

const Block = ({ header, children }) => (
  <Fragment>
    <Header className={styles.header}>{header}</Header>
    {children}
  </Fragment>
)

export default function Logistics ({ user, weddingStatus }) {
  return (
    <PageBody
      title='Logistics'
      className={styles.root}
      prev='/rsvp'
      next='/gifts'
    >
      <IfStatus status={weddingStatus} pre>
        <Block header='Getting to the area'>
          <P>
            The big day will take place in the village of Ringmore in South
            Devon. A car or taxi is absolutely necessary for getting around once
            you are in the area; there is a bus, but it only comes once a week!
          </P>
          <P>
            The nearest mainline train stations are Ivybridge, Totnes, Plymouth
            and Exeter, all of which have direct trains from London. It is a
            good idea to book your onward taxi in advance (there is no Uber down
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
            cottages, BnBs and hotels in all of these places via websites such
            as <Link href='https://www.airbnb.co.uk/c/owoodings'>Airbnb</Link>{' '}
            and <Link href='https://www.booking.com/'>Booking.com</Link>.
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
      </IfStatus>
      <Block header='On the day'>
        <InviteType eveningOnly={user.eveningOnly} />
        <P>
          Parking is available in a field on the right as you come into the
          village, which you can see on the map below. There will also be
          signage on the day for each location. Please <Strong>do not</Strong>{' '}
          use the pub car park (opposite the church) or the National Trust car
          park in the village.
        </P>
        {!user.eveningOnly && (
          <P>
            All activities for the day are based within Ringmore in easy walking
            distance! The afternoon reception will be taking place in The
            Journey's End Inn, 100m down the hill from the church. We will be
            there until 6:30/7pm at which point we will move on further down the
            hill to the field for the evening party!
          </P>
        )}
      </Block>
      <Block header='Taxis'>
        <P>
          There are a limited number of taxi companies in the area. Advanced
          booking for getting to and from the wedding is{' '}
          <Strong>essential</Strong> - please do not rely on being able to ring
          up on the day! We've listed all companies we know of below.
        </P>
        <P className={styles.taxiText}>
          Mobile reception can be poor in the field, so you may want to arrange
          a precise collection time and location with your driver in advance,
          just in case he can't get hold of you. We would recommend meeting all
          taxis at the pub car park opposite the church. The evening activities
          will be winding down around 11:30pm.
        </P>
        {Object.entries(TAXIS).map(([location, companies]) => (
          <div key={location}>
            <Strong>{location}:</Strong>
            <ul>
              {Object.entries(companies).map(([name, url]) => (
                <li key={name}>
                  <Link href={url}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
