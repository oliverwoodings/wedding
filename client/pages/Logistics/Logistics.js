import React from 'react'
import PageBody from '../../components/PageBody'
import { Paragraph, Header, Link, Strong } from '../../components/typography'
import styles from './Logistics.css'

export default function Logistics () {
  return (
    <PageBody title='Logistics'>
      <Header>Getting to the area</Header>
      <Paragraph>The ceremony, reception and evening party will all be taking place in the village of Ringmore in South Devon. A car or taxi is absolutely necessary for getting around once you are in the area; there is a bus, but it only comes once a week!</Paragraph>
      <Paragraph>The nearest mainline train stations are Ivybridge, Totnes, Plymouth and Exeter, all of which have direct trains from London. It is a good idea to book your onward taxi in advance (there is no Uber down here!).</Paragraph>
      <Header>Accomodation</Header>
      <Paragraph>Ringmore itself has very limited accomodation, so we advise looking slightly further afield. The villages/towns of Challaborough, Kingston, Modbury, Bigbury and St. Ann's Chapel are all within a 10 minute drive. If you are looking for a larger town to base yourself in then Kingsbridge or Ivybridge are both lovely.</Paragraph>
      <Paragraph>The nearest static caravan site can be found in <Link href='http://www.parkdeanholidays.co.uk/devon-holidays/challaborough-bay/challaborough-bay-holiday-park.htm'>Challaborough Park Dean</Link> (10 minute walk to Ringmore), while the nearest camping and caraving ground is <Link href='http://www.pennymoor-camping.co.uk/'>Pennymoor</Link> in Modbury.</Paragraph>
      <Header>On the day</Header>
      <Paragraph>We would love for you to join us from <Strong>7pm</Strong> for our <Strong>evening party</Strong> in Mandeva Field, Ringmore.</Paragraph>
      <Paragraph>Parking will be available in a nearby field in Ringmore. We'll update you once we have a location confirmed! There will also be signage on the day. Please <Strong>do not</Strong> use the pub car park (opposite the church) or the National Trust car park in the village.</Paragraph>
      <Paragraph>All activities for the day are based within Ringmore in easy walking distance, so no need to worry about taxis to the reception!</Paragraph>
    </PageBody>
  )
}
