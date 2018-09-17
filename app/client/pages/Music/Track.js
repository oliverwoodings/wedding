import React from 'react'
import classnames from 'classnames'
import { sortBy } from 'lodash-es'
import formatDuration from 'format-duration'
import Image from '../../components/Image'
import Button from '../../components/Button'
import styles from './Track.css'

export default function Track (props) {
  const {
    track,
    startPlaying,
    stopPlaying,
    isActive,
    onActivate,
    isPlaying,
    addToPlaylist,
    addingToPlaylist
  } = props
  const { id, name, artists, album, durationMs } = track
  const image = sortBy(album.images, 'width')[0]

  return (
    <div className={classnames(styles.track, {
      [styles.isActive]: isActive
    })}>
      <div className={styles.body} onClick={onActivate}>
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
      {isActive && <TrackOverlay
        track={track}
        startPlaying={startPlaying}
        stopPlaying={stopPlaying}
        isPlaying={isPlaying}
        addToPlaylist={addToPlaylist}
        addingToPlaylist={addingToPlaylist}
      />}
    </div>
  )
}

function TrackOverlay (props) {
  const {
    track,
    startPlaying,
    stopPlaying,
    isPlaying,
    addToPlaylist,
    addingToPlaylist
  } = props
  const { isInPlaylist, previewUrl } = track
  return (
    <div className={styles.overlay}>
      {previewUrl && <Button
        secondary
        inverted
        className={styles.button}
        onClick={isPlaying ? stopPlaying : startPlaying}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </Button>}
      <Button
        secondary
        inverted
        className={styles.button}
        disabled={isInPlaylist || addingToPlaylist}
        onClick={addToPlaylist}
      >
        {isInPlaylist ? 'Added to playlist' : 'Add to playlist'}
      </Button>
    </div>
  )
}
