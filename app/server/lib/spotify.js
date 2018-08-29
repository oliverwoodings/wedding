const SpotifyWebApi = require('spotify-web-api-node')
const config = require('config')
const fs = require('fs-extra')
const raven = require('raven')
const path = require('path')
const log = require('../log')('spotify')

const CACHE_FILE = path.resolve(__dirname, '../../../.spotify-tokens')

const spotify = new SpotifyWebApi(config.spotify.opts)
let tokens = null

log.info('Restoring tokens from cache')
fromCache()

module.exports = {
  getAuthUrl,
  authCallback,
  getClient
}

function getAuthUrl () {
  const url = spotify.createAuthorizeURL(config.spotify.scopes, 'foo')
  return url
}

async function authCallback (code) {
  const res = await spotify.authorizationCodeGrant(code)
  tokens = res.body
  tokens.granted_at = Date.now()
  await toCache()
  await fromCache()
  log.info('Succesfully authenticated')
}

function getClient () {
  if (!tokens) {
    throw notAuthenticated()
  }
  return spotify
}

function scheduleRefresh () {
  const expiresAt = tokens.granted_at + (tokens.expires_in * 1000)
  const expiresIn = expiresAt - Date.now()

  log.info(`Refreshing access token in ${Math.round(expiresIn / 1000)}s`)
  setTimeout(async () => {
    try {
      await refresh()
    } catch (e) {
      log.error('Error refreshing access token', e)
    }
    scheduleRefresh()
  }, expiresIn)
}

async function refresh () {
  const res = await spotify.refreshAccessToken()
  tokens = {
    ...tokens,
    ...res.body,
    granted_at: Date.now()
  }
  spotify.setAccessToken(tokens.access_token)
  await toCache()
  log.info('Succesfully refreshed access token')
}

async function fromCache () {
  if (!await fs.exists(CACHE_FILE)) {
    notAuthenticated()
    return
  }

  tokens = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'))
  spotify.setAccessToken(tokens.access_token)
  spotify.setRefreshToken(tokens.refresh_token)

  if (tokens.granted_at + tokens.expires_in * 1000 < Date.now()) {
    await refresh()
  }
  scheduleRefresh()
}

async function toCache () {
  await fs.writeFile(CACHE_FILE, JSON.stringify(tokens, null, 2))
}

function notAuthenticated () {
  log.error('Spotify is not authenticated')
  const e = new Error('Spotify is not authenticated')
  raven.captureException(e)
  return e
}
