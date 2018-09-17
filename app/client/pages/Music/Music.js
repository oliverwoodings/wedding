import React from 'react'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import SearchSpotify from './SearchSpotify'
import styles from './Music.css'

export default function Music () {
  return (
    <PageBody title='Music' prev='/photos' className={styles.body}>
      <P className={styles.p}>
        The fantastic <Link href='http://intuxicated.co.uk'>Intuxicated</Link> will be entertaining us with live music throughout the evening. For the rest of the day (and night!), we need your help! Give us a hand by adding your favourite songs to our Spotify playlist:
      </P>
      <SearchSpotify />
      <P className={styles.playlistLink}>
        Wanna check out what's already been added? Follow the playlist on <Link href='https://open.spotify.com/playlist/7ECCTRm37FPMkOMJ5nNvmr'>Spotify</Link>.
      </P>
    </PageBody>
  )
}
