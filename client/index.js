import './global.css'

import React from 'react'
import ReactDom from 'react-dom'
import createRouter from 'space-router'

import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import App from './App'

const container = document.createElement('div')
document.body.appendChild(container)

const router = createRouter([
  ['', App, [
    ['/', Home],
    ['/login', Login],
    ['*', NotFound]
  ]]
]).start(render)

function render (route, components) {
  const app = components.reduceRight((children, Component) =>
    <Component params={route.params}>{children}</Component>
  , null)
  ReactDom.render(app, container)
}
