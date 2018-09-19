import React, { Component } from 'react'
import { mapValues, lowerCase, upperFirst, map, sum, round } from 'lodash-es'
import PieChart from 'react-minimal-pie-chart'
import Select from '../../components/Select'
import Nope from '../../components/Nope'
import styles from './UsersSummary.css'

const COLORS = [
  '#efaa5c',
  '#515b6b',
  '#91d59a',
  '#d56062',
  '#6d85e9',
  '#cdd7e2'
]

const METRICS = ['invitedByGroup', 'attendingByAge', 'attendance']

export default class UsersSummary extends Component {
  state = {
    type: 'reception',
    metric: METRICS[0]
  }

  render () {
    const { type, metric } = this.state
    const breakdown = getBreakdown(this.props.users)
    const data = breakdown[type][metric] || []

    return (
      <div className={styles.container}>
        <div className={styles.selects}>
          <Select onChange={this.select('metric')} value={metric}>
            {METRICS.map(metric => (
              <option value={metric} key={metric}>
                {upperFirst(lowerCase(metric))}
              </option>
            ))}
          </Select>
          <Select onChange={this.select('type')} value={type}>
            <option value='reception'>Reception</option>
            <option value='evening'>Evening</option>
          </Select>
        </div>
        <Chart data={data} />
      </div>
    )
  }

  select (attr) {
    return e => {
      this.setState({
        [attr]: e.target.value
      })
    }
  }
}

function Chart ({ data }) {
  if (!data.length) {
    return <Nope>No matching guests</Nope>
  }

  const total = sum(map(data, 'value'))
  return (
    <div className={styles.chart}>
      <PieChart data={data} className={styles.pie} lineWidth={20} animate />
      <div className={styles.legend}>
        {data.map(({ title, value, color }) => (
          <div key={title} className={styles.legendItem}>
            <span style={{ backgroundColor: color }} />
            {upperFirst(lowerCase(title))} - {value} (
            {round(100 / total * value, 1)}
            %)
          </div>
        ))}
      </div>
    </div>
  )
}

// attending by adult/child
// invited by group
// yes/no/maybe

function getBreakdown (users) {
  const data = {
    reception: {},
    evening: {}
  }

  for (const user of users) {
    inc(user, 'invitedByGroup', user.group || '-', user.guests.length)

    for (const guest of user.guests) {
      inc(user, 'attendingByAge', guest.isChild ? 'child' : 'adult')
      inc(
        user,
        'attendance',
        guest.isAttending === true
          ? 'yes'
          : guest.isAttending === false ? 'no' : 'maybe'
      )
    }
  }

  return mapValues(data, toSeries)

  function inc (user, metric, series, by = 1) {
    const obj = user.eveningOnly ? data.evening : data.reception
    obj[metric] = obj[metric] || {}
    obj[metric][series] = obj[metric][series] || 0
    obj[metric][series] += by
  }
}

function toSeries (data) {
  return mapValues(data, series =>
    Object.keys(series).map((key, index) => ({
      title: key,
      value: series[key],
      color: COLORS[index]
    }))
  )
}
