import React from 'react'
import { startCase } from 'lodash-es'
import hello from '../../lib/hello'
import Table from '../../components/Table'

export default function UserTable ({ users, onClickRow }) {
  return (
    <Table columns={['Guests', 'Type', 'Group']} data={users}>
      {({ guests, eveningOnly, group, id }) => (
        <tr onClick={() => onClickRow(id)} key={`guest-${id}`}>
          <td>{hello(guests)}</td>
          <td>{eveningOnly ? 'Evening' : 'Reception'}</td>
          <td>{startCase(group) || '–'}</td>
        </tr>
      )}
    </Table>
  )
}
