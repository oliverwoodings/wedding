const log = require('../log')

const ENV = process.env.NODE_ENV || 'development'

module.exports = (err, req, res, next) => {
  const status = err.status || 500
  res.status(status)

  const message = status === 500 ? 'Internal Server Error' : err.message
  if (status >= 500) {
    log.error(err)
  }

  res.send({
    message,
    status,
    stack: ENV === 'development' ? err.stack : undefined
  })
}
