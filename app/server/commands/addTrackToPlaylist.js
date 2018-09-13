const config = require('config')
const { getClient } = require('../lib/spotify')
const getPlaylist = require('../queries/getPlaylist')

module.exports = async function addTrackToPlaylist (userId, trackId) {
  const spotify = await getClient()
  await spotify.addTracksToPlaylist(
    config.spotify.userId,
    config.spotify.playlistId,
    [`spotify:track:${trackId}`]
  )
  getPlaylist.clearCache()
}
