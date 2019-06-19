import React, { Fragment } from 'react'
import { Paragraph as P, Link } from '../../components/typography'
import Image from '../../components/Image'

export default function PhotosBeforeWedding () {
  return (
    <Fragment>
      <P>
        Our photographer for the day is the fabulous{' '}
        <Link href='http://lyndseychallis.com/'>Lyndsey Challis</Link>. All the
        photos she takes will be available here after the wedding (we will email
        you once they are available). If you fancy sneak peak of her work, check
        out this incredible photo of Mabel!
      </P>
      <Image src='/static/images/mabel.jpg' />
      <P>
        As everyone knows, some of the best in-the-moment wedding photos are the
        amateur ones taken by you, the guests. We don't want to miss a single
        moment, so from the morning of the wedding onwards we would love for you
        to come back to this page and upload any photos you've taken so that
        everyone can see them!
      </P>
    </Fragment>
  )
}
