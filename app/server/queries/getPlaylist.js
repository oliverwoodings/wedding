const { camelCase } = require('change-case-object')
const { map } = require('lodash')
const config = require('config')
const { getClient } = require('../lib/spotify')

module.exports = async function getPlaylist () {
  const tracks = await getAllPlaylistTracks()
  return camelCase(map(tracks, 'track'))
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
