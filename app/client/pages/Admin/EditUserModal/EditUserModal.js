import React from 'react'
import classnames from 'classnames'
import Modal from '../../../components/Modal'
import Guest from '../../RSVP/Guest'
import AddGuest from './AddGuest'
import EditUser from './EditUser'
import styles from './EditUserModal.css'

export default function EditUserModal ({ user, onClose, refetchUser }) {
  return (
    <Modal title={`Edit invite - ${user.code}`} onClose={onClose}>
      <div className={classnames(styles.guests, {
        [styles.multiGuests]: user.guests.length > 1
      })}>
        {user.guests.map((guest) => (
          <Guest
            fullControl
            userId={user.id}
            guest={guest}
            key={`guest-${guest.id}`}
            refetchUser={refetchUser}
          />
        ))}
      </div>
      <AddGuest userId={user.id} refetchUser={refetchUser} />
      <EditUser user={user} refetchUser={refetchUser} />
    </Modal>
  )
}
