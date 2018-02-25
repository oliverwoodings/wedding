const formatError = require('./lib/formatError')
const authenticateSession = require('./queries/authenticateSession')
const getUserById = require('./queries/getUserById')
const UnauthenticatedError = require('./errors/UnauthenticatedError')
const schema = require('./schema')

module.exports = function graphqlOptions (req, res) {
  return {
    schema,
    debug: false,
    formatError,
    context: {
      res,
      async authenticate () {
        if (this.user) {
          return
        }
        const userId = await authenticateSession(req.cookies.sessionId)
        if (userId) {
          this.user = await getUserById(userId)
        } else {
          throw new UnauthenticatedError()
        }
      }
    }
  }
}
