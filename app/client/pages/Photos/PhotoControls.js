import React from 'react'
import classnames from 'classnames'
import Button from '../../components/Button'
import styles from './PhotoControls.css'

export default function PhotoControls ({ tab, onChangeTab, onClickUpload }) {
  return (
    <div className={styles.root}>
      <div className={classnames(styles.toggle, styles[tab.toLowerCase()])}>
        <div onClick={() => onChangeTab('OFFICIAL')}>Official</div>
        <div onClick={() => onChangeTab('GUEST')}>Guest</div>
      </div>
      <Button className={styles.upload} onClick={onClickUpload}>
        + Upload
      </Button>
    </div>
  )
}
