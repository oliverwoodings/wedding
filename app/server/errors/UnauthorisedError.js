const ExtendableError = require('es6-error')

module.exports = class UnauthorisedError extends ExtendableError {
  constructor () {
    super('User is not authorised to perform that action')
    this.type = 'UNAUTHORISED'
    this.client = true
    this.status = 401
  }
}
