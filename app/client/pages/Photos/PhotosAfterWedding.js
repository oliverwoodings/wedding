import React, { Component } from 'react'
import Pyramid from '@oliverwoodings/react-pyramid'
import Lightbox from 'fslightbox-react'
import withQuery from '../../lib/withQuery'
import Spinner from '../../components/Spinner'
import PhotoControls from './PhotoControls'
import PhotosQuery from './Photos.graphql'
import styles from './PhotosAfterWedding.css'

class PhotosAfterWedding extends Component {
  state = {
    showUploader: false,
    selectedTab: 'GUEST',
    selectedPhotoIndex: null
  }

  componentDidMount () {
    this.props.query.execute({
      type: this.state.selectedTab
    })
  }

  render () {
    return (
      <div className={styles.root}>
        <PhotoControls
          tab={this.state.selectedTab}
          onChangeTab={::this.onChangeTab}
          onClickUpload={::this.showUploader}
        />
        <div className={styles.gallery}>{this.renderGallery()}</div>
        {this.renderModal()}
      </div>
    )
  }

  renderGallery () {
    const { query } = this.props

    if (query.isPending || !query.data) {
      return <Spinner />
    }

    const photos = query.data.photos.map(toGalleryImage)

    return (
      <div className={styles.pyramid}>
        <Pyramid
          elements={photos}
          transition='all 150ms ease'
          onElementClick={::this.onPhotoClick}
        />
      </div>
    )
  }

  renderModal () {
    const { selectedPhotoIndex } = this.state
    if (selectedPhotoIndex === null) {
      return null
    }

    const { photos } = this.props.query.data
    const urls = photos.map(photo => photo.thumbnailLink)

    return (
      <Lightbox
        urls={urls}
        sourceIndex={selectedPhotoIndex}
        type='image'
        toggler
        onClose={::this.onCloseModal}
      />
    )
  }

  onChangeTab (tab) {
    this.setState({
      selectedTab: tab
    })
    this.props.query.execute({
      type: tab
    })
  }

  onPhotoClick (el, e, index) {
    this.setState({
      selectedPhotoIndex: index
    })
  }

  onCloseModal () {
    this.setState({
      selectedPhotoIndex: null
    })
  }

  showUploader () {
    this.setState({
      showUploader: true
    })
  }
}

export default withQuery(PhotosQuery, { lazy: true })(PhotosAfterWedding)

function toGalleryImage (photo) {
  const { width, height, thumbnailLink } = photo
  return {
    src: '/thumbnail/' + encodeURIComponent(thumbnailLink),
    orgWidth: width,
    orgHeight: height,
    foo: 'bar'
  }
}
