import React from 'react'
import { startCase } from 'lodash-es'
import YesNoToggle from '../../../components/YesNoToggle'
import DebouncedInput from '../../../components/DebouncedInput'
import Select from '../../../components/Select'
import withMutation from '../../../lib/withMutation'
import UpdateUserMutation from './UpdateUser.graphql'
import styles from './EditUser.css'

const GROUPS = [
  '',
  'oli_friends',
  'danni_friends',
  'ringmore',
  'band',
  'family',
  'family_friends'
]

function EditUser ({ user, updateUser, refetchUser }) {
  const { eveningOnly, address, group } = user
  return (
    <div>
      <div className={styles.section}>
        Group
        <Select
          className={styles.select}
          onChange={update('group', (e) => e.target.value)}
          value={group || ''}
        >
          {GROUPS.map((group) => (
            <option value={group} key={group}>
              {startCase(group) || '-'}
            </option>
          ))}
        </Select>
      </div>
      <div className={styles.section}>
        Evening only?
        <YesNoToggle
          toggled={eveningOnly}
          onToggle={update('eveningOnly')}
          className={styles.evening}
        />
      </div>
      <div className={styles.section}>
        Address
        <DebouncedInput
          initialValue={address}
          onChange={(value) => updateUser.execute({
            userId: user.id,
            user: {
              address: value
            }
          })}
        >
          {(props) => (
            <textarea
              {...props}
              className={styles.address}
            />
          )}
        </DebouncedInput>
      </div>
    </div>
  )

  function update (attribute, getValue) {
    return (value) => {
      if (getValue) {
        value = getValue(value)
      }

      updateUser.execute({
        userId: user.id,
        user: {
          [attribute]: value
        }
      }).then(refetchUser)
    }
  }
}

export default withMutation(UpdateUserMutation, { name: 'updateUser' })(EditUser)
