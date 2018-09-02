import React from 'react'
import { startCase } from 'lodash-es'
import hello from '../../lib/hello'
import styles from './UsersTable.css'

export default function UserTable ({ users, onClickRow }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <td>Guests</td>
          <td>Type</td>
          <td>Group</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <Row
            {...user}
            key={user.code}
            onClick={() => onClickRow(user)}
          />
        ))}
      </tbody>
    </table>
  )
}

function Row ({ guests, eveningOnly, group, onClick }) {
  return (
    <tr className={styles.row} onClick={onClick}>
      <td>{hello(guests)}</td>
      <td>{eveningOnly ? 'Evening' : 'Reception'}</td>
      <td>{startCase(group) || '–'}</td>
    </tr>
  )
}
