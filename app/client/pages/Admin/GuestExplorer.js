import React, { Component, Fragment } from 'react'
import { flatten, map, keys, values, forEach } from 'lodash-es'
import Select from '../../components/Select'
import Table from '../../components/Table'
import Nope from '../../components/Nope'
import styles from './GuestExplorer.css'

const VIEWS = [{
  name: 'Dietary requirements',
  filter: (guest) => guest.hasDietaryRequirements && guest.isAttending,
  columns: {
    'Requirement': (guest) => guest.dietaryRequirements
  }
}, {
  name: 'Attending',
  filter: (guest) => guest.isAttending
}, {
  name: 'Might attend',
  filter: (guest) => guest.isAttending === null
}, {
  name: 'Not attending',
  filter: (guest) => guest.isAttending === false
}, {
  name: 'Children',
  filter: (guest) => guest.isChild
}, {
  name: 'Not signed up',
  filter: (guest) => guest.user.new
}]

export default class GuestExplorer extends Component {
  state = {
    viewIndex: 0
  }

  render () {
    const view = VIEWS[this.state.viewIndex]
  
    const data = flatten(map(this.props.users, (user) => (
      user.guests.map((guest) => ({
        ...guest,
        user
      }))
    ))).filter(view.filter)
    const columns = ['Guest', 'Type']
    const renderers = [
      ({ firstName, lastName }) => `${firstName} ${lastName}`,
      (guest) => guest.user.eveningOnly ? 'Evening' : 'Reception'
    ]

    forEach(view.columns, (render, name) => {
      columns.push(name)
      renderers.push(render)
    })

    return (
      <Fragment>
        <Select
          value={this.state.viewIndex}
          onChange={(e) => this.setState({
            viewIndex: e.target.value
          })}
          className={styles.select}
        >
          {map(VIEWS, ({ name }, i) => (
            <option key={name} value={i}>{name}</option>
          ))}
        </Select>
        {data.length ? <Table columns={columns} data={data}>
          {(guest) => (
            <tr key={`guest-${guest.id}`}>
              {renderers.map((render, i) => (
                <td key={`column-${i}`}>{render(guest)}</td>
              ))}
            </tr>
          )}
        </Table> : <Nope>No matching users</Nope>}
      </Fragment>
    )
  }
}
