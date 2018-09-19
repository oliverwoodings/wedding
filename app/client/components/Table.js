import React from 'react'
import styles from './Table.css'

export default function Table ({ columns, data, children }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>{columns.map(column => <td key={column}>{column}</td>)}</tr>
      </thead>
      <tbody>{data.map(row => children(row))}</tbody>
    </table>
  )
}
