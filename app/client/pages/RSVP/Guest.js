import React from 'react'
import compose from 'compose-function'
import classnames from 'classnames'
import withMutation from '../../lib/withMutation'
import { Header } from '../../components/typography'
import YesNoToggle from '../../components/YesNoToggle'
import DebouncedInput from '../../components/DebouncedInput'
import Button from '../../components/Button'
import UpdateGuestMutation from './UpdateGuest.graphql'
import RemoveGuestMutation from './RemoveGuest.graphql'
import styles from './Guest.css'

function Guest (props) {
  const {
    guest,
    refetchUser,
    updateGuest,
    className,
    fullControl,
    userId,
    removeGuest
  } = props

  const { id, hasDietaryRequirements } = guest

  return (
    <div className={classnames(styles.guest, className)}>
      <Header className={styles.header}>
        {textInput('firstName', true)} {textInput('lastName', true)}
      </Header>
      <Section>Attending? {toggle('isAttending', true)}</Section>
      {fullControl && <Section>Child? {toggle('isChild')}</Section>}
      <Section className={styles.diet}>
        Dietary requirements?{' '}
        {toggle('hasDietaryRequirements', false, { dietaryRequirements: '' })}
        {hasDietaryRequirements && textInput('dietaryRequirements')}
      </Section>
      {fullControl && (
        <Section>
          <Button secondary onClick={remove}>
            Remove guest
          </Button>
        </Section>
      )}
    </div>
  )

  function toggle (name, maybe, additionalFields = {}) {
    return (
      <YesNoToggle
        className={styles.input}
        toggled={guest[name]}
        maybe={maybe}
        onToggle={toggled =>
          updateGuest
            .execute({
              userId,
              guestId: id,
              guest: {
                [name]: toggled,
                ...additionalFields
              }
            })
            .then(refetchUser)
        }
      />
    )
  }

  function textInput (propName, requireFullControl) {
    if (!fullControl && requireFullControl) {
      return guest[propName]
    }

    return (
      <DebouncedInput
        initialValue={guest[propName]}
        onChange={value => {
          updateGuest
            .execute({
              userId,
              guestId: guest.id,
              guest: {
                [propName]: value
              }
            })
            .then(refetchUser)
        }}
      >
        {props => (
          <input
            type='text'
            className={styles.textInput}
            placeholder={
              propName === 'dietaryRequirements'
                ? 'What should we cater for?'
                : ''
            }
            {...props}
          />
        )}
      </DebouncedInput>
    )
  }

  function remove () {
    removeGuest
      .execute({
        guestId: id
      })
      .then(refetchUser)
  }
}

export default compose(
  withMutation(UpdateGuestMutation, { name: 'updateGuest' }),
  withMutation(RemoveGuestMutation, { name: 'removeGuest' })
)(Guest)

function Section ({ children, className }) {
  return <div className={classnames(styles.section, className)}>{children}</div>
}
