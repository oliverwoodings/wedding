const axios = require('axios')

module.exports = function previewSpotifyTrack (req, res, next) {
  const url = decodeURIComponent(req.params.url)
  axios({
    method: 'GET',
    url,
    responseType: 'stream'
  }).then(({ data }) => data.pipe(res), err => next(err))
}
