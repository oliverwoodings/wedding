import React, { Component } from 'react'
import compose from 'compose-function'
import PropTypes from 'prop-types'
import { Body } from './components/typography'
import Spinner from './components/Spinner'
import withQuery from './lib/withQuery'
import withAtom from './lib/withAtom'
import styles from './App.css'
import Query from './App.graphql'
import { ACCESS_LEVELS } from './constants'

function mapAtom (state, split) {
  return {
    goToLogin: () => split('navigate', { path: '/login' }),
    goToHome: () => split('navigate', { path: '/' })
  }
}

class App extends Component {
  componentWillUpdate ({ query, requiredAccessLevel, goToLogin, goToHome }) {
    if (query.hasFailed) {
      switch (requiredAccessLevel) {
        case ACCESS_LEVELS.PRIVATE:
          return goToLogin()
        case ACCESS_LEVELS.ADMIN:
          return goToHome()
      }
    }
  }

  render () {
    const { query, children, goToHome } = this.props

    if (query.isPending) {
      return <Spinner />
    }

    return <Body className={styles.app}>{children({
      user: query.data && query.data.user,
      refetchUser: query.execute,
      goToHome
    })}</Body>
  }
}

export default compose(withAtom(mapAtom), withQuery(Query))(App)
