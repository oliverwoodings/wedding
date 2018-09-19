const raven = require('raven')
const log = require('../log')

module.exports = function formatError (error) {
  const { message, locations, path, originalError = {}, stack } = error

  if (originalError.client) {
    log.warn(stack || message)
  } else {
    raven.captureException(error.originalError || error)
    log.error(stack || message)
  }

  return {
    message,
    locations,
    path,
    type: originalError.type || 'INTERNAL_SERVER_ERROR',
    data: originalError.data || {},
    client: !!originalError.client
  }
}
