import React from 'react'
import PageBody from '../../components/PageBody'
import PhotosBeforeWedding from './PhotosBeforeWedding'
import PhotosAfterWedding from './PhotosAfterWedding'
import styles from './Photos.css'

export default function Photos ({ weddingStatus, hasOfficialPhotos }) {
  if (weddingStatus === 'TODAY' || weddingStatus === 'POST') {
    return (
      <PageBody
        title='Photos'
        className={styles.afterWedding}
        bodyClassName={styles.bodyAfterWedding}
      >
        <PhotosAfterWedding hasOfficialPhotos={hasOfficialPhotos} />
      </PageBody>
    )
  }

  return (
    <PageBody
      title='Photos'
      prev='/gifts'
      next='/music'
      className={styles.beforeWedding}
    >
      <PhotosBeforeWedding />
    </PageBody>
  )
}
