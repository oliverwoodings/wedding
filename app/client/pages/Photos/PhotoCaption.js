import React from 'react'
import hello from '../../lib/hello'
import styles from './PhotoCaption.css'

export default function PhotoCaption ({ currentView }) {
  return (
    <div>
      <Uploader
        uploader={currentView.uploader}
        official={currentView.official}
      />
      <Download src={currentView.src} name={currentView.name} />
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
  const url = src.download || src.regular
  return (
    <a className={styles.download} href={url} download={name} target='_blank'>
      Click here to download
    </a>
  )
}
