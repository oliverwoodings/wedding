const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')
const log = require('../log')

const TEN_MINUTES = 1000 * 60 * 10

const spotify = new SpotifyWebApi({
  clientId : config.spotify.clientId,
  clientSecret : config.spotify.secret
})

let onceAuthorised
authorise()
setTimeout(authorise, TEN_MINUTES)

function authorise () {
  onceAuthorised = spotify.clientCredentialsGrant()
    .then((data) => {
      log.info('Retrieved spotify auth token')
      spotify.setAccessToken(data.body.access_token)
      return spotify
    })
    .catch((err) => {
      log.error('Spotify authentication failed', err)
      throw err
    })
}

module.exports = () => onceAuthorised
