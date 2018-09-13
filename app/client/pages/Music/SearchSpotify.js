import React, { Component } from 'react'
import { debounce, get } from 'lodash-es'
import createPlayer from 'web-audio-player'
import compose from 'compose-function'
import withQuery from '../../lib/withQuery'
import withMutation from '../../lib/withMutation'
import Spinner from '../../components/Spinner'
import Track from './Track'
import SearchSpotifyQuery from './SearchSpotify.graphql'
import AddToPlaylistMutation from './AddToPlaylist.graphql'
import styles from './SearchSpotify.css'

class SearchSpotify extends Component {
  state = {
    query: '',
    activeTrackId: null,
    isPlaying: false
  }

  debouncedSearch = debounce(this.props.searchSpotify.execute, 300)

  componentDidMount () {
    this.input.focus()
  }

  componentWillUnmount () {
    this.stopPlaying()
  }

  render () {
    const { user, searchSpotify } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.inputContainer}>
          <input
            onChange={::this.onSearch}
            value={this.state.query}
            className={styles.input}
            placeholder='Search for an artist, song or album'
            ref={(node) => { this.input = node }}
          />
        </div>
        {this.renderTracks()}
      </div>
    )
  }

  renderTracks () {
    const { searchSpotify } = this.props
    const { addingToPlaylist, activeTrackId, isPlaying } = this.state
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
        isPlaying={isPlaying}
        startPlaying={() => this.startPlaying(track)}
        stopPlaying={() => this.stopPlaying()}
        isActive={activeTrackId === track.id}
        onActivate={() => this.setActiveTrack(track)}
        addToPlaylist={() => this.addToPlaylist(track.id)}
        addingToPlaylist={addingToPlaylist}
      />
    ))
  }

  async addToPlaylist (trackId) {
    const { addToPlaylist, searchSpotify } = this.props
    this.setState({
      addingToPlaylist: true
    })
    try {
      await addToPlaylist.execute({ trackId })
      await searchSpotify.execute({ query: this.state.query })
    } catch (e) {
      console.error(e)
    }
    this.setState({
      addingToPlaylist: false
    })
  }

  onSearch ({ target }) {
    this.setState({ query: target.value })
    this.debouncedSearch({
      query: target.value
    })
  }

  setActiveTrack (track) {
    const { activeTrackId, isPlaying } = this.state
    if (track.id !== activeTrackId) {
      if (isPlaying) {
        this.startPlaying(track)
      }
      this.setState({
        activeTrackId: track.id
      })
    }
  }

  startPlaying (track) {
    this.stopPlaying()
    const url = '/preview/' + encodeURIComponent(track.previewUrl)
    const audio = createPlayer(url)
    audio.on('load', () => {
      audio.play()
      audio.node.connect(audio.context.destination)
    })
    this.audio = audio
    this.setState({
      isPlaying: true
    })
  }

  stopPlaying () {
    if (this.audio) {
      this.audio.stop()
      this.setState({
        isPlaying: false
      })
    }
  }
}

export default compose(
  withQuery(SearchSpotifyQuery, {
    lazy: true,
    name: 'searchSpotify'
  }),
  withMutation(AddToPlaylistMutation, {
    name: 'addToPlaylist'
  })
)(SearchSpotify)
