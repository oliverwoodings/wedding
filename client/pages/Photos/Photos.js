import React from 'react'
import classnames from 'classnames'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import withDevice from '../../lib/withDevice'
import styles from './Photos.css'

function Photos ({ device }) {
  return (
    <PageBody
      title='Photos'
      prev='/logistics'
      next='/music'
      className={classnames(styles.root, styles[device])}
    >
      <P>Our photographer for the day is the fabulous <Link href='http://lyndseychallis.com/'>Lyndsey Challis</Link>. All the photos she takes will be available here after the wedding (we will email you once they are available). If you fancy sneak peak of her work, check out this incredible photo of Mabel!</P>
      <img src='/static/images/mabel.jpg' className={styles.mabel} />
      <P>As everyone knows, some of the best in-the-moment wedding photos are the amateur ones taken by you, the guests. We don't want to miss a single moment, so from the morning of the wedding onwards we would love for you to come back to this page and upload any photos you've taken so that everyone can see them!</P>
    </PageBody>
  )
}

export default withDevice()(Photos)
