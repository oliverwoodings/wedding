const formatError = require('./lib/formatError')
const authenticateSession = require('./queries/authenticateSession')
const getUser = require('./queries/getUser')
const UnauthenticatedError = require('./errors/UnauthenticatedError')
const schema = require('./schema')

module.exports = function graphqlOptions (req, res) {
  return {
    schema,
    formatError,
    context: {
      res,
      async authenticate () {
        if (this.user) {
          return
        }
        const userId = await authenticateSession(req.cookies.sessionId)
        if (userId) {
          this.user = await getUser(userId)
        } else {
          throw new UnauthenticatedError()
        }
      }
    }
  }
}
