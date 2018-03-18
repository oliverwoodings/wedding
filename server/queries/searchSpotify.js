const { camelCase } = require('change-case-object')
const getSpotify = require('../lib/spotify')

module.exports = async function searchSpotify (query) {
  const spotify = await getSpotify()
  const { body } = await spotify.searchTracks(query, { market: 'gb' })
  return camelCase(body.tracks)
}
