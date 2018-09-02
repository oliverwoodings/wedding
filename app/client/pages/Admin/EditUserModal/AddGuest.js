import React from 'react'
import Button from '../../../components/Button'
import withMutation from '../../../lib/withMutation'
import AddGuestMutation from './AddGuest.graphql'

function AddGuest ({ userId, refetchUser, mutation }) {
  return (
    <Button onClick={() => mutation.execute({
      userId,
      guest: {
        firstName: 'Joe',
        lastName: 'Bloggs'
      }
    }).then(refetchUser)}>
      Add guest
    </Button>
  )
}

export default withMutation(AddGuestMutation)(AddGuest)
