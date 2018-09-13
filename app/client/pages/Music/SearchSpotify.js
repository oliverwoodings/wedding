import React, { Component } from 'react'
import { debounce, get } from 'lodash-es'
import createPlayer from 'web-audio-player'
import withQuery from '../../lib/withQuery'
import Spinner from '../../components/Spinner'
import Track from './Track'
import SearchSpotifyQuery from './SearchSpotify.graphql'
import styles from './SearchSpotify.css'

class SearchSpotify extends Component {
  state = {
    query: ''
  }

  debouncedSearch = debounce(this.props.searchSpotify.execute, 300)

  componentDidMount () {
    this.input.focus()
  }

  render () {
    const { user, searchSpotify } = this.props
    return (
      <div className={styles.root}>
        <input
          onChange={::this.onSearch}
          value={this.state.query}
          className={styles.input}
          placeholder='Search for an artist, song or album'
          ref={(node) => { this.input = node }}
        />
        {this.renderTracks()}
      </div>
    )
  }

  renderTracks () {
    const { searchSpotify } = this.props
    const { isPending, hasExecuted, lastVariables } = searchSpotify
    const hasQuery = !!this.state.query
    const hadQuery = !!lastVariables.query
    const tracks = get(searchSpotify, 'data.tracks', [])

    if (!tracks.length) {
      if (hasQuery && (isPending || (!hasExecuted && hasQuery) || (!hadQuery && hasQuery))) {
        return <div className={styles.loading}><Spinner /></div>
      } else if (hadQuery && searchSpotify.hasExecuted) {
        return <div className={styles.noMatch}>No match</div>
      }
    }

    return tracks.map((track) => (
      <Track
        key={track.id}
        track={track}
        playTrack={() => this.playTrack(track)}
      />
    ))
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
})(SearchSpotify)
