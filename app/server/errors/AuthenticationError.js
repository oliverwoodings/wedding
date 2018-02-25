const ExtendableError = require('es6-error')

module.exports = class UnauthenticatedError extends ExtendableError {
  constructor (status) {
    super('Authentication error')
    this.type = 'AUTHENTICATION_FAILURE'
    this.client = true
    this.data = { status }
  }
}
