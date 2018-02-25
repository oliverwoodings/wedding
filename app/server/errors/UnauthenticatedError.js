const ExtendableError = require('es6-error')

module.exports = class MissingScopeError extends ExtendableError {
  constructor (authenticatedScope, scope) {
    super('User is not authenticated')
    this.type = 'UNAUTHENTICATED'
    this.client = true
  }
}
