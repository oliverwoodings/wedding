import './global.css'

import React from 'react'
import ReactDom from 'react-dom'
import createRouter from 'space-router'
import createAtom from 'tiny-atom'
import { ProvideAtom } from 'tiny-atom/react'
import raven from 'raven-js'
import ga from 'universal-ga'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Music from './pages/Music'
import Photos from './pages/Photos'
import RSVP from './pages/RSVP'
import Admin from './pages/Admin'
import Logistics from './pages/Logistics'
import App from './App'
import { evolve, initialState } from './evolve'
import createDeviceListener from './lib/deviceListener'
import { ACCESS_LEVELS } from './constants'

if (process.env.NODE_ENV === 'production') {
  raven.config('https://94e680aa0e3b4cec8fb1b78c735f5124@sentry.io/1270305').install()
  ga.initialize('UA-40284850-2')
}

const container = document.createElement('div')
document.body.appendChild(container)

const router = createRouter([
  ['', access(App, ACCESS_LEVELS.PUBLIC), [
    ['/', Home],
    ['/rsvp', RSVP],
    ['/logistics', Logistics],
    ['/photos', Photos],
    ['/login', access(Login, ACCESS_LEVELS.PUBLIC)],
    ['/music', Music],
    ['/admin', access(Admin, ACCESS_LEVELS.ADMIN)],
    ['*', NotFound]
  ]]
])

console.log('Well you\'re a bit of a nosy parker, aren\'t you?')
console.log('This is probably what you are after: https://github.com/oliverwoodings/wedding')

const atom = createAtom(initialState, evolve(router), render)

router.start((route) => {
  ga.pageview(route.pattern)
  atom.split({ route })
})

createDeviceListener({
  mobile: { maxWidth: 767 },
  tablet: { minWidth: 768, maxWidth: 991 },
  desktop: { minWidth: 992 }
}, (device) => atom.split('changeDevice', device ))

function render (atom) {
  const { route } = atom.get()
  const components = router.data(route.pattern)

  const requiredAccessLevel = components.reduce((level, Component) => {
    return Math.max(level, Component.ACCESS_LEVEL || ACCESS_LEVELS.PRIVATE)
  }, ACCESS_LEVELS.PUBLIC)

  const app = components.reduceRight((children, Component) => (props = {}) => (
    <Component
      params={route.params}
      requiredAccessLevel={requiredAccessLevel}
      path={route.path}
      {...props}
    >
      {children}
    </Component>
  ), null)

  ReactDom.render(<ProvideAtom atom={atom}>{app()}</ProvideAtom>, container)
}

function access (Component, accessLevel) {
  Component.ACCESS_LEVEL = accessLevel
  return Component
}
