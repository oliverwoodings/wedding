const UnauthenticatedError = require('../errors/UnauthenticatedError')
const authenticateSession = require('../queries/authenticateSession')
const getUserById = require('../queries/getUserById')

module.exports = async function authenticate (req, res, next) {
  const userId = await authenticateSession(req.cookies.sessionId)
  if (userId) {
    req.user = await getUserById(userId)
    next()
  } else {
    throw new UnauthenticatedError()
  }
}
