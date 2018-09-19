import React from 'react'
import compose from 'compose-function'
import Button from '../../../components/Button'
import withMutation from '../../../lib/withMutation'
import RemoveUserMutation from './RemoveUser.graphql'
import AddGuestMutation from './AddGuest.graphql'
import styles from './UserControls.css'

function UserControls ({ userId, refetchUser, addGuest, removeUser, onRemove }) {
  return (
    <div className={styles.controls}>
      <Button
        onClick={() =>
          addGuest
            .execute({
              userId,
              guest: {
                firstName: 'Joe',
                lastName: 'Bloggs'
              }
            })
            .then(refetchUser)
        }
      >
        Add guest
      </Button>
      <Button
        onClick={() =>
          removeUser
            .execute({
              userId
            })
            .then(onRemove)
            .then(refetchUser)
        }
      >
        Delete invite
      </Button>
    </div>
  )
}

export default compose(
  withMutation(AddGuestMutation, { name: 'addGuest' }),
  withMutation(RemoveUserMutation, { name: 'removeUser' })
)(UserControls)
