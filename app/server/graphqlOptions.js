const formatError = require('./lib/formatError')
const authenticateSession = require('./queries/authenticateSession')
const getUserById = require('./queries/getUserById')
const auditAction = require('./commands/auditAction')
const UnauthenticatedError = require('./errors/UnauthenticatedError')
const UnauthorisedError = require('./errors/UnauthorisedError')
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
      },
      async requireAdmin () {
        if (!this.user) {
          await this.authenticate()
        }
        if (!this.user.isAdmin) {
          throw new UnauthorisedError()
        }
      },
      setSessionId (sessionId) {
        res.cookie('sessionId', sessionId, {
          maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        })
      },
      async audit (action, meta) {
        if (!this.user) {
          throw new Error('Cannot audit user action without `context.user`')
        }
        await auditAction(this.user.id, action, meta)
      }
    }
  }
}
