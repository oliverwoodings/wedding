const express = require('express')
const { options } = require('jetpack/handle')
const config = require('config')
const raven = require('raven')
const cookieParser = require('cookie-parser')
const expressLogger = require('express-driftwood')
const handlers = require('./handlers')
const error = require('./middleware/error')
const log = require('./log')

const app = express()
// TODO: logger
app.use(expressLogger(log))
app.use(cookieParser())
app.use(handlers)

if (config.sentry.enabled) {
  raven.config(config.sentry.dsn).install()
  app.use(raven.errorHandler())
}

app.use(error)

app.listen(options.port)
