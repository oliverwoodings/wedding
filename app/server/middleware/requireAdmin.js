const UnauthorisedError = require('../errors/UnauthorisedError')

module.exports = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new UnauthorisedError()
  }
  next()
}
