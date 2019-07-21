const { handle, options } = require('jetpack/handle')
const path = require('path')
const Router = require('express-promise-router')
const fileUpload = require('express-fileupload')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const express = require('express')
const graphqlOptions = require('../graphqlOptions')
const spotify = require('../lib/spotify')
const authenticate = require('../middleware/authenticate')
const requireAdmin = require('../middleware/requireAdmin')
const previewSpotifyTrack = require('./previewSpotifyTrack')
const proxyImage = require('./proxyImage')
const uploadImage = require('./uploadImage')

const router = Router()

router.use('/graphql', bodyParser.json(), graphqlExpress(graphqlOptions))
router.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
router.get('/preview/:url', authenticate, previewSpotifyTrack)
router.get('/image/:type/:id', authenticate, proxyImage)
router.post(
  '/image',
  authenticate,
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 } // 5mb
  }),
  uploadImage
)
router.get(
  '/spotify/callback',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    await spotify.authCallback(req.query.code)
    res.send('ok')
  }
)
router.get('/spotify/auth', authenticate, requireAdmin, (req, res) => {
  res.redirect(spotify.getAuthUrl())
})

router.use(
  '/static',
  express.static(path.resolve(__dirname, '../../../static'))
)

router.get('/client/*', handle)
router.get('*', (req, res) => {
  res.send(`
  <html>
    <head>
      <meta charset='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
      <title>Danni & Oli's Wedding</title>
      <link rel='preconnect' href='https://www.google-analytics.com' />
      <link rel='icon' href='/static/favicon.png' />
      <link rel='stylesheet' preload href='https://fonts.googleapis.com/css?family=Raleway:300,400,600|Shadows+Into+Light+Two' />
    </head>
    <body>
      ${options.assets
    .map(asset => `<script type='text/javascript' src='${asset}'></script>`)
    .join('\n')}
    </body>
  </html>
`)
})

module.exports = router
