import React, { Component } from 'react'
import createAnalyser from 'web-audio-analyser'
import styles from './AudioGraph.css'

export default class AudioGraph extends Component {
  state = {
    frequencies: []
  }

  componentDidMount () {
    this.intervalId = setInterval(::this.analyse, 50)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.audio !== this.props.audio) {
      this.createAnalyser()
    }
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  createAnalyser () {
    const { audio } = this.props
    if (!audio) return

    this.analyser = createAnalyser(audio.node, audio.context, {
      stereo: false
    })
    this.analyser.analyser.fftSize = 32
  }

  analyse () {
    if (!this.analyser || !this.props.isPlaying) return

    this.setState({
      frequencies: this.analyser.frequencies()
    })
  }

  render () {
    const { frequencies } = this.state
    if (!this.props.isPlaying || !frequencies.length) {
      return null
    }

    const bars = []
    for (let i = 1; i < frequencies.length - 1; i++) {
      const height = `${85 / 256 * frequencies[i]}%`
      bars.push(<div key={`bar-${i}`} style={{ height }} />)
      bars.unshift(<div key={`bar-${i}-2`} style={{ height }} />)
    }

    return (
      <div className={styles.graph}>
        {bars}
      </div>
    )
  }
}
