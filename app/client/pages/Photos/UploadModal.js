import React, { Component } from 'react'
import classnames from 'classnames'
import Dropzone from 'react-dropzone-uploader'
import withDevice from '../../lib/withDevice'
import Button from '../../components/Button'
import Spinner from '../../components/Spinner'
import styles from './UploadModal.css'

class UploadModal extends Component {
  state = {
    uploading: false,
    files: []
  }

  render () {
    const { device, onClose } = this.props
    const { files, uploading } = this.state

    return (
      <div className={classnames(styles.root, styles[device])}>
        <div className={styles.backdrop} />
        <div className={styles.modal}>
          <Dropzone
            getUploadParams={() => ({
              url: '/image'
            })}
            accept='image/*'
            autoUpload={false}
            onChangeStatus={::this.onChangeStatus}
            inputContent={getDescription(device)}
            inputWithFilesContent='+ Add more photos'
          />
          <div className={styles.controls}>
            <Button
              onClick={::this.upload}
              disabled={uploading || !files.length}
            >
              {uploading ? <Spinner /> : 'Upload'}
            </Button>
            <Button onClick={onClose} secondary>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    )
  }

  onChangeStatus (file, status, files) {
    this.setState({
      files
    })
    const allUploaded = files.every(file => file.meta.status === 'done')
    if (allUploaded) {
      this.props.onUploaded({ fileCount: files.length })
    }
  }

  upload () {
    this.setState({
      uploading: true
    })
    for (const file of this.state.files) {
      file.restart()
    }
  }
}

export default withDevice()(UploadModal)

function getDescription (device) {
  if (device === 'mobile' || device === 'tablet') {
    return 'Click to select photos'
  }
  return 'Drag in photos or click to select'
}
