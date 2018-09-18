import React, { Component } from 'react'
import { debounce, get } from 'lodash-es'
import createPlayer from 'web-audio-player'
import compose from 'compose-function'
import withQuery from '../../lib/withQuery'
import withMutation from '../../lib/withMutation'
import Spinner from '../../components/Spinner'
import Track from './Track'
import AudioGraph from './AudioGraph'
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
          <AudioGraph audio={this.audio} isPlaying={this.state.isPlaying} />
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
    const tracks = this.getTracks()

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

  async startPlaying (track) {
    await this.stopPlaying()
    if (!track.previewUrl) return

    const url = '/preview/' + encodeURIComponent(track.previewUrl)
    const audio = createPlayer(url, {
      context: this.audio ? this.audio.context : undefined,
      loop: false
    })
    audio.on('load', () => {
      audio.play()
      audio.node.connect(audio.context.destination)
    })
    audio.on('end', () => {
      if (this.state.isPlaying) {
        const nextTrack = this.getNextTrack()
        if (nextTrack) {
          this.setActiveTrack(nextTrack)
        }
      } else {
        this.setState({
          isPlaying: false
        })
      }
    })
    this.audio = audio
    this.setState({
      isPlaying: true
    })
  }

  async stopPlaying () {
    if (this.audio) {
      return new Promise((resolve) => {
        this.setState({
          isPlaying: false
        }, () => {
          this.audio.stop()
          resolve()
        })
      })
    }
  }

  getTracks () {
    return get(this.props.searchSpotify, 'data.tracks', [])
  }

  getNextTrack () {
    const tracks = this.getTracks()
    let foundCurrent = false
    for (let i = 1; i < tracks.length; i++) {
      if (tracks[i - 1].id === this.state.activeTrackId) {
        foundCurrent = true
      }
      if (foundCurrent === true && tracks[i].previewUrl) {
        return tracks[i]
      }
    }
    return tracks[0]
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
