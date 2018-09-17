const knex = require('../knex')
const getUser = require('../queries/getUser')
const AuthenticationError = require('../errors/AuthenticationError')
const { generateSalt, hash } = require('../lib/auth')

module.exports = async function changePassword (code, email, password) {
  const user = await getUser(code)

  if (!user) {
    throw new AuthenticationError('INVALID_CODE')
  }

  if (!user.new && user.email.toLowerCase() !== email.toLowerCase()) {
    throw new AuthenticationError('EMAIL_MISMATCH')
  }

  if (password.length < 8) {
    throw new AuthenticationError('INSECURE_PASSWORD')
  }

  const salt = generateSalt()

  try {
    await knex('users').where('code', code).update({
      email: email.toLowerCase(),
      salt,
      password: hash(password, salt)
    })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      throw new AuthenticationError('DUPLICATE_EMAIL')
    }
    throw e
  }

  await knex('sessions').where('userId', user.id).delete()

  return getUser(code)
}
