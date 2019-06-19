import React, { Component } from 'react'
import Pyramid from '@oliverwoodings/react-pyramid'
import withQuery from '../../lib/withQuery'
import Spinner from '../../components/Spinner'
import PhotosQuery from './Photos.graphql'
import styles from './PhotosAfterWedding.css'

class PhotosAfterWedding extends Component {
  render () {
    const { query } = this.props

    if (query.isPending) {
      return <Spinner />
    }

    const photos = query.data.photos.map(toGalleryImage)
    return (
      <div className={styles.root}>
        <Pyramid elements={photos} />
      </div>
    )
  }
}

export default withQuery(PhotosQuery)(PhotosAfterWedding)

function toGalleryImage (photo) {
  const { width, height, thumbnailLink } = photo
  return {
    src: '/thumbnail/' + encodeURIComponent(thumbnailLink),
    orgWidth: width,
    orgHeight: height
  }
}
