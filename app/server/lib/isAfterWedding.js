const config = require('config')

const WEDDING_TS = new Date(config.weddingDate).getTime()

module.exports = function isAfterWedding () {
  return Date.now() > WEDDING_TS || config.forcePostWedding
}
