import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Body } from './components/typography'
import createDeviceListener from './lib/deviceListener'
import styles from './App.css'

export default class App extends Component {
  static childContextTypes = {
    device: PropTypes.string
  }

  state = {
    device: null
  }

  getChildContext () {
    return this.state
  }

  componentDidMount () {
    createDeviceListener({
      mobile: { maxWidth: 767 },
      tablet: { minWidth: 768, maxWidth: 991 },
      desktop: { minWidth: 992 }
    }, (device) => {
      console.log(device)
      this.setState({ device })
    })
  }

  render () {
    return <Body className={styles.app}>{this.props.children}</Body>
  }
}
