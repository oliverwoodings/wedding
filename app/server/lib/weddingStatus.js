const config = require('config')

const WEDDING_TS = new Date(config.weddingDate).getTime()
const POST_WEDDING_TS = getNextDayTs()

module.exports = function weddingStatus () {
  const now = Date.now()
  if (config.weddingStatusOverride) {
    return config.weddingStatusOverride
  } else if (now < WEDDING_TS) {
    return 'PRE'
  } else if (now < POST_WEDDING_TS) {
    return 'TODAY'
  } else {
    return 'POST'
  }
}

function getNextDayTs () {
  const date = new Date(config.weddingDate)
  date.setDate(date.getDate() + 1)
  return date.getTime()
}
