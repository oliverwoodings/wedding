import React from 'react'
import PreWeddingHome from './PreWeddingHome'
import DuringWeddingHome from './DuringWeddingHome'
import PostWeddingHome from './PostWeddingHome'

export default function Home ({ user, weddingStatus }) {
  switch (weddingStatus) {
    case 'PRE':
      return <PreWeddingHome user={user} />
    case 'TODAY':
      return <DuringWeddingHome user={user} />
    case 'POST':
      return <PostWeddingHome user={user} />
  }
}
