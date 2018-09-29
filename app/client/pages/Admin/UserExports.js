import React from 'react'
import csvLine from 'csv-line'
import CopyToClipboard from 'react-copy-to-clipboard'
import Button from '../../components/Button'
import download from '../../lib/download'
import styles from './UserExports.css'

export default function UserExport ({ users }) {
  const emails = users
    .map(({ email }) => email)
    .filter(Boolean)
    .join(' ')
  return (
    <div className={styles.exports}>
      <CopyToClipboard text={emails}>
        <Button secondary>Copy email list</Button>
      </CopyToClipboard>
      <Button secondary onClick={() => downloadInvites(users)}>
        Download invites
      </Button>
    </div>
  )
}

function downloadInvites (users) {
  const rows = [['Guests', 'Code', 'Group', 'Type', 'Address']]

  for (const user of users) {
    rows.push([
      user.guests
        .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
        .join(', '),
      user.code,
      user.group,
      user.eveningOnly ? 'Evening' : 'Reception',
      (user.address || 'Unknown').replace(/\n/g, ', ')
    ])
  }

  download('users.csv', rows.map(csvLine.encode).join('\n'))
}
