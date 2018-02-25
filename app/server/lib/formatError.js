const log = require('../log')

module.exports = function formatError (error) {
  const {
    message,
    locations,
    path,
    originalError = {},
    stack
  } = error

  if (originalError.client) {
    log.warn(stack || message)
  } else {
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
