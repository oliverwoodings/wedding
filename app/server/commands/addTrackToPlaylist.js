const config = require('config')
const { getClient } = require('../lib/spotify')

module.exports = async function addTrackToPlaylist (trackId) {
  const spotify = await getClient()
  await spotify.addTracksToPlaylist(
    config.spotify.userId,
    config.spotify.playlistId,
    [`spotify:track:${trackId}`]
  )
}
