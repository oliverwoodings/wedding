const knex = require('../knex')
const getUser = require('../queries/getUser')
const AuthenticationError = require('../errors/AuthenticationError')
const { generateSalt, hash } = require('../lib/auth')

module.exports = async function changePassword (code, email, password) {
  const user = await getUser(code)

  if (!user) {
    throw new AuthenticationError('INVALID_CODE')
  }

  if (!user.new && user.email !== email) {
    throw new AuthenticationError('EMAIL_MISMATCH')
  }

  if (password.length < 8) {
    throw new AuthenticationError('INSECURE_PASSWORD')
  }

  const salt = generateSalt()

  await knex('users').where('code', code).update({
    email,
    salt,
    password: hash(password, salt)
  })

  return getUser(code)
}
