import React from 'react'
import hello from '../../lib/hello'
import PageBody from '../../components/PageBody'

export default function Home ({ user }) {
  return <PageBody title={hello(user.guests)} />
}
