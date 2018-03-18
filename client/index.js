import './global.css'
import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import createRouter from 'space-router'
import createAtom from 'tiny-atom'
import { ProvideAtom } from 'tiny-atom/react'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Music from './pages/Music'
import App from './App'
import { evolve, initialState } from './evolve'
import createDeviceListener from './lib/deviceListener'
import { ACCESS_LEVELS } from './constants'

const container = document.createElement('div')
document.body.appendChild(container)

const router = createRouter([
  ['', access(App, ACCESS_LEVELS.PUBLIC), [
    ['/', Home],
    ['/login', access(Login, ACCESS_LEVELS.PUBLIC)],
    ['/music', Music],
    ['*', NotFound]
  ]]
])

const atom = createAtom(initialState, evolve(router), render)

router.start((route) => atom.split({ route }))

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
