import React from 'react'
import { Paragraph as P, Strong } from './typography'

export default function InviteType ({ eveningOnly }) {
  if (eveningOnly) {
    return (
      <P>We would love for you to join us from <Strong>7pm</Strong> for our <Strong>evening party</Strong> in <Strong>Mandava Field, Ringmore</Strong>.</P>
    )
  }

  return <P>We hope you will be able to join us from <Strong>2pm</Strong>, starting at <Strong>All Hallows, Ringmore</Strong>.</P>
}
