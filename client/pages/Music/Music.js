import React, { Component } from 'react'
import { debounce, get } from 'lodash-es'
import createPlayer from 'web-audio-player'
import withQuery from '../../lib/withQuery'
import PageBody from '../../components/PageBody'
import SearchSpotifyQuery from './SearchSpotify.graphql'

class Music extends Component {
  state = {
    query: ''
  }

  debouncedSearch = debounce(this.props.searchSpotify.execute, 300)

  render () {
    const { user, searchSpotify } = this.props
    const tracks = get(searchSpotify, 'data.tracks.items', [])
    return (
      <PageBody title='Music'>
        <input
          onChange={::this.onSearch}
          value={this.state.query}
        />
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => this.playTrack(track)}
          >
            {track.name}
          </div>
        ))}
      </PageBody>
    )
  }

  onSearch ({ target }) {
    this.setState({ query: target.value })
    this.debouncedSearch({
      query: target.value
    })
  }

  playTrack (track) {
    if (this.audio) {
      this.audio.stop()
    }
    const url = '/preview/' + encodeURIComponent(track.previewUrl)
    const audio = createPlayer(url)
    audio.on('load', () => {
      audio.play()
      audio.node.connect(audio.context.destination)
    })
    this.audio = audio
  }
}

export default withQuery(SearchSpotifyQuery, {
  lazy: true,
  name: 'searchSpotify'
})(Music)
