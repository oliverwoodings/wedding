import React from 'react'
import classnames from 'classnames'
import withMutation from '../../lib/withMutation'
import { Header } from '../../components/typography'
import YesNoToggle from '../../components/YesNoToggle'
import DietaryRequirements from './DietaryRequirements'
import UpdateGuestMutation from './UpdateGuest.graphql'
import styles from './Guest.css'

function Guest ({ guest, index, refetchUser, updateGuest, device }) {
  const {
    id,
    firstName,
    lastName,
    hasDietaryRequirements,
    dietaryRequirements
  } = guest

  return (
    <div className={classnames(styles.guest, styles[device])}>
      <Header>{firstName} {lastName}</Header>
      <div className={styles.section}>
        Attending? {toggle('isAttending', true)}
      </div>
      <div className={styles.section}>
        Dietary requirements? {toggle('hasDietaryRequirements', false, { dietaryRequirements: '' })}
      </div>
      {hasDietaryRequirements && <DietaryRequirements
        initialValue={dietaryRequirements}
        onChange={(value) => updateGuest.execute({
          guestId: id,
          guest: {
            dietaryRequirements: value
          }
        }).then(refetchUser)}
      />}
    </div>
  )

  function toggle (name, maybe, additionalFields = {}) {
    return (
      <YesNoToggle
        className={styles.input}
        toggled={guest[name]}
        maybe={maybe}
        onToggle={(toggled) => updateGuest.execute({
          guestId: id,
          guest: {
            [name]: toggled,
            ...additionalFields
          }
        }).then(refetchUser)}
      />
    )
  }
}

export default withMutation(UpdateGuestMutation, { name: 'updateGuest' })(Guest)
