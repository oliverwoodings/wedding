const ENV = process.env.NODE_ENV || 'development'

module.exports = (err, req, res, next) => {
  const status = err.status || 500
  res.status(err.status)

  const message = status === 500 ? 'Internal Server Error' : err.message

  res.send({
    message,
    status,
    stack: ENV === 'development' ? err.stack : undefined
  })
}
