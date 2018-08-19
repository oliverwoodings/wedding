import React from 'react'
import classnames from 'classnames'
import withDevice from '../../lib/withDevice'
import PageBody from '../../components/PageBody'
import Guest from './Guest'
import styles from './RSVP.css'

function RSVP ({ user, refetchUser, device }) {
  return (
    <PageBody
      title='RSVP'
      className={classnames(styles.container, styles[device])}
    >
      {user.guests.map((guest, index) => (
        <Guest
          device={device}
          guest={guest}
          user={user}
          key={'guest' + guest.id}
          index={index}
          refetchUser={refetchUser}
        />
      ))}
    </PageBody>
  )
}

export default withDevice()(RSVP)
