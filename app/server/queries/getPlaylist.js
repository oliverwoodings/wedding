const { camelCase } = require('change-case-object')
const { map } = require('lodash')
const config = require('config')
const { getClient } = require('../lib/spotify')

const CACHE_FOR = 1000 * 120
let playlist = null

module.exports = async function getPlaylist () {
  if (!playlist) {
    const tracks = await getAllPlaylistTracks()
    playlist = camelCase(map(tracks, 'track'))
    setTimeout(module.exports.clearCache, CACHE_FOR)
  }
  return playlist
}

module.exports.clearCache = function clearCache () {
  playlist = null
}

async function getAllPlaylistTracks (tracks = [], offset = 0) {
  const spotify = await getClient()
  const { body } = await spotify.getPlaylistTracks(config.spotify.userId, config.spotify.playlistId, {
    limit: 1,
    offset
  })

  tracks = [...tracks, ...body.items]
  if (body.next) {
    return getAllPlaylistTracks(tracks, offset + body.items.length)
  }

  return tracks
}
