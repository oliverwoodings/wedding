const server = require('jetpack/server')
const path = require('path')
const config = require('config')
const Router = require('express-promise-router')
const raven = require('raven')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const graphqlOptions = require('./graphqlOptions')
const previewSpotifyTrack = require('./lib/previewSpotifyTrack')
const spotify = require('./lib/spotify')
const authenticate = require('./middleware/authenticate')
const requireAdmin = require('./middleware/requireAdmin')
const log = require('./log')

const app = server()
const router = Router()

router.use(cookieParser())
router.use('/graphql', bodyParser.json(), graphqlExpress(graphqlOptions))
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
router.get('/preview/:url', authenticate, previewSpotifyTrack)
router.get('/spotify/callback', authenticate, requireAdmin, async (req, res, next) => {
  await spotify.authCallback(req.query.code)
  res.send('ok')
})
router.get('/spotify/auth', authenticate, requireAdmin, (req, res) => {
  res.redirect(spotify.getAuthUrl())
})

app.use(router)

if (config.sentry.enabled) {
  raven.config(config.sentry.dsn).install()
  app.use(raven.errorHandler())
}

app.listen()
