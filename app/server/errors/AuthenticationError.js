const ExtendableError = require('es6-error')

module.exports = class AuthenticationError extends ExtendableError {
  constructor (status) {
    super('Authentication error')
    this.type = 'AUTHENTICATION_FAILURE'
    this.client = true
    this.data = { status }
    this.status = 400
  }
}
