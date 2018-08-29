const ExtendableError = require('es6-error')

module.exports = class UnauthenticatedError extends ExtendableError {
  constructor () {
    super('User is not authenticated')
    this.type = 'UNAUTHENTICATED'
    this.client = true
    this.status = 403
  }
}
