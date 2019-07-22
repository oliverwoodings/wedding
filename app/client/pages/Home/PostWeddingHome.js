import React from 'react'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import Image from '../../components/Image'
import styles from './Home.css'

export default function DuringWeddingHome ({ user, hasOfficialPhotos }) {
  return (
    <PageBody title={`Hello ${hello(user.guests)}!`} className={styles.home}>
      <P>
        Wow, what a day!! There are not enough words to describe how thankful we
        both are to everyone who made our wedding so special. So much effort
        went in from so many amazing people to create such a fantastic day.
      </P>
      <PhotoBlurb hasOfficialPhotos={hasOfficialPhotos} />
      <P>Thank you so much for coming, we hope to see you soon!</P>
      <Image src='/static/images/us-post-wedding.jpg' />
    </PageBody>
  )
}

function PhotoBlurb ({ hasOfficialPhotos }) {
  if (hasOfficialPhotos) {
    return (
      <P>
        Our fantastic wedding photographer,{' '}
        <Link href='http://lyndseychallis.com/'>Lyndsey Challis</Link>, has
        taken some incredible snaps of the day, which you can find over on the{' '}
        <Link href='/photos'>Photos</Link> page. We'd also love you to share any
        shots you may have got on your smartphone or camera with us and all the
        other guests! You can upload them by visiting the{' '}
        <Link href='/photos'>Photos</Link> page.
      </P>
    )
  }

  return (
    <P>
      Our fantastic wedding photographer,{' '}
      <Link href='http://lyndseychallis.com/'>Lyndsey Challis</Link>, is busy
      working through the mountain of snaps she took. We will let you know via
      email when they are ready to browse! In the meantime, we'd love you to
      share any shots you may have got on your smartphone or camera with us and
      all the other guests! You can upload them by visiting the{' '}
      <Link href='/photos'>Photos</Link> page.
    </P>
  )
}
