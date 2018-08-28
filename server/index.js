const server = require('jetpack/server')
const path = require('path')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const graphqlOptions = require('./graphqlOptions')
const previewSpotifyTrack = require('./lib/previewSpotifyTrack')
const log = require('./log')

const app = server()

app.use('/graphql', bodyParser.json(), cookieParser(), graphqlExpress(graphqlOptions))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.get('/preview/:url', previewSpotifyTrack)

app.listen()
