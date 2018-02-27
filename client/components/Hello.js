import React from 'react'
import { SubTitle } from './typography'

export default function Hello ({ guests }) {
  const names = guests.reduce((memo, { firstName }, i) => {
    if (!memo) {
      return firstName
    }
    if (i === guests.length - 1) {
      return `${memo} and ${firstName}`
    }
    return `${memo}, ${firstName}`
  }, '')
  return <SubTitle>Hello {names}!</SubTitle>
}
