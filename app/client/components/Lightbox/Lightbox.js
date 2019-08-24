import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Controls from './Controls'
import styles from './Lightbox.css'

export default function Lightbox ({
  photos,
  currentIndex,
  tab,
  onPrev,
  onNext,
  onClose
}) {
  const photo = photos[currentIndex]
  const src = `/image/${tab.toLowerCase()}/${photo.id}`

  return (
    <div className={styles.root}>
      <div className={styles.backdrop} onClick={onClose} />
      <Header onClose={onClose} />
      <Controls
        hasPrev={currentIndex > 0}
        hasNext={currentIndex < photos.length - 1}
        onPrev={onPrev}
        onNext={onNext}
      />
      <img src={src} className={styles.image} />
      <Footer
        photo={photo}
        official={tab === 'OFFICIAL'}
        src={src}
        currentIndex={currentIndex}
        totalPhotos={photos.length}
      />
    </div>
  )
}
