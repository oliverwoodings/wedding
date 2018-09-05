const { camelCase } = require('change-case-object')
const { getClient } = require('../lib/spotify')

module.exports = async function searchSpotify (query) {
  const spotify = await getClient()
  const { body } = await spotify.searchTracks(query, { market: 'gb', limit: 50 })
  return camelCase(body.tracks.items)
}
