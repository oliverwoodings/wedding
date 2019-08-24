import React from 'react'
import hello from '../../lib/hello'
import styles from './Footer.css'

export default function Footer ({
  photo,
  official,
  src,
  currentIndex,
  totalPhotos
}) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <Uploader uploader={photo.uploader} official={official} />
        <Download src={src} name={photo.name} />
      </div>
      <div className={styles.right}>
        {currentIndex + 1}/{totalPhotos}
      </div>
    </div>
  )
}

function Uploader ({ uploader, official }) {
  if (official) {
    return (
      <span className={styles.uploader}>
        Official photography by{' '}
        <a href='http://lyndseychallis.com/'>Lyndsey Challis</a>.
      </span>
    )
  }
  if (uploader) {
    return (
      <span className={styles.uploader}>
        Uploaded by {hello(uploader.guests)}.
      </span>
    )
  }
  return null
}

function Download ({ src, name }) {
  return (
    <a
      className={styles.download}
      href={src + '?download=1'}
      download={name}
      target='_blank'
    >
      Click here to download
    </a>
  )
}
