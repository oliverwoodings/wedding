import React, { Component } from 'react'
import compose from 'compose-function'
import { get } from 'lodash-es'
import PropTypes from 'prop-types'
import ga from 'universal-ga'
import Page from './components/Page'
import Spinner from './components/Spinner'
import withQuery from './lib/withQuery'
import withAtom from './lib/withAtom'
import withDevice from './lib/withDevice'
import Query from './App.graphql'
import { ACCESS_LEVELS } from './constants'

function mapAtom (state, split) {
  return {
    goToLogin: () => split('navigate', { path: '/login' }),
    goToHome: () => split('navigate', { path: '/' })
  }
}

class App extends Component {
  componentWillUpdate ({ query, requiredAccessLevel, goToLogin, goToHome, path }) {
    const isPublicRoute = requiredAccessLevel === ACCESS_LEVELS.PUBLIC
    const isAdminRoute = requiredAccessLevel === ACCESS_LEVELS.ADMIN

    if (query.hasFailed && get(query, 'error.type') === 'UNAUTHENTICATED' && !isPublicRoute) {
      return goToLogin()
    }

    const user = get(query, 'data.user')
    if (user && !user.isAdmin && isAdminRoute) {
      return goToHome()
    }
  }

  render () {
    const {
      query,
      children,
      goToHome,
      requiredAccessLevel,
      path,
      device
    } = this.props

    if (query.isPending && !query.isRefetching) {
      return null
    }

    const isPublicRoute = requiredAccessLevel === ACCESS_LEVELS.PUBLIC

    if (!isPublicRoute && query.hasFailed) {
      return null
    }

    const user = query.data && query.data.user
    if (user) {
      ga.set('userId', user.id)
    }

    return (
      <Page
        minimalist={device === 'mobile' && !isPublicRoute && path !== '/'}
        nav={!isPublicRoute}
        path={path}
        isAdmin={user && user.isAdmin}
      >
        {children({
          user,
          refetchUser: query.execute,
          goToHome
        })}
      </Page>
    )
  }
}

export default compose(withAtom(mapAtom), withQuery(Query), withDevice())(App)
