import React from 'react'
import { sortBy } from 'lodash-es'
import formatDuration from 'format-duration'
import Image from '../../components/Image'
import styles from './Track.css'

export default function Track ({ track, playTrack }) {
  const { id, name, artists, album, durationMs } = track
  const image = sortBy(album.images, 'width')[0]
  return (
    <div
      key={id}
      onClick={playTrack}
      className={styles.track}
    >
      <Image className={styles.image} src={image.url} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.subtext}>
          <div className={styles.artist}>{artists[0].name}</div>
          •
          <div className={styles.album}>{album.name}</div>
        </div>
      </div>
      <div className={styles.duration}>{formatDuration(durationMs)}</div>
    </div>
  )
}
