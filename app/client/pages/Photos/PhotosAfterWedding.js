import React, { Component } from 'react'
import Pyramid from '@oliverwoodings/react-pyramid'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { toast } from 'react-toastify'
import withQuery from '../../lib/withQuery'
import Spinner from '../../components/Spinner'
import PhotoControls from './PhotoControls'
import PhotoCaption from './PhotoCaption'
import UploadModal from './UploadModal'
import PhotosQuery from './Photos.graphql'
import styles from './PhotosAfterWedding.css'

class PhotosAfterWedding extends Component {
  state = {
    showUploader: false,
    selectedTab: this.props.hasOfficialPhotos ? 'OFFICIAL' : 'GUEST',
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
          onClickUpload={::this.toggleUploader}
        />
        <div className={styles.gallery}>{this.renderGallery()}</div>
        <ModalGateway>{this.renderModal()}</ModalGateway>
        {this.renderUploader()}
      </div>
    )
  }

  renderUploader () {
    const { showUploader } = this.state
    if (!showUploader) {
      return null
    }

    return (
      <UploadModal
        onUploaded={::this.onUploaded}
        onClose={::this.toggleUploader}
      />
    )
  }

  renderGallery () {
    const { query } = this.props
    const { selectedTab } = this.state

    if (query.isPending || !query.data) {
      return <Spinner className={styles.loading} />
    }

    const photos = query.data.photos.map(photo => {
      const { width, height, id } = photo
      return {
        src: `/image/${selectedTab.toLowerCase()}/${id}`,
        orgWidth: width,
        orgHeight: height,
        foo: 'bar'
      }
    })

    if (photos.length === 0) {
      return (
        <div className={styles.noPhotos}>
          The official wedding photos are still being prepared. We'll let you
          know when they are available!
        </div>
      )
    }

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
    const { selectedPhotoIndex, selectedTab } = this.state
    if (selectedPhotoIndex === null) {
      return null
    }

    const { photos } = this.props.query.data
    const views = photos.map(photo => {
      const thumb = `/image/${selectedTab.toLowerCase()}/${photo.id}`
      return {
        name: photo.name,
        uploader: photo.uploader,
        official: selectedTab === 'OFFICIAL',
        width: photo.width,
        height: photo.height,
        src: {
          regular: thumb,
          fullscreen: thumb,
          thumbnail: thumb,
          download: thumb + '?download=1'
        }
      }
    })

    return (
      <Modal onClose={::this.onCloseModal}>
        <Carousel
          views={views}
          currentIndex={selectedPhotoIndex}
          components={{ FooterCaption: PhotoCaption }}
        />
      </Modal>
    )
  }

  onUploaded ({ fileCount }) {
    const { query } = this.props
    const { selectedTab } = this.state
    query.execute({ type: selectedTab })
    this.setState({
      showUploader: false
    })
    toast(`${fileCount} photo${fileCount > 1 ? 's' : ''} uploaded!`)
  }

  onChangeTab (tab) {
    if (tab === this.state.selectedTab) return

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

  toggleUploader () {
    this.setState({
      showUploader: !this.state.showUploader
    })
  }
}

export default withQuery(PhotosQuery, { lazy: true })(PhotosAfterWedding)
