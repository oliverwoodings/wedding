const { camelCase } = require('change-case-object')
const { getClient } = require('../lib/spotify')
const getPlaylist = require('./getPlaylist')

module.exports = async function searchSpotify (query) {
  if (!query) return []

  const spotify = await getClient()
  const { body } = await spotify.searchTracks(query, {
    market: 'gb',
    limit: 50
  })
  const tracks = camelCase(body.tracks.items)
  for (const track of tracks) {
    track.isInPlaylist = await isTrackInPlaylist(track.id)
  }
  return tracks
}

async function isTrackInPlaylist (trackId) {
  const playlist = await getPlaylist()
  return playlist.some(track => track.id === trackId)
}
