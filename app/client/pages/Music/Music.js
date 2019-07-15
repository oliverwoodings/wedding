import React from 'react'
import PageBody from '../../components/PageBody'
import { Paragraph as P, Link } from '../../components/typography'
import SearchSpotify from './SearchSpotify'
import styles from './Music.css'

export default function Music ({ acceptPlaylistSubmissions }) {
  return (
    <PageBody title='Music' prev='/photos' className={styles.body}>
      <P className={styles.p}>
        The fantastic <Link href='http://intuxicated.co.uk'>Intuxicated</Link>{' '}
        will be entertaining us with live music throughout the evening. For the
        rest of the day (and night!), we need your help! Give us a hand by
        adding your favourite songs to our Spotify playlist:
      </P>
      {acceptPlaylistSubmissions && <SearchSpotify />}
      <P className={styles.playlistLink}>
        {!acceptPlaylistSubmissions &&
          'Submissions for our wedding playlist are now closed while we prepare (and prune!!) it for the big day. '}
        Wanna check out what's already been added? Follow the playlist on{' '}
        <Link href='https://open.spotify.com/playlist/7ECCTRm37FPMkOMJ5nNvmr'>
          Spotify
        </Link>
        .
      </P>
    </PageBody>
  )
}
